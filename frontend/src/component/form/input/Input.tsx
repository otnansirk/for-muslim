import { RefObject } from 'react'
import './style.css'
import Each from '../../Each'

type InputProps = {
    value?: string
    datalist?: {
        value?: string
        label?: string
    }[]
    placeholder?: string
    ref?: RefObject<HTMLInputElement | null>
    datalistID?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ onChange, value, ref, placeholder, datalist, datalistID }: InputProps) => {
    return <>
        <input type='text' minLength={3} maxLength={60} spellCheck="false" autoComplete="off" list={datalistID ? datalistID : 'fm_input-list'} className='form-items' onChange={onChange} defaultValue={value} ref={ref} placeholder={placeholder} />
        {datalist &&
            <datalist id={datalistID ? datalistID : 'fm_input-list'} onChange={e => console.log(e.target)}>
                <Each
                    data={datalist}
                    render={(item, key) => <option key={key} value={item.value}>{item.label}</option>}
                />
            </datalist>
        }
    </>
}

export default Input