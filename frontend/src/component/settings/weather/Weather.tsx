import { useEffect, useRef, useState } from "react"
import { GEOLOCATION, UNIT } from "../../../constant/weather"
import { WeatherType } from "../../../types/Weather"
import Select from "../../form/select/Select"
import Switch from "../../form/switch/Switch"
import Storage from "../../../utils/Storage"
import Input from "../../form/input/Input"

const Weather = () => {
    const isEnableRef = useRef<HTMLInputElement>(null)
    const geolocationRef = useRef<HTMLSelectElement>(null)
    const unitRef = useRef<HTMLSelectElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const errorNotifyRef = useRef<HTMLDivElement>(null)

    const [showSettings, setShowSettings] = useState("hidden")
    const [showSettingsAddress, setShowSettingsAddress] = useState("hidden")

    useEffect(() => {
        Storage.sync.watch("weather", (item) => {
            const data = item as WeatherType
            isEnableRef.current!.checked = data?.enable ?? false
            geolocationRef.current!.value = data?.geolocation ?? ""
            unitRef.current!.value = data?.unit ?? ""
            addressRef.current!.value = data?.address ?? ""

            setShowSettings(data?.enable ? "" : "hidden")
            setShowSettingsAddress(data?.geolocation === "manual" ? "" : "hidden")

        })
    }, [])

    return <>
        <h2 className='settings-title'>
            WEATHER
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Enable
                </div>
                <Switch
                    isChecked={false}
                    ref={isEnableRef}
                    onChange={e => Storage.sync.set('weather', { enable: e.target.checked })}
                />
            </div>
            <div className={`dropshow ${showSettings}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Geolocation
                    </div>
                    <Select
                        items={GEOLOCATION}
                        ref={geolocationRef}
                        onSelect={e => {
                            if (e.target.value === 'precise') {
                                navigator.geolocation.getCurrentPosition(() => {
                                    Storage.sync.set('weather', { geolocation: e.target.value })
                                }, () => {
                                    errorNotifyRef.current!.textContent = 'Please allow your location'
                                })
                            } else {
                                Storage.sync.set('weather', { geolocation: e.target.value })
                                errorNotifyRef.current!.textContent = ''
                            }
                        }}
                    />
                </div>
                <span className="notify-error" ref={errorNotifyRef} />
                <div className={`dropshow ${showSettingsAddress}`}>
                    <hr />
                    <div className='items'>
                        <div className='items-title'>
                            Address
                        </div>
                        <Input
                            ref={addressRef}
                            placeholder={addressRef.current?.value ? addressRef.current.value : "Input address"}
                            onChange={e => Storage.sync.set('weather', { address: e.target.value })}
                        />
                    </div>
                </div>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Unit
                    </div>
                    <Select
                        items={UNIT}
                        ref={unitRef}
                        onSelect={e => Storage.sync.set('weather', { unit: e.target.value })}
                    />
                </div>
            </div>
        </div>
    </>
}

export default Weather