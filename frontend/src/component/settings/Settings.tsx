
import { useState } from 'react'
import Greatings from './greatings/Gratings'
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
            <Greatings />
        </div>
    </div>
}

export default Settings