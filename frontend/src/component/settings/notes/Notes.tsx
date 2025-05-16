import { useEffect, useRef } from "react"
import { GreetingType } from "../../../types/Storage"
import Switch from "../../form/switch/Switch"
import Storage from "../../../utils/Storage"


const Notes = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)

    useEffect(() => {

        Storage.sync.get("greeting", (item) => {
            const data = item as GreetingType
            isEnableRef.current!.checked = data?.enable ?? false
        })

    }, [])

    return <>
        <h2 className='settings-title'>
            NOTES
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    isChecked={false}
                    ref={isEnableRef}
                    onChange={e => Storage.sync.set('notes', { enable: e.target.checked })}
                />
            </div>
        </div>
    </>
}

export default Notes