import { useEffect, useRef, useState } from "react"
import Storage from "../../../utils/Storage"
import Input from "../../form/input/Input"
import Switch from "../../form/switch/Switch"
import { GreatingType } from "../../../types/Storage"

const Greatings = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const [showSettings, setShowSettings] = useState("hidden")

    useEffect(() => {
        Storage.sync.watch("greating", (item) => {
            const data = item as GreatingType
            isEnableRef.current!.checked = data?.enable ?? false
            nameRef.current!.value = data?.name ?? ""

            setShowSettings(data?.enable ? "" : "hidden")
        })
    }, [])

    return <>
        <h2 className='settings-title'>
            GREATINGS
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    isChecked={false}
                    ref={isEnableRef}
                    onChange={e => Storage.sync.set('greating', { enable: e.target.checked })}
                />
            </div>
            <div className={`dropshow ${showSettings}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Name
                    </div>
                    <Input
                        onChange={e => Storage.sync.set('greating', { name: e.target.value })}
                        placeholder="Name"
                        ref={nameRef}
                    />
                </div>
            </div>
        </div>
    </>
}

export default Greatings