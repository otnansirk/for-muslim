import './style.css'

type InputProps = {
    value: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ onChange, value, placeholder }: InputProps) => <input type='text' onChange={onChange} defaultValue={value} placeholder={placeholder} />

export default Input