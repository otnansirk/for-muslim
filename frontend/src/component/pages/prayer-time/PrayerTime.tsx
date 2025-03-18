import { useEffect, useState } from "react"
import { firstUpper } from "../../../utils/Strings"
import { nextPrayer } from "../../../utils/Prayer"
import { date } from "../../../utils/Datetime"
import Request from "../../../utils/Request"
import Storage from "../../../utils/Storage"
import Loader from "../../loader/Loader"
import Each from "../../Each"
import Icon from "../../Icon"

import './style.css'

type TimeType = {
    id: string
    icon: string
    title: string
    time: string
    meridiem: string
    notify: string
    upcoming: boolean
}

type PrayerTimeProps = {
    lat: string
    lng: string
    tz: string
}

const PrayerTime = (props: PrayerTimeProps) => {
    const [prayerTimes, setPrayerTimes] = useState<TimeType[]>([]);
    const [hijri, setHijri] = useState("");

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
                console.log(upcoming, "UPPP");

                // Chrome Storage
                Object.keys(times).forEach((key) => {
                    const i = key as keyof typeof times

                    const time = {
                        id: i,
                        icon: i,
                        title: firstUpper(i),
                        time: times[i],
                        meridiem: "",
                        notify: "off",
                        upcoming: upcoming === i
                    }

                    setPrayerTimes(state => ([...state, time]));
                    Storage.sync.set(i, { time: times[i] });
                });

                Storage.sync.set("hijri", res.data.hijri.readable);
                setHijri(res.data.hijri.readable)

                console.log("API Response:", response.ok);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [props])

    return (
        <div className="prayer-time">

            <div className='hijri-date'>
                {hijri}
            </div>

            <div className="times">
                {
                    prayerTimes.length
                        ? <Each
                            data={prayerTimes}
                            render={(item, key) => (
                                <div className={`__pad ${item.upcoming && 'active'}`} key={key}>
                                    <Icon className="notify-icon" icon={`notify-${item.notify}`} />
                                    <Icon className="pad-icon" icon={item.icon} />
                                    <div className="pad-time">{item.time} <span className="time-meridiem">{item.meridiem}</span></div>
                                    <div className="pad-name">{item.title}</div>
                                </div>
                            )}
                        />
                        : <Loader />
                }
            </div>
        </div>
    )
}

export default PrayerTime 