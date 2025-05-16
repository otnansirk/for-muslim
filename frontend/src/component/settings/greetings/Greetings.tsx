import { useEffect, useRef, useState } from "react"
import Storage from "../../../utils/Storage"
import Input from "../../form/input/Input"
import Switch from "../../form/switch/Switch"
import { GreetingType } from "../../../types/Storage"
import { useGreetingsStore } from "../../../utils/Store"
import Range from "../../form/range/Range"


const Greetings = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const textShadowRef = useRef<HTMLInputElement>(null)
    const fontSizeRef = useRef<HTMLInputElement>(null)

    const [showSettings, setShowSettings] = useState("hidden")

    const setShadow = useGreetingsStore(state => state.setTextShadow)
    const setFontSize = useGreetingsStore(state => state.setFontSize)

    const fontSize = useGreetingsStore(state => state.fontSize)
    const textShadow = useGreetingsStore(state => state.textShadow)


    useEffect(() => {

        Storage.sync.get("greeting", (item) => {
            const data = item as GreetingType
            isEnableRef.current!.checked = data?.enable ?? false
            nameRef.current!.value = data?.name ?? ""
            fontSizeRef.current!.value = data.font_size?.toString() ?? fontSize.toString()
            textShadowRef.current!.value = data.text_shadow?.toString() ?? textShadow.toString()

            setShowSettings(data?.enable ? "" : "hidden")
            useGreetingsStore.setState(prev => ({ ...prev, fontSize: data.font_size, textShadow: data.text_shadow }))
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Shadow
                    </div>
                    <Range
                        onChange={e => setShadow(parseInt(e.target.value))}
                        ref={textShadowRef}
                    />
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Font size
                    </div>
                    <Range
                        onChange={e => setFontSize(parseInt(e.target.value))}
                        min={45}
                        ref={fontSizeRef}
                    />
                </div>
            </div>
        </div>
    </>
}

export default Greetings