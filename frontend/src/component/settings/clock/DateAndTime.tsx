import { useEffect, useRef, useState } from "react"
import { DATE_FORMAT } from "../../../constant/date_and_time"
import { DateType, TimeType } from "../../../types/Storage"
import Switch from "../../form/switch/Switch"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"

const DateAndTime = () => {
    const dateEnableRef = useRef<HTMLInputElement>(null)
    const dateFormatRef = useRef<HTMLSelectElement>(null)

    const timeEnableRef = useRef<HTMLInputElement>(null)
    const time24HoursRef = useRef<HTMLInputElement>(null)
    const timeShowSecondsRef = useRef<HTMLInputElement>(null)
    const timeShowAMPMRef = useRef<HTMLInputElement>(null)

    const [showAMPM, setShowAMPM] = useState("hidden")

    useEffect(() => {
        Storage.sync.watch("date", (item) => {
            const data = item as DateType
            dateEnableRef.current!.checked = data?.enable ?? false
            dateFormatRef.current!.value = data?.format?.value ?? ""
        })

        Storage.sync.watch("time", (item) => {
            const data = item as TimeType
            timeEnableRef.current!.checked = data?.enable ?? false
            time24HoursRef.current!.checked = data?.is_24_hours ?? false
            timeShowSecondsRef.current!.checked = data?.show_seconds ?? false
            timeShowAMPMRef.current!.checked = data?.show_ampm ?? false
            setShowAMPM(data?.is_24_hours ? "hidden" : "")
        })
    }, [])

    return <>
        <h2 className='settings-title'>
            DATE & TIME
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable Date
                </div>
                <Switch
                    ref={dateEnableRef}
                    onChange={e => Storage.sync.set('date', { enable: e.target.checked })}
                />
            </div>
            <hr />
            <div className='items'>
                <div className='items-title'>
                    Date Format
                </div>
                <Select
                    items={DATE_FORMAT}
                    ref={dateFormatRef}
                    onSelect={e => Storage.sync.set('date', { format: DATE_FORMAT.find(item => item.value === e.target.value) })}
                />
            </div>
        </div>

        {/* TIME SETTINGS */}
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable Time
                </div>
                <Switch
                    ref={timeEnableRef}
                    onChange={e => Storage.sync.set('time', { enable: e.target.checked })}
                />
            </div>
            <hr />
            <div className='items'>
                <div className='items-title'>
                    24-Hours
                </div>
                <Switch
                    ref={time24HoursRef}
                    onChange={e => Storage.sync.set('time', { is_24_hours: e.target.checked })}
                />
            </div>
            <div className={`dropshow ${showAMPM}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Show AM/PM
                    </div>
                    <Switch
                        ref={timeShowAMPMRef}
                        onChange={e => Storage.sync.set('time', { show_ampm: e.target.checked })}
                    />
                </div>
            </div>
            <hr />
            <div className='items'>
                <div className='items-title'>
                    Show Seconds
                </div>
                <Switch
                    ref={timeShowSecondsRef}
                    onChange={e => Storage.sync.set('time', { show_seconds: e.target.checked })}
                />
            </div>
        </div >
    </>
}

export default DateAndTime