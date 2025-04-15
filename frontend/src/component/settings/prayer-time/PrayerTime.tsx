import { useEffect, useRef, useState } from "react"
import { GreetingType } from "../../../types/Storage"
import Switch from "../../form/switch/Switch"
import Storage from "../../../utils/Storage"

const Greetings = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const [showSettings, setShowSettings] = useState("hidden")

    useEffect(() => {
        Storage.sync.watch("prayer", (item) => {
            const data = item as GreetingType
            isEnableRef.current!.checked = data?.enable ?? false
            nameRef.current!.value = data?.name ?? ""

            setShowSettings(data?.enable ? "" : "hidden")
        })
    }, [])

    return <>
        <h2 className='settings-title'>
            PRAYER TIME
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    isChecked={false}
                    ref={isEnableRef}
                    onChange={e => Storage.sync.set('prayer', { enable: e.target.checked })}
                />
            </div>
            <div className={`dropshow ${showSettings}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Name
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Greetings