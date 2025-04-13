import { useEffect, useRef, useState } from 'react';
import Datetime from '../../../utils/Datetime';

import './style.css'
import Storage from '../../../utils/Storage';
import { DateType } from '../../../types/Storage';


const Clock = () => {
    const dateRef = useRef<HTMLDivElement>(null)

    const [weekday, setWeekday] = useState<string | null>(null)
    const [day, setDay] = useState<string | null>(null)
    const [month, setMonth] = useState<string | null>(null)

    const [hours, setHours] = useState<string | null>(null)
    const [minutes, setMinutes] = useState<string | null>(null)
    const [meridiem, setMeridiem] = useState<string | null>(null)

    const setTime = () => {
        const cdate = Datetime.get()
        setDay(cdate.day)
        setWeekday(cdate.weekday)
        setMonth(cdate.month)

        setHours(cdate.hours)
        setMinutes(cdate.minutes)
        setMeridiem(cdate.meridiem.toLowerCase())
    }

    useEffect(() => {
        setTime()

        Storage.sync.watch('date', (item) => {
            const date = item as DateType
            if (date.enable) {
                dateRef.current!.textContent = `${Datetime.format(date.format?.value, date.format?.config)}`
            } else {
                dateRef.current!.textContent = ""
            }
        })

        const interval = setInterval(setTime, 1000)
        return () => clearInterval(interval);
    }, [weekday, month, day])


    return (
        <div className='clock'>
            <div className="clock-digital">
                <div className="hours">{hours}</div>
                <div className="separation">:</div>
                <div className="minutes">{minutes}</div>
                <div className="meridiem">{meridiem}</div>
            </div>
            <div className='clock-date' ref={dateRef} />
        </div>
    )
}

export default Clock