import { useEffect, useRef } from "react"
import { DATE_FORMAT } from "../../../constant/date_and_time"
import { DateType } from "../../../types/Storage"
import Switch from "../../form/switch/Switch"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"

const DateAndTime = () => {
    const dateEnableRef = useRef<HTMLInputElement>(null)
    const dateFormatRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {
        Storage.sync.watch("date", (item) => {
            const data = item as DateType
            dateEnableRef.current!.checked = data?.enable ?? false
            dateFormatRef.current!.value = data?.format ?? ""
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
                    isChecked={false}
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
                    onSelect={e => Storage.sync.set('date', { format: e.target.value })}
                />
            </div>
        </div>
    </>
}

export default DateAndTime