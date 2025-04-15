import { RefObject } from 'react'
import './style.css'
import Each from '../../Each'

type InputProps = {
    value?: string
    datalist?: {
        value: string
        label: string
    }[]
    placeholder?: string
    ref?: RefObject<HTMLInputElement | null>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ onChange, value, ref, placeholder, datalist }: InputProps) => {
    return <>
        <input type='text' list='fm_input-list' className='form-items' onChange={onChange} defaultValue={value} ref={ref} placeholder={placeholder} />
        {datalist &&
            <datalist id='fm_input-list'>
                <Each
                    data={datalist}
                    render={(item, key) => <option key={key} value={item.value}>{item.label}</option>}
                />
            </datalist>
        }
    </>
}

export default Input