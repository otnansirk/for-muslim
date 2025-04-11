
import { useState } from 'react'
import Icon from '../Icon'

import './style.css'


const Settings = () => {
    const [openSetting, setOpenSetting] = useState("opened")

    return <div className={`settings ${openSetting}`}>
        <div className='gear'>
            <div className='gear-icon' onClick={() => setOpenSetting(state => state === "opened" ? "closed" : "opened")}>
                <Icon icon='gear' className={openSetting} />
            </div>
        </div>
        <div className={`wrapper ${openSetting}`}>
            <h2 className='settings-title'>
                GREATINGS
            </h2>
            <div className='settings-items'>
                <div className='items'>
                    <div className='items-title'>
                        Enable
                    </div>
                    <label className='items-input'>
                        <input type='checkbox' />
                        <div className='switch' />
                    </label>
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Name
                    </div>
                    <label className='items-input'>
                        <input type='text' />
                    </label>
                </div>
            </div>
        </div>
    </div>
}

export default Settings