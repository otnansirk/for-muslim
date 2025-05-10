import { useEffect, useState } from "react"
import { PrayerTimeType, PrayerType, TimesType } from "../../../types/Storage"
import { PRAYER_NAMES } from "../../../constant/prayer"
import Storage from "../../../utils/Storage"
import Alarms from "../../../utils/Alarms"
import Each from "../../Each"
import Icon from "../../Icon"

import './style.css'


const PrayerTime = () => {

    const [prayerTimes, setPrayerTimes] = useState<PrayerType>();
    const [show, setShow] = useState<string>("");


    useEffect(() => {
        Storage.sync.watch('prayer', data => {
            const prayer = data as PrayerType
            setShow(prayer?.enable ? "" : "hidden")
            setPrayerTimes(prayer)
        })
    }, [])

    const notifyHandler = (key: keyof PrayerType, ringing: boolean) => {
        if (!prayerTimes) return;

        Storage.sync.set("prayer", {
            [key]: {
                ringing: ringing
            }
        })

        if (ringing) {
            const notifyTimePrayer = (prayerTimes[key] as PrayerTimeType).time
            Alarms.set(key, notifyTimePrayer)
        } else {
            Alarms.delete(key)
        }
    }


    return (
        <div className={`prayer-time ${show} ${prayerTimes?.last_update && 'fade-in'}`}>
            <div className='hijri-date'>
                {prayerTimes?.hijri}
            </div>

            <div className="times">
                {
                    prayerTimes?.last_update // Check if exist
                    && <Each
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
                }
            </div>
        </div>
    )
}

export default PrayerTime 