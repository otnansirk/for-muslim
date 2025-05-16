import { RefObject } from 'react'

import './style.css'


type RangeProps = {
    value?: string
    min?: number
    max?: number
    step?: number
    ref?: RefObject<HTMLInputElement | null>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Range = ({ onChange, value, min, max, step, ref }: RangeProps) => {
    return <>
        <input type='range' min={min} max={max} step={step} onChange={onChange} defaultValue={value} ref={ref} />
    </>
}

export default Range