import { useEffect } from "react"
import Each from "../../Each"
import Icon from "../../Icon"

import './style.css'
import Request from "../../../utils/Request"
import Storage from "../../../utils/Storage"

const prayTime = [
    {
        id: "imsak",
        icon: "imsak",
        title: "Imsak",
        time: "04:30",
        meridiem: "am",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-fajr",
        icon: "sholat-fajr",
        title: "Fajr",
        time: "04:30",
        meridiem: "pm",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-dhuhr",
        icon: "sholat-dhuhr",
        title: "Dhuhr",
        time: "04:30",
        meridiem: "am",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-asr",
        icon: "sholat-asr",
        title: "Asr",
        time: "04:30",
        meridiem: "am",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-maghrib",
        icon: "sholat-maghrib",
        title: "Maghrib",
        time: "04:30",
        meridiem: "am",
        notify: "off",
        upcoming: true
    },
    {
        id: "sholat-isha",
        icon: "sholat-isha",
        title: "Isha",
        time: "04:30",
        meridiem: "",
        notify: "on",
        upcoming: false
    },
]

const PrayerTime = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Request.get({
                    path: "/prayer-times",
                    query: {
                        date: "18-03-2025",
                        lat: "-7.759001752250615",
                        lng: "110.36443936744945",
                        method: "20"
                    }
                });
                const res = await response.json()
                Storage.sync.set('fajr', {
                    time: res.data.fajr
                })
                console.log("API Response:", response.ok, res.data.fajr);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [])

    return (
        <div className="prayer-time">
            <Each
                data={prayTime}
                render={(item, key) => (
                    <div className={`__pad ${item.upcoming && 'active'}`} key={key}>
                        <Icon className="notify-icon" icon={`notify-${item.notify}`} />
                        <Icon className="pad-icon" icon={item.icon} />
                        <div className="pad-time">{item.time} <span className="time-meridiem">{item.meridiem}</span></div>
                        <div className="pad-name">{item.title}</div>
                    </div>
                )}
            />
        </div>
    )
}

export default PrayerTime 