import { useEffect, useRef } from 'react'
import { GreatingType } from '../../../types/Storage'
import Datetime from '../../../utils/Datetime'
import Storage from '../../../utils/Storage'

import './style.css'

const Greating = () => {
    const nameRef = useRef<HTMLSpanElement>(null)
    const greatingsRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        Storage.sync.watch('greating', (item) => {
            const great = item as GreatingType
            if (great.enable) {
                const name = great?.name ? ", " + great?.name : ""
                nameRef.current!.textContent = name
                greatingsRef.current!.textContent = Datetime.greating()
            } else {
                nameRef.current!.textContent = ""
                greatingsRef.current!.textContent = ""
            }
        })
    }, [])

    return (
        <div className="greating">
            <span ref={greatingsRef} />
            <span ref={nameRef} />
        </div >
    )
}

export default Greating