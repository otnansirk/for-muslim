import { useEffect, useState } from "react"
import { PrayerTimeType, PrayerType, StorageType, TimesType } from "../../../types/Storage"
import { PRAYER_NAMES } from "../../../constant/prayer"
import { firstUpper } from "../../../utils/Strings"
import * as prayer from "../../../utils/Prayer"
import Datetime from "../../../utils/Datetime"
import Storage from "../../../utils/Storage"
import Request from "../../../utils/Request"
import Alarms from "../../../utils/Alarms"
import Loader from "../../loader/Loader"
import Each from "../../Each"
import Icon from "../../Icon"

import './style.css'

type PrayerTimeProps = {
    lat: string
    lng: string
    tz: string
}

const PrayerTime = (props: PrayerTimeProps) => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerType>();

    useEffect(() => {
        const calculateMethod = ["Asia/Jakarta"].includes(props.tz) ? "20" : "3"

        const fetchData = async () => {
            if (!props.lat && !props.lng) {
                return
            }
            try {
                const response = await Request.get({
                    path: "/prayer-times",
                    query: {
                        date: `${Datetime.get().day}-${Datetime.get({ month: "2-digit" }).month}-${Datetime.get().year}`,
                        lat: props.lat,
                        lng: props.lng,
                        method: calculateMethod
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

                Storage.sync.get("prayer", (item) => {
                    const currentData = item as StorageType["prayer"]
                    let prayers: PrayerType = {}
                    PRAYER_NAMES.forEach((name: string) => {
                        prayers = Object.assign(prayers, {
                            [name]: {
                                id: name,
                                icon: name,
                                title: firstUpper(name),
                                datetime: times[name as keyof TimesType],
                                time: Datetime.get({ timestring: times[name as keyof TimesType] }).hours + ':' + Datetime.get({ timestring: times[name as keyof TimesType] }).minutes,
                                ringing: currentData?.[name as keyof TimesType]?.ringing ?? false,
                                hours_in_seconds: parseInt(Datetime.get({ timestring: times[name as keyof TimesType] }).hours) * 60 + parseInt(Datetime.get({ timestring: times[name as keyof TimesType] }).minutes)
                            }
                        })
                    })

                    const upcoming = prayer.next(prayers)
                    const data = {
                        ...prayers,
                        upcoming,
                        last_update: Date.now(),
                        hijri: res.data.hijri.readable
                    }

                    Storage.sync.set("prayer", data);
                    setPrayerTimes(data)
                })

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        Storage.sync.get('prayer', data => {
            const prayers = data as PrayerType

            if (prayer.isExpired(prayers?.last_update ?? 0)) {
                fetchData();
            } else {
                const upcoming = prayer.next(prayers)
                setPrayerTimes({ ...prayers, upcoming })
            }
        })

    }, [props])

    const notifyHandler = (key: keyof PrayerType, ringing: boolean) => {
        if (!prayerTimes) return;

        Storage.sync.set("prayer", {
            [key]: {
                ringing: ringing
            }
        })
        setPrayerTimes(state => ({
            ...state,
            [key]: {
                ...(state?.[key] as PrayerTimeType) ?? {},
                ringing: ringing,
            }
        }));

        if (ringing) {
            const notifyTimePrayer = (prayerTimes[key] as PrayerTimeType).time
            Alarms.set(key, notifyTimePrayer)
        } else {
            Alarms.delete(key)
        }
    }


    return (
        <div className="prayer-time">

            <div className='hijri-date'>
                {prayerTimes?.hijri}
            </div>

            <div className="times">
                {
                    prayerTimes
                        ? <Each
                            data={PRAYER_NAMES}
                            render={(name, key) => {
                                const data = prayerTimes as PrayerType
                                const prayer = data[name as keyof TimesType] as PrayerTimeType
                                const isUpcoming = prayer.id === data.upcoming?.id
                                return (
                                    <div className={`__pad ${isUpcoming && 'active'}`} key={key}>
                                        <span onClick={() => { if (prayer) { notifyHandler(prayer.id as keyof PrayerType, !prayer.ringing) } }}>
                                            <Icon className="notify-icon" icon={`notify-${prayer.ringing ? "on" : "off"}`} />
                                        </span>
                                        <Icon className="pad-icon" icon={prayer.icon ?? ''} />
                                        <div className="pad-time">{prayer.time} <span className="time-meridiem">{prayer.meridiem}</span></div>
                                        <div className="pad-name">{prayer.title}</div>
                                    </div>
                                )
                            }}
                        />
                        : <Loader />
                }
            </div>
        </div>
    )
}

export default PrayerTime 