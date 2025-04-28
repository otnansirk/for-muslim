import { useEffect, useRef } from 'react';
import { DateType, TimeType } from '../../../types/Storage';
import { TimeFormatType } from '../../../types/datetime';
import Datetime from '../../../utils/Datetime';
import Storage from '../../../utils/Storage';

import './style.css'


const Clock = () => {
    const dateRef = useRef<HTMLDivElement>(null)
    const timeRef = useRef<HTMLDivElement>(null)
    const hoursRef = useRef<HTMLSpanElement>(null)
    const minutesRef = useRef<HTMLSpanElement>(null)
    const meridiemRef = useRef<HTMLSpanElement>(null)
    const secondsRef = useRef<HTMLSpanElement>(null)


    useEffect(() => {
        const setTime = () => {
            Storage.sync.watch('time', (item) => {
                const time = item as TimeType
                const ftime = Datetime.get(time) as TimeFormatType

                if (time) {
                    timeRef.current!.style = `display: ${time.enable ? 'flex' : 'none'}`
                    meridiemRef.current!.style = `display: ${time.show_ampm ? 'inline-block' : 'none'}`
                    secondsRef.current!.style = `display: ${time.show_seconds ? 'inline-block' : 'none'}`
                }

                hoursRef.current!.textContent = ftime.hours
                minutesRef.current!.textContent = `:${ftime.minutes}` + `${time.show_seconds ? ':' : ''}`
                secondsRef.current!.textContent = `${ftime.seconds}`
                meridiemRef.current!.textContent = ftime.meridiem
            })
        }
        setTime()

        Storage.sync.watch('date', (item) => {
            const date = item as DateType
            if (date?.enable) {
                dateRef.current!.textContent = `${Datetime.format(date.format?.value, date.format?.config)}`
            } else {
                dateRef.current!.textContent = ""
            }
        })

        const interval = setInterval(setTime, 1000)
        return () => clearInterval(interval);
    }, [])


    return (
        <div className='clock'>
            <div className='clock-wrapper'>
                <div className="clock-digital" ref={timeRef}>
                    <span className="hours" ref={hoursRef} />
                    <span className="minutes" ref={minutesRef} />
                    <span className="seconds" ref={secondsRef} />
                    <span className="meridiem" ref={meridiemRef} />
                </div>
                <div className='clock-date' ref={dateRef} />
            </div>
        </div>
    )
}

export default Clock