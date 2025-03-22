import { useEffect, useState } from 'react';
import { time, date } from '../../../utils/Datetime';

import './style.css'


const Clock = () => {
    const [weekday, setWeekday] = useState<string | null>(null)
    const [day, setDay] = useState<string | null>(null)
    const [month, setMonth] = useState<string | null>(null)

    const [hours, setHours] = useState<string | null>(null)
    const [minutes, setMinutes] = useState<string | null>(null)
    const [meridiem, setMeridiem] = useState<string | null>(null)

    const setTime = () => {
        const ctime = time()
        const cdate = date()
        setDay(cdate.day)
        setWeekday(cdate.weekday)
        setMonth(cdate.month)

        setHours(ctime.hours)
        setMinutes(ctime.minutes)
        setMeridiem(ctime.meridiem.toLowerCase())
    }

    useEffect(() => {
        setTime()

        const interval = setInterval(setTime, 1000)
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='clock'>
            <div className="clock-digital">
                <div className="hours">{hours}</div>
                <div className="separation">:</div>
                <div className="minutes">{minutes}</div>
                <div className="meridiem">{meridiem}</div>
            </div>
            <div className='clock-date'>
                {weekday}, {month} {day}
            </div>
        </div>
    )
}

export default Clock