
import { useState } from 'react'
import Icon from '../Icon'

import './style.css'
import Switch from '../form/switch/Switch'
import Input from '../form/input/Input'


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
                    <Switch
                        isChecked={false}
                        onChange={(e) => console.log(e.target.checked, "OKEEE")}
                    />
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Name
                    </div>
                    <Input
                        onChange={(ev) => console.log(ev.target.value)} value={"OKE"}
                        placeholder="Name"
                    />
                </div>
            </div>
        </div>
    </div>
}

export default Settings