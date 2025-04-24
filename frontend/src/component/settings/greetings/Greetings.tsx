import { useEffect, useRef, useState } from "react"
import Storage from "../../../utils/Storage"
import Input from "../../form/input/Input"
import Switch from "../../form/switch/Switch"
import { GreetingType } from "../../../types/Storage"

const Greetings = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const [showSettings, setShowSettings] = useState("hidden")

    useEffect(() => {
        Storage.sync.watch("greeting", (item) => {
            const data = item as GreetingType
            isEnableRef.current!.checked = data?.enable ?? false
            nameRef.current!.value = data?.name ?? ""

            setShowSettings(data?.enable ? "" : "hidden")
        })
    }, [])

    return <>
        <h2 className='settings-title'>
            GREETINGS
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    isChecked={false}
                    ref={isEnableRef}
                    onChange={e => Storage.sync.set('greeting', { enable: e.target.checked })}
                />
            </div>
            <div className={`dropshow ${showSettings}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Name
                    </div>
                    <Input
                        onChange={e => Storage.sync.set('greeting', { name: e.target.value })}
                        placeholder="Name"
                        ref={nameRef}
                        datalistID="fm_greatings-name"
                    />
                </div>
            </div>
        </div>
    </>
}

export default Greetings