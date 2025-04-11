import './style.css'

type SwitchProps = {
    isChecked: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Switch = ({ onChange, isChecked }: SwitchProps) => {
    return <label className='switch-input'>
        <input type='checkbox' defaultChecked={isChecked} onChange={onChange} />
        <div className='switch' />
    </label>
}

export default Switch