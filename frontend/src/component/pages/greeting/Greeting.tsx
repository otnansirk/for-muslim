import { useEffect, useRef } from 'react'
import { GreetingType } from '../../../types/Storage'
import Datetime from '../../../utils/Datetime'
import Storage from '../../../utils/Storage'

import './style.css'

const Greeting = () => {
    const nameRef = useRef<HTMLSpanElement>(null)
    const greetingsRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        Storage.sync.watch('greeting', (item) => {
            const great = item as GreetingType
            if (great?.enable) {
                const name = great?.name ? ", " + great?.name : ""
                nameRef.current!.textContent = name
                greetingsRef.current!.textContent = Datetime.greeting()
            } else {
                nameRef.current!.textContent = ""
                greetingsRef.current!.textContent = ""
            }
        })
    }, [])

    return (
        <div className="greeting">
            <span ref={greetingsRef} />
            <span ref={nameRef} />
        </div >
    )
}

export default Greeting