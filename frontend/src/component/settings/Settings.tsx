
import { useState } from 'react'
import Greetings from './greetings/Greetings'
import DateAndTime from './clock/DateAndTime'
import Icon from '../Icon'

import './style.css'


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
        </div>
    </div>
}

export default Settings