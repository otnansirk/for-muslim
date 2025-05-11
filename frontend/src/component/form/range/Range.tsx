import { RefObject } from 'react'

import './style.css'


type RangeProps = {
    value?: string
    ref?: RefObject<HTMLInputElement | null>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Range = ({ onChange, value, ref }: RangeProps) => {
    return <>
        <input type='range' min={1} max={100} onChange={onChange} defaultValue={value} ref={ref} />
    </>
}

export default Range