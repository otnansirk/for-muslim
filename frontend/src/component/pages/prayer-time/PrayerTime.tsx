import { useEffect, useState } from "react"
import { PrayerTimeType, PrayerType, StorageType, TimesType } from "../../../types/Storage"
import { PRAYER_NAMES } from "../../../constant/prayer"
import { firstUpper } from "../../../utils/Strings"
import * as prayer from "../../../utils/Prayer"
import { date } from "../../../utils/Datetime"
import Storage from "../../../utils/Storage"
import Request from "../../../utils/Request"
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
    const [hijri, setHijri] = useState<string | undefined>("");

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
                        date: `${date().day}-${date({ month: "2-digit" }).month}-${date().year}`,
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
                const upcoming = prayer.next(times)

                Storage.sync.get("prayer", (item) => {
                    const currentData = item as StorageType["prayer"]

                    let prayers: PrayerType = {}
                    Object.keys(times).forEach((key) => {
                        const i = key as keyof StorageType["prayer"]
                        const prayerData = currentData?.[i]
                        let time = {
                            id: i,
                            icon: i,
                            title: firstUpper(i),
                            time: times[i],
                            ringing: false,
                            upcoming: upcoming.name === i
                        }

                        if (prayerData && PRAYER_NAMES.includes(i)) {
                            time = Object.assign(time, prayerData)
                        }
                        prayers = Object.assign(prayers, { [i]: time })
                    });

                    const data = {
                        ...prayers,
                        times,
                        last_update: Date.now(),
                        hijri: res.data.hijri.readable
                    }

                    Storage.sync.set("prayer", data);
                    setPrayerTimes(prayers)
                    setHijri(data.hijri)
                })

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        Storage.sync.get('prayer', data => {
            const prayerData = data as PrayerType

            if (prayer.isExpired(prayerData?.last_update ?? 0)) {
                fetchData();
            } else {
                const { prayers, times } = prayer.prayer(prayerData)
                const upcoming = prayer.next(times)
                Object.entries(prayers).forEach(([key, value]) => {
                    prayers[key] = { ...value, upcoming: key === upcoming.name };
                });
                setPrayerTimes(prayers)
                setHijri(prayerData?.hijri)
            }
        })

    }, [props])

    const notifyHandler = (key: keyof PrayerType) => {
        if (!prayerTimes) return;

        Storage.sync.set("prayer", {
            [key]: {
                ringing: !(prayerTimes[key] as PrayerTimeType).ringing
            }
        })
        setPrayerTimes(state => ({
            ...state,
            [key]: {
                ...(state?.[key] as PrayerTimeType) ?? {},
                ringing: !(state?.[key] as PrayerTimeType).ringing,
            }
        }));
    }

    return (
        <div className="prayer-time">

            <div className='hijri-date'>
                {hijri}
            </div>

            <div className="times">
                {
                    Object.values(prayerTimes ?? {}).length
                        ? <Each
                            data={Object.values(prayerTimes ?? {})}
                            render={(item, key) => {
                                const data = item as PrayerTimeType
                                return (
                                    <div className={`__pad ${data.upcoming && 'active'}`} key={key}>
                                        <span onClick={() => { if (data.id) { notifyHandler(data.id as keyof PrayerType) } }}>
                                            <Icon className="notify-icon" icon={`notify-${data.ringing ? "on" : "off"}`} />
                                        </span>
                                        <Icon className="pad-icon" icon={data.icon ?? ''} />
                                        <div className="pad-time">{data.time} <span className="time-meridiem">{data.meridiem}</span></div>
                                        <div className="pad-name">{data.title}</div>
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