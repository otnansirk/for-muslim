
import { useEffect, useRef, useState } from 'react'

import PrayerTime from './prayer-time/PrayerTime'
import Background from './background/Background'
import Greetings from './greetings/Greetings'
import DateAndTime from './clock/DateAndTime'
import Weather from './weather/Weather'
import Icon from '../Icon'

import './style.css'


const Settings = () => {
    const settingRef = useRef<HTMLDivElement>(null)

    const [openSetting, setOpenSetting] = useState("")

    useEffect(() => {
        const onOutsideClick = (ev: MouseEvent) => {
            if (!settingRef.current?.contains(ev.target as Node)) setOpenSetting("closed")
        }

        document.addEventListener("mousedown", onOutsideClick)
        return () => {
            document.removeEventListener("mousedown", onOutsideClick)
        }

    }, [])


    return <div className={`settings ${openSetting}`} ref={settingRef}>
        <div className='gear'>
            <div className='gear-icon' onClick={() => setOpenSetting(state => state === "opened" ? "closed" : "opened")}>
                <Icon icon='gear' className={openSetting} />
            </div>
        </div>
        <div className={`wrapper ${openSetting}`}>
            <Greetings />
            <PrayerTime />
            <Background />
            <DateAndTime />
            <Weather />
        </div>
    </div>
}

export default Settings