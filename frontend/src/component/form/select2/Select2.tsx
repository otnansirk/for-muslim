import { RefObject } from 'react'
import Each from '../../Each'

import './style.css'


type Options = {
    value: string;
    text: string;
}

type SelectProps = {
    items: {
        label: string
        options: Options[];
    }[]
    value?: string
    ref?: RefObject<HTMLSelectElement | null>
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}


const Select2 = ({ onSelect, items, value, ref }: SelectProps) => {
    return <select className='form-items select-optgroup' onChange={onSelect} value={value} ref={ref}>
        <Each
            data={items}
            render={item => (
                <optgroup label={item.label} key={item.label}>
                    <Each
                        data={item.options}
                        render={item => <option key={item.value} value={item.value}>{item.text}</option>}
                    />
                </optgroup>
            )}
        />
    </select>
}

export default Select2