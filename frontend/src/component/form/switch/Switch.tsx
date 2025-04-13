import { RefObject } from 'react'

import './style.css'


type SwitchProps = {
    isChecked?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    ref?: RefObject<HTMLInputElement | null>
}

const Switch = ({ onChange, isChecked, ref }: SwitchProps) => {

    return <label className='switch-input'>
        <input type='checkbox' defaultChecked={isChecked} onChange={onChange} ref={ref} />
        <div className='switch' />
    </label>
}

export default Switch