import { useEffect, useRef, useState } from "react"
import { GEOLOCATION, GEOLOCATION_APPROXIMATE, GEOLOCATION_MANUAL, GEOLOCATION_PRECISE, UNIT } from "../../../constant/weather"
import { FetchDataLocationQueryParamType, FetchDataWeatherQueryParamType, WeatherType } from "../../../types/Weather"
import Select from "../../form/select/Select"
import Switch from "../../form/switch/Switch"
import Button from "../../form/button/Button"
import Storage from "../../../utils/Storage"
import Request from "../../../utils/Request"
import Input from "../../form/input/Input"
import Loader from "../../loader/Loader"
import Icon from "../../Icon"

import './style.css'


const Weather = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const geolocationRef = useRef<HTMLSelectElement>(null)
    const unitRef = useRef<HTMLSelectElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const errorNotifyRef = useRef<HTMLDivElement>(null)

    const [showSettings, setShowSettings] = useState<string>("hidden")
    const [geolocation, setGeolocation] = useState<string>("")
    const [changeLocation, setChangeLocaton] = useState<string>("")
    const [geolocationLoading, setGeolocationLoading] = useState<boolean>(false)
    const [weatherLocation, setWeatherLocation] = useState([])


    const fetchDataWeather = async (geolocation?: typeof GEOLOCATION_PRECISE | typeof GEOLOCATION_APPROXIMATE | typeof GEOLOCATION_MANUAL, queryParams?: FetchDataWeatherQueryParamType | undefined) => {
        try {
            const response = await Request.get({
                path: "/weathers",
                query: {
                    provider: "auto",
                    unit: "C",
                    ...queryParams
                },
            });

            const res = await response.json()
            const weather: WeatherType = {
                address: res.data.location.city + ', ' + res.data.location.region,
                temp: res.data.now.temp,
                feels: res.data.now.feels,
                text: res.data.now.description,
                geolocation,
                last_update: Date.now()
            }
            if (queryParams?.query) {
                weather.address = queryParams.query
            }
            if (queryParams?.unit) {
                weather.unit = queryParams.unit
            }

            Storage.sync.set('weather', weather)
            return res.data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchDataLocation = async (queryParams?: FetchDataLocationQueryParamType | undefined) => {
        try {
            const response = await Request.get({
                path: "/weathers/locations",
                query: queryParams,
            });

            const res = await response.json()
            setWeatherLocation(res.data ? res.data : [])
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const geolocationPrecise = async (params: FetchDataWeatherQueryParamType = {}) => {
        setGeolocationLoading(true)
        navigator.geolocation.getCurrentPosition(async (position) => {
            await fetchDataWeather(
                "precise",
                {
                    lat: position.coords.latitude.toString(),
                    lon: position.coords.longitude.toString(),
                    ...params
                }
            );
            setGeolocationLoading(false)
        }, () => {
            setGeolocationLoading(false)
            errorNotifyRef.current!.textContent = 'Please allow your location'
            errorNotifyRef.current!.style = `display: inline-block`
        })
    }

    const geolocationApproximate = async (params: FetchDataWeatherQueryParamType = {}) => {
        setGeolocationLoading(true)
        const weather = await fetchDataWeather(GEOLOCATION_APPROXIMATE, { provider: 'accuweather', ...params })
        Storage.sync.set('location', weather?.location)
        errorNotifyRef.current!.textContent = ''
        errorNotifyRef.current!.style = `display: none`
        setGeolocationLoading(false)
    }

    const geolocationManual = async (params: FetchDataWeatherQueryParamType) => {
        setGeolocationLoading(true)
        await fetchDataWeather(GEOLOCATION_MANUAL, { query: addressRef.current?.value, ...params })
        errorNotifyRef.current!.textContent = ''
        errorNotifyRef.current!.style = `display: none`
        setGeolocationLoading(false)
    }


    useEffect(() => {

        Storage.sync.watch("weather", (item) => {
            const data = item as WeatherType
            isEnableRef.current!.checked = data?.enable ?? false
            geolocationRef.current!.value = data?.geolocation ?? ""
            unitRef.current!.value = data?.unit ?? "C"

            addressRef.current!.value = data?.address ?? ""

            const lastUpdate = data?.last_update
            const fiveHours = 5 * 60 * 60 * 1000; // 5hr
            const shouldUpdate = !lastUpdate || (Date.now() > lastUpdate + fiveHours);

            if (shouldUpdate && data?.geolocation) {
                if (data.geolocation === GEOLOCATION_PRECISE) {
                    geolocationPrecise()
                } else if (data.geolocation === GEOLOCATION_MANUAL) {
                    geolocationManual({ query: data?.address ?? "" })
                } else {
                    geolocationApproximate()
                }
            }

            setShowSettings(data?.enable ? "" : "hidden")
            setGeolocation(data?.geolocation ?? "")
            setChangeLocaton(data?.address ?? "")
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <div className={`weather-settings ${geolocationLoading && 'loading'}`}>
        <h2 className='settings-title'>
            {geolocationLoading && <Loader />} WEATHER
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    isChecked={false}
                    ref={isEnableRef}
                    onChange={e => Storage.sync.set('weather', { enable: e.target.checked })}
                />
            </div>
            <div className={`dropshow ${showSettings}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Geolocation
                    </div>
                    <div className="items-content">
                        <Select
                            items={GEOLOCATION}
                            ref={geolocationRef}
                            onSelect={e => {
                                if (e.target.value === GEOLOCATION_APPROXIMATE) {
                                    geolocationApproximate()
                                }
                                if (e.target.value === GEOLOCATION_PRECISE) {
                                    geolocationPrecise()
                                }
                                if (e.target.value === GEOLOCATION_MANUAL) {
                                    setGeolocation(GEOLOCATION_MANUAL)
                                }
                            }}
                        />
                    </div>
                </div>
                <span className="notify-error" ref={errorNotifyRef} />
                <div className={`dropshow ${geolocation === 'manual' ? "" : "hidden"}`}>
                    <hr />
                    <div className='items'>
                        <div className='items-title'>
                            Address
                        </div>
                        <div className="items-content">
                            {
                                (changeLocation.length > 2) &&
                                <Button
                                    onClick={() => !geolocationLoading && geolocationManual({ query: addressRef.current?.value ?? "" })}
                                >
                                    {
                                        geolocationLoading
                                            ? <Loader />
                                            : <Icon icon="check" className="check-icon" />
                                    }
                                </Button>
                            }
                            <Input
                                ref={addressRef}
                                onChange={(e) => {
                                    if (e.target.value.length > 2) {
                                        fetchDataLocation({ search: e.target.value, lang: "en-us" })
                                    }
                                    setChangeLocaton(e.target.value)
                                }}
                                placeholder={addressRef.current?.value ? addressRef.current.value : "Input address"}
                                datalist={weatherLocation.map((val: { name: string, longName: string }) => ({ value: val.longName, label: val.name }))}
                                datalistID="fm_weather-address"
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Unit
                    </div>
                    <div className="items-content">
                        <Select
                            items={UNIT}
                            ref={unitRef}
                            onSelect={e => {
                                const unit = e.target.value as "C" | "F"

                                if (geolocation === GEOLOCATION_APPROXIMATE) {
                                    geolocationApproximate({ unit })
                                }
                                if (geolocation === GEOLOCATION_PRECISE) {
                                    geolocationPrecise({ unit })
                                }
                                if (geolocation === GEOLOCATION_MANUAL) {
                                    geolocationManual({ unit })
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div >
}

export default Weather