import { useEffect, useRef, useState } from "react"
import { DATE_FORMAT } from "../../../constant/date_and_time"
import SelectGroup from "../../form/select-group/SelectGroup"
import { DateType, TimeType } from "../../../types/Storage"
import { TimezoneType } from "../../../types/timezone"
import Switch from "../../form/switch/Switch"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Request from "../../../utils/Request"
import Range from "../../form/range/Range"
import { useTimeStore } from "../../../utils/Store"
import Icon from "../../Icon"
import { TIME_FONT_SIZE } from "../../../constant/settings"

const DateAndTime = () => {
    const dateEnableRef = useRef<HTMLInputElement>(null)
    const dateFormatRef = useRef<HTMLSelectElement>(null)

    const timeEnableRef = useRef<HTMLInputElement>(null)
    const time24HoursRef = useRef<HTMLInputElement>(null)
    const timeShowSecondsRef = useRef<HTMLInputElement>(null)
    const timeShowAMPMRef = useRef<HTMLInputElement>(null)
    const timeFontSizeRef = useRef<HTMLInputElement>(null)

    const [showAMPM, setShowAMPM] = useState("hidden")
    const [showTimeSettings, setShowTimeSettings] = useState("hidden")
    const [showDateSettings, setShowDateSettings] = useState("hidden")
    const [timezones, setTimezones] = useState<TimezoneType[]>([])
    const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>(undefined)


    const {
        fontSize,
        setFontSize
    } = useTimeStore()

    useEffect(() => {
        Storage.sync.watch("date", (item) => {
            const data = item as DateType
            dateEnableRef.current!.checked = data?.enable ?? false
            dateFormatRef.current!.value = data?.format?.value ?? ""

            setShowDateSettings(data?.enable ? "" : "hidden")
        })

        Storage.sync.get("time", (item) => {
            const data = item as TimeType
            timeEnableRef.current!.checked = data?.enable ?? false
            time24HoursRef.current!.checked = data?.hour12 ?? false
            timeShowSecondsRef.current!.checked = data?.show_seconds ?? false
            timeShowAMPMRef.current!.checked = data?.show_ampm ?? false
            timeFontSizeRef.current!.value = (data?.font_size ?? fontSize).toString()

            useTimeStore.setState(prev => ({ ...prev, fontSize: data.font_size }))

            setShowTimeSettings(data?.enable ? "" : "hidden")
            setShowAMPM(data?.hour12 ? "" : "hidden")
            setSelectedTimezone(data?.tz)
        })

        const fetchData = async () => {
            try {
                const response = await Request.get({
                    path: "/timezones"
                });

                const res = await response.json()
                const data = res.data as TimezoneType[]
                setTimezones(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <h2 className='settings-title'>
            DATE & TIME
        </h2>

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

            <div className={`dropshow ${showTimeSettings}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Font size
                    </div>
                    <div className="items-content">
                        <div className="range-wrapper">
                            {
                                fontSize != TIME_FONT_SIZE &&
                                <div className="reset-icon" onClick={() => setFontSize(TIME_FONT_SIZE)}>
                                    <Icon icon="back" className="icon-back" />
                                </div>
                            }
                            <Range
                                onChange={e => setFontSize(parseInt(e.target.value))}
                                ref={timeFontSizeRef}
                                min={10}
                                max={200}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        12-Hours
                    </div>
                    <Switch
                        ref={time24HoursRef}
                        onChange={e => Storage.sync.set('time', { hour12: e.target.checked })}
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
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Timezone
                    </div>
                    <SelectGroup
                        items={timezones}
                        onSelect={ev => Storage.sync.set('time', { tz: ev.target.value })}
                        value={selectedTimezone}
                    />
                </div>
            </div>
        </div >
        {/* DATE SETTINGS */}
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
            <div className={`dropshow ${showDateSettings}`}>
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
        </div>

    </>
}

export default DateAndTime