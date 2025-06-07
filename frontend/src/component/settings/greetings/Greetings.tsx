import { useEffect, useRef, useState } from "react"
import { GREETING_FONT_SIZE, GREETING_TEXT_SHADOW } from "../../../constant/settings"
import { GREETING_TYPE_AUTO, GREETING_TYPES } from "../../../constant/greeting"
import { useGreetingsStore } from "../../../utils/Store"
import { GreetingType } from "../../../types/Storage"
import Switch from "../../form/switch/Switch"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Input from "../../form/input/Input"
import Range from "../../form/range/Range"
import Icon from "../../Icon"

import './style.css'


const Greetings = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const textShadowRef = useRef<HTMLInputElement>(null)
    const fontSizeRef = useRef<HTMLInputElement>(null)
    const greetingTypeRef = useRef<HTMLSelectElement>(null)

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
            textShadowRef.current!.value = data.text_shadow?.toString() ?? textShadow.toString()
            fontSizeRef.current!.value = data.font_size?.toString() ?? fontSize.toString()
            greetingTypeRef.current!.value = data.greeting?.toString() ?? GREETING_TYPE_AUTO

            setShowSettings(data?.enable ? "" : "hidden")
            useGreetingsStore.setState(prev => ({ ...prev, fontSize: data.font_size, textShadow: data.text_shadow }))
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        textShadowRef.current!.value = textShadow.toString()
    }, [textShadow])

    useEffect(() => {
        fontSizeRef.current!.value = fontSize.toString()
    }, [fontSize])

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
                        Greeting
                    </div>
                    <div className="items-content">
                        <Select
                            items={GREETING_TYPES}
                            ref={greetingTypeRef}
                            onSelect={e => Storage.sync.set('greeting', { greeting: e.target.value })}
                        />
                    </div>
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Name
                    </div>
                    <Input
                        onChange={e => Storage.sync.set('greeting', { name: e.target.value })}
                        placeholder="Name or what you feels"
                        ref={nameRef}
                        datalistID="fm_greatings-name"
                    />
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Shadow
                    </div>
                    <div className="range-wrapper">
                        {
                            textShadow != GREETING_TEXT_SHADOW &&
                            <div className="reset-icon" onClick={() => setShadow(GREETING_TEXT_SHADOW)}>
                                <Icon icon="back" className="icon-back" />
                            </div>
                        }
                        <Range
                            onChange={e => setShadow(parseInt(e.target.value))}
                            ref={textShadowRef}
                        />
                    </div>
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Font size
                    </div>
                    <div className="range-wrapper">
                        {
                            fontSize != GREETING_FONT_SIZE &&
                            <div className="reset-icon" onClick={() => setFontSize(GREETING_FONT_SIZE)}>
                                <Icon icon="back" className="icon-back" />
                            </div>
                        }
                        <Range
                            onChange={e => setFontSize(parseInt(e.target.value))}
                            min={45}
                            ref={fontSizeRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Greetings