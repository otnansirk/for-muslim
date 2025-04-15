import { RefObject } from 'react'
import Each from '../../Each'

import './style.css'


type SelectProps = {
    items: {
        value: string
        label: string
    }[]
    value?: string
    ref?: RefObject<HTMLSelectElement | null>
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ onSelect, items, value, ref }: SelectProps) => {
    return <select className='form-items select-option' onChange={onSelect} defaultValue={value} ref={ref}>
        <Each
            data={items}
            render={(item, key) => <option key={key} value={item.value}>{item.label}</option>}
        />
    </select>
}

export default Select