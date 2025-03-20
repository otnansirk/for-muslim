import { useEffect, useState } from "react"
import { PrayerTimeType, PrayerType, StorageType } from "../../../types/Storage"
import { ASC, nextPrayer, TimesType } from "../../../utils/Prayer"
import { firstUpper } from "../../../utils/Strings"
import { date } from "../../../utils/Datetime"
import Request from "../../../utils/Request"
import Storage from "../../../utils/Storage"
import Loader from "../../loader/Loader"
import Each from "../../Each"
import Icon from "../../Icon"

import './style.css'

type PrayerTimeProps = {
    lat: string
    lng: string
    tz: string
}

const prayerNames = ["imsak", "fajr", "dhuhr", "asr", "maghrib", "isha"];
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

                const times = {
                    imsak: res.data.imsak,
                    fajr: res.data.fajr,
                    dhuhr: res.data.dhuhr,
                    asr: res.data.asr,
                    maghrib: res.data.maghrib,
                    isha: res.data.isha
                };
                const upcoming = nextPrayer(times)

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
                            upcoming: upcoming === i
                        }

                        if (prayerData && prayerNames.includes(i)) {
                            time = Object.assign(time, prayerData)
                        }
                        prayers = Object.assign(prayers, { [i]: time })
                    });

                    const data = {
                        ...prayers,
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

        Storage.sync.get('prayer', prayer => {
            const res = prayer as PrayerType

            if (res?.last_update) {
                const filteredTimes = Object.entries(res ?? {})
                    .filter((entry): entry is [string, PrayerTimeType] => prayerNames.includes(entry[0]))
                    .sort(ASC)
                    .reduce((acc, [key, value]) => {
                        acc[key] = { ...(value as PrayerTimeType), };
                        return acc;
                    }, {} as Record<string, PrayerTimeType>);

                const times = Object.fromEntries(
                    Object.keys(filteredTimes).map((key) => [key, filteredTimes[key]?.time ?? ""])
                ) as TimesType;

                const upcoming = nextPrayer(times)
                Object.entries(filteredTimes).forEach(([key, value]) => {
                    filteredTimes[key] = { ...value, upcoming: key === upcoming };
                });

                setPrayerTimes(filteredTimes)
                setHijri(res?.hijri)

                const fiveHours = 5 * 60 * 60 * 1000; // 5hr
                const expiredAt = res?.last_update + fiveHours
                const isExpired = expiredAt < Date.now()

                if (isExpired) {
                    fetchData();
                }

            } else {
                fetchData();
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