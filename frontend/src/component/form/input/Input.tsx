import { RefObject } from 'react'
import './style.css'

type InputProps = {
    value?: string
    placeholder?: string
    ref?: RefObject<HTMLInputElement | null>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ onChange, value, ref, placeholder }: InputProps) => <input type='text' onChange={onChange} defaultValue={value} ref={ref} placeholder={placeholder} />

export default Input