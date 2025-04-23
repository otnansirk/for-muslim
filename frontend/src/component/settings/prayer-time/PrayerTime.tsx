import { useEffect, useRef, useState } from "react"
import { GEOLOCATION_APPROXIMATE, GEOLOCATION_PRECISE } from "../../../constant/weather"
import { LocationType, PrayerType, TimesType } from "../../../types/Storage"
import { CALCULATE_METHOD, PRAYER_NAMES } from "../../../constant/prayer"
import { PrayerQueryParamsType } from "../../../types/Prayer"
import { firstUpper } from "../../../utils/Strings"
import * as prayer from "../../../utils/Prayer"
import Datetime from "../../../utils/Datetime"
import Switch from "../../form/switch/Switch"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Request from "../../../utils/Request"
import Loader from "../../loader/Loader"


const PrayerTime = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const geolocationRef = useRef<HTMLSelectElement>(null)
    const errorNotifyRef = useRef<HTMLDivElement>(null)

    const [showSettings, setShowSettings] = useState("hidden")
    const [prayerLoading, setPrayerLoading] = useState<boolean>(false)


    const fetchDataPrayer = async (queryParams?: PrayerQueryParamsType, geolocation?: string) => {
        const datenow = Datetime.get({ month: "2-digit", tz: queryParams?.timezone })
        try {
            const response = await Request.get({
                path: "/prayer-times",
                query: {
                    date: `${datenow.day}-${datenow.month}-${datenow.year}`,
                    ...queryParams
                }
            });
            const res = await response.json()
            const times: TimesType = {
                imsak: res.data.imsak,
                fajr: res.data.fajr,
                dhuhr: res.data.dhuhr,
                asr: res.data.asr,
                maghrib: res.data.maghrib,
                isha: res.data.isha
            };

            let prayers: PrayerType = {}
            PRAYER_NAMES.forEach((name: string) => {
                const datetime = Datetime.get({ timestring: times[name as keyof TimesType], tz: queryParams?.timezone })
                prayers = Object.assign(prayers, {
                    [name]: {
                        id: name,
                        icon: name,
                        title: firstUpper(name),
                        datetime: times[name as keyof TimesType],
                        time: datetime.hours + ':' + datetime.minutes,
                        hours_in_seconds: parseInt(datetime.hours) * 60 + parseInt(datetime.minutes)
                    }
                })
            })

            const upcoming = prayer.next(prayers)
            const data = {
                ...prayers,
                upcoming,
                geolocation,
                method: queryParams?.method,
                hijri: res.data.hijri.readable,
                last_update: Date.now()
            }

            Storage.sync.set("prayer", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const prayerApproximate = () => {
        Storage.sync.watch('location', async loc => {
            setPrayerLoading(true)
            const data = loc as LocationType
            const method = CALCULATE_METHOD.find(item => item.keyword.includes(data?.timezone ?? ""))

            await fetchDataPrayer({
                lat: data.lat,
                lng: data.lng,
                timezone: data.timezone,
                method: method?.code
            }, GEOLOCATION_APPROXIMATE)
            setPrayerLoading(false)
        })
    }

    const prayerPrecise = () => {
        setPrayerLoading(true)
        navigator.geolocation.getCurrentPosition(async (position) => {

            Storage.sync.get('prayer', async prayer => {
                const data = prayer as PrayerType

                await fetchDataPrayer({
                    lat: position.coords.latitude.toString(),
                    lng: position.coords.longitude.toString(),
                    timezone: data.tz,
                    method: data.method
                }, GEOLOCATION_PRECISE)

                setPrayerLoading(false)
            })

        }, () => {
            setPrayerLoading(false)
            errorNotifyRef.current!.textContent = 'Please allow your location'
            errorNotifyRef.current!.style = `display: inline-block`
        })
    }

    useEffect(() => {

        Storage.sync.watch("prayer", (item) => {

            const data = item as PrayerType
            isEnableRef.current!.checked = data?.enable ?? false
            geolocationRef.current!.value = data?.geolocation ?? ""

            const upcoming = prayer.next(data)
            Storage.sync.set("prayer", { upcoming });

            if (prayer.isExpired(data?.last_update ?? 0)) {
                if (data?.geolocation === GEOLOCATION_PRECISE) {
                    prayerPrecise()
                } else {
                    prayerApproximate()
                }
            }
            setShowSettings(data?.enable ? "" : "hidden")
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className={`weather-settings ${prayerLoading && 'loading'}`}>
        <h2 className='settings-title'>
            {prayerLoading && <Loader />} PRAYER TIME
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    ref={isEnableRef}
                    onChange={e => Storage.sync.set('prayer', { enable: e.target.checked })}
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
                            items={[
                                {
                                    value: "approximate",
                                    label: "Approximate"
                                },
                                {
                                    value: "precise",
                                    label: "Precise"
                                }
                            ]}
                            ref={geolocationRef}
                            onSelect={e => {
                                if (e.target.value === GEOLOCATION_APPROXIMATE) {
                                    prayerApproximate()
                                }
                                if (e.target.value === GEOLOCATION_PRECISE) {
                                    prayerPrecise()
                                }
                            }}
                        />
                    </div>
                </div>
                <span className="notify-error" ref={errorNotifyRef} />
            </div>
        </div>
    </div>
}

export default PrayerTime