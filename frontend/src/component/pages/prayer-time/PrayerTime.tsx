import { useEffect, useState } from "react"
import { PrayerTimeType, PrayerType, TimesType } from "../../../types/Storage"
import { getStatusAdhan, stopAdhan } from "../../../utils/Prayer"
import { PRAYER_NAMES } from "../../../constant/prayer"
import { sendNotify } from "../../../utils/Helpers"
import { firstUpper } from "../../../utils/Strings"
import Storage from "../../../utils/Storage"
import Each from "../../Each"
import Icon from "../../Icon"

import './style.css'


const PrayerTime = () => {

    const [prayerTimes, setPrayerTimes] = useState<PrayerType>();
    const [show, setShow] = useState<string>("");
    const [isAdhanPlaying, setIsAdhanPlaying] = useState<string>("");

    const chromeNotifyHandler = (key: keyof PrayerType, notify: boolean) => {
        if (!prayerTimes) return;
        if (notify) {
            sendNotify(firstUpper(key), "Chrome notification is ON !")
        }

        Storage.sync.set("prayer", {
            [key]: {
                chrome_notify: notify
            } as PrayerTimeType
        })
    }

    const adhanNotifyHandler = (key: keyof PrayerType, notify: boolean) => {
        if (!prayerTimes) return;
        if (notify) {
            sendNotify(firstUpper(key), "Audio notification is ON !")
        }

        Storage.sync.set("prayer", {
            [key]: {
                adhan_notify: notify
            } as PrayerTimeType
        })
    }

    useEffect(() => {
        Storage.sync.watch('prayer', async data => {
            const prayer = data as PrayerType
            setShow(prayer?.enable ? "" : "hidden")
            setPrayerTimes(prayer)

            const adhanStatus = await getStatusAdhan(undefined, 300)
            setIsAdhanPlaying(adhanStatus.type)
        })

        chrome.runtime.onMessage.addListener(async item => {
            const to = item?.to
            if (to !== 'ADHAN') return

            if (item?.data?.status === "playing") {
                const adhanStatus = await getStatusAdhan(undefined, 300)
                setIsAdhanPlaying(adhanStatus.type)
            }
            if (item?.data?.status === "stoped") {
                setIsAdhanPlaying("")
            }
        })
    }, [])


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

                                    {
                                        isAdhanPlaying == prayer.id
                                            ? <button className="pad-btnstop" onClick={() => {
                                                stopAdhan()
                                                setIsAdhanPlaying("")
                                            }}> STOP </button>
                                            : <>
                                                <span onClick={() => { if (prayer) { adhanNotifyHandler(prayer.id as keyof PrayerType, !prayer.adhan_notify) } }} title="Adhan Notification">
                                                    <Icon className={`adhan-icon ${prayer.adhan_notify ? "on" : "off"}`} icon={`adhan-${prayer.adhan_notify ? "on" : "off"}`} />
                                                </span>
                                                <span onClick={() => { if (prayer) { chromeNotifyHandler(prayer.id as keyof PrayerType, !prayer.chrome_notify) } }} title="Chrome Notification">
                                                    <Icon className={`notify-icon ${prayer.chrome_notify ? "on" : "off"}`} icon={`notify-${prayer.chrome_notify ? "on" : "off"}`} />
                                                </span>
                                            </>
                                    }
                                    <Icon className="pad-icon" icon={prayer.icon ?? ''} />
                                    <div className={`pad-time ${isAdhanPlaying == prayer.id && 'blink'}`}>{prayer.time} <span className="time-meridiem">{prayer.meridiem}</span></div>
                                    <div className={`pad-name ${isAdhanPlaying == prayer.id && 'blink'}`}>{prayer.title}</div>
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