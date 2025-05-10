import { useEffect, useRef, useState } from "react"
import { GEOLOCATION_APPROXIMATE, GEOLOCATION_PRECISE } from "../../../constant/weather"
import { CALCULATE_METHOD, CALCULATE_METHOD_MWL, PRAYER_NAMES } from "../../../constant/prayer"
import { LocationType, PrayerType, TimesType } from "../../../types/Storage"
import SelectGroup from "../../form/select-group/SelectGroup"
import { PrayerQueryParamsType } from "../../../types/Prayer"
import { TimezoneType } from "../../../types/timezone"
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
    const calculateMethodRef = useRef<HTMLSelectElement>(null)

    const [showSettings, setShowSettings] = useState("hidden")
    const [prayerLoading, setPrayerLoading] = useState<boolean>(false)
    const [timezones, setTimezones] = useState<TimezoneType[]>([])
    const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>(undefined)


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
                tz: queryParams?.timezone,
                hijri: res.data.hijri.readable,
                last_update: Date.now()
            }

            Storage.sync.set("prayer", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const prayerApproximate = (queryParams?: PrayerQueryParamsType) => {
        Storage.sync.watch('location', async loc => {
            setPrayerLoading(true)
            const data = loc as LocationType
            if (!data) return

            const method = CALCULATE_METHOD.find(item => item.keyword.includes(data?.timezone ?? ""))
            await fetchDataPrayer({
                lat: data.lat,
                lng: data.lng,
                timezone: data.timezone,
                method: method?.value ?? CALCULATE_METHOD_MWL,
                ...queryParams
            }, GEOLOCATION_APPROXIMATE)
            setPrayerLoading(false)
        })
    }

    const prayerPrecise = (queryParams?: PrayerQueryParamsType) => {
        setPrayerLoading(true)
        navigator.geolocation.getCurrentPosition(async (position) => {

            Storage.sync.get('prayer', async prayer => {
                const data = prayer as PrayerType

                await fetchDataPrayer({
                    lat: position.coords.latitude.toString(),
                    lng: position.coords.longitude.toString(),
                    timezone: data.tz,
                    method: data.method,
                    ...queryParams
                }, GEOLOCATION_PRECISE)

                setPrayerLoading(false)
            })

        }, () => {
            setPrayerLoading(false)
            errorNotifyRef.current!.textContent = 'Please allow your location'
            errorNotifyRef.current!.style = `display: inline-block`
        })
    }

    const changeCalculateMethodHandler = (method: string): void => {

        Storage.sync.get('prayer', data => {
            const pry = data as PrayerType
            const q: PrayerQueryParamsType = {
                method,
                timezone: pry.tz
            }
            if (pry?.geolocation === GEOLOCATION_PRECISE) {
                prayerPrecise(q)
            } else {
                prayerApproximate(q)
            }
        })
    }

    const changeTimezoneHandler = (timezone: string): void => {

        Storage.sync.get('prayer', res => {
            const data = res as PrayerType
            const times: TimesType = {
                imsak: data.imsak?.datetime ?? "",
                fajr: data.fajr?.datetime ?? "",
                dhuhr: data.dhuhr?.datetime ?? "",
                asr: data.asr?.datetime ?? "",
                maghrib: data.maghrib?.datetime ?? "",
                isha: data.isha?.datetime ?? ""
            };

            let prayers: PrayerType = {}
            PRAYER_NAMES.forEach((name: string) => {
                const datetime = Datetime.get({ timestring: times[name as keyof TimesType], tz: timezone })
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
            Storage.sync.set("prayer", { ...prayers, tz: timezone });
        })
    }

    useEffect(() => {
        const fetchDataTimezone = async () => {
            try {
                const response = await Request.get({
                    path: "/timezones"
                });

                const res = await response.json()
                const data = res.data as TimezoneType[]
                setTimezones(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataTimezone()

        Storage.sync.watch("prayer", (item) => {

            const data = item as PrayerType
            isEnableRef.current!.checked = data?.enable ?? false
            geolocationRef.current!.value = data?.geolocation ?? ""

            const upcoming = prayer.next(data)
            Storage.sync.set("prayer", { upcoming });
            setSelectedTimezone(data.tz)
            calculateMethodRef.current!.value = data.method ?? ""

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
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Timezone
                    </div>
                    <SelectGroup
                        items={timezones}
                        onSelect={(e) => changeTimezoneHandler(e.target.value)}
                        value={selectedTimezone}
                    />
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Calculate Method
                    </div>
                    <Select
                        items={CALCULATE_METHOD}
                        ref={calculateMethodRef}
                        onSelect={(e) => changeCalculateMethodHandler(e.target.value)}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default PrayerTime