import { useEffect, useRef } from 'react'
import { useGreetingsStore } from '../../../utils/Store'
import { GreetingType } from '../../../types/Storage'
import Datetime from '../../../utils/Datetime'
import Storage from '../../../utils/Storage'

import './style.css'

const Greeting = () => {
    const nameRef = useRef<HTMLSpanElement>(null)
    const greetingsRef = useRef<HTMLSpanElement>(null)

    const fontSize = useGreetingsStore(state => state.fontSize)
    const textShadow = useGreetingsStore(state => state.textShadow)

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

    useEffect(() => {
        const vFontSize = `${fontSize / 20}rem`
        greetingsRef.current!.style.fontSize = vFontSize
        nameRef.current!.style.fontSize = vFontSize
    }, [fontSize])

    useEffect(() => {
        const vTextShadow = `1px 2px 6px rgba(0, 0, 0, ${textShadow / 100}`
        greetingsRef.current!.style.textShadow = vTextShadow
        nameRef.current!.style.textShadow = vTextShadow
    }, [textShadow])

    return (
        <div className="greeting">
            <span ref={greetingsRef} />
            <span ref={nameRef} />
        </div >
    )
}

export default Greeting