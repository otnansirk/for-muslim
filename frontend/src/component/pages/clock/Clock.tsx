import { useEffect, useRef, useState } from 'react';
import { DateType, TimeType } from '../../../types/Storage';
import Datetime from '../../../utils/Datetime';
import Storage from '../../../utils/Storage';

import './style.css'


const Clock = () => {
    const dateRef = useRef<HTMLDivElement>(null)
    const timeRef = useRef<HTMLDivElement>(null)
    const meridiemRef = useRef<HTMLDivElement>(null)
    const secondsRef = useRef<HTMLDivElement>(null)
    const secondSeparatorRef = useRef<HTMLDivElement>(null)

    const [weekday, setWeekday] = useState<string | null>(null)
    const [day, setDay] = useState<string | null>(null)
    const [month, setMonth] = useState<string | null>(null)

    const [hours, setHours] = useState<string | null>(null)
    const [minutes, setMinutes] = useState<string | null>(null)
    const [seconds, setSeconds] = useState<string | null>(null)
    const [meridiem, setMeridiem] = useState<string | null>(null)

    const setTime = () => {
        Storage.sync.watch('time', (item) => {
            const time = item as TimeType
            const cdate = Datetime.get(time)

            setDay(cdate.day)
            setWeekday(cdate.weekday)
            setMonth(cdate.month)

            setHours(cdate.hours)
            setMinutes(cdate.minutes)
            setSeconds(cdate.seconds)
            setMeridiem(cdate.meridiem.toLowerCase())
        })
    }

    useEffect(() => {
        setTime()

        Storage.sync.watch('date', (item) => {
            const date = item as DateType
            if (date?.enable) {
                dateRef.current!.textContent = `${Datetime.format(date.format?.value, date.format?.config)}`
            } else {
                dateRef.current!.textContent = ""
            }
        })

        Storage.sync.watch('time', (item) => {
            const time = item as TimeType
            window.scrollTo({ top: document.body.scrollTop, behavior: "smooth" });
            if (time) {
                timeRef.current!.style = `display: ${time.enable ? 'flex' : 'none'}`
                meridiemRef.current!.style = `display: ${time.show_ampm ? 'inline-block' : 'none'}`
                secondsRef.current!.style = `display: ${time.show_seconds ? 'inline-block' : 'none'}`
                secondSeparatorRef.current!.style = `display: ${time.show_seconds ? 'inline-block' : 'none'}`
            }
        })

        const interval = setInterval(setTime, 1000)
        return () => clearInterval(interval);
    }, [weekday, month, day])


    return (
        <div className='clock'>
            <div className='clock-wrapper'>
                <div className="clock-digital" ref={timeRef}>
                    <span className="hours">{hours}</span>
                    {
                        hours &&
                        <span className="separation">:</span>
                    }
                    <span className="minutes">{minutes}</span>
                    <span className="separation" ref={secondSeparatorRef}>:</span>
                    <span className="seconds" ref={secondsRef}>{seconds}</span>
                    <span className="meridiem" ref={meridiemRef}>{meridiem}</span>
                </div>
                <div className='clock-date' ref={dateRef} />
            </div>
        </div>
    )
}

export default Clock