import { useEffect, useState } from 'react';
import { time } from '../../../utils/Datetime';
import './style.css'

const Clock = () => {
    const [hours, setHours] = useState<string | null>(null)
    const [minutes, setMinutes] = useState<string | null>(null)
    const [meridiem, setMeridiem] = useState<string | null>(null)

    useEffect(() => {
        const ctime = time()
        setHours(ctime.hours)
        setMinutes(ctime.minutes)
        setMeridiem(ctime.meridiem.toLowerCase())

    }, [])

    return (
        <div className='clock'>
            <div className="clock-digital">
                <div className="hours">{hours}</div>
                <div className="separation">:</div>
                <div className="minutes">{minutes}</div>
                <div className="meridiem">{meridiem}</div>
            </div>
            <div className='clock-hijri'>
                Ahad, Ramadhan 16, 1446
            </div>
            <div className='clock-date'>
                Sunday, March 16
            </div>
        </div>
    )
}

export default Clock