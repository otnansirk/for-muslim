
import { useState } from 'react'

import PrayerTime from './prayer-time/PrayerTime'
import Greetings from './greetings/Greetings'
import DateAndTime from './clock/DateAndTime'
import Weather from './weather/Weather'
import Icon from '../Icon'

import './style.css'
import Background from './background/Background'


const Settings = () => {
    const [openSetting, setOpenSetting] = useState("")

    return <div className={`settings ${openSetting}`}>
        <div className='gear'>
            <div className='gear-icon' onClick={() => setOpenSetting(state => state === "opened" ? "closed" : "opened")}>
                <Icon icon='gear' className={openSetting} />
            </div>
        </div>
        <div className={`wrapper ${openSetting}`}>
            <Greetings />
            <DateAndTime />
            <Weather />
            <PrayerTime />
            <Background />
        </div>
    </div>
}

export default Settings