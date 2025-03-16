import Each from "../../Each"
import Icon from "../../Icon"

import './style.css'

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