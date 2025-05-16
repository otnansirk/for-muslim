import { useEffect, useRef, useState } from "react"
import { BACKGROUND_REFRESH_FREQUENCY, BACKGROUND_SOURCE, BACKGROUND_SOURCE_LOCAL, BACKGROUND_SOURCE_UNSPLASH } from "../../../constant/background"
import { useBackgroundStore } from "../../../utils/Store"
import { BackgroundType } from "../../../types/Storage"
import { delay } from "../../../utils/Helpers"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Range from "../../form/range/Range"
import Loader from "../../loader/Loader"
import Unsplash from "./Unsplash"
import Icon from "../../Icon"
import Local from "./Local"

import "./style.css"


const Background = () => {

    const sourceRef = useRef<HTMLSelectElement>(null)
    const frequencyRef = useRef<HTMLSelectElement>(null)
    const refreshIconRef = useRef<SVGSVGElement>(null)
    const blurIntensityRef = useRef<HTMLInputElement>(null)
    const brightnessRef = useRef<HTMLInputElement>(null)

    const [onRefreshBackground, setOnRefreshBackground] = useState<boolean>(false)
    const [source, setSource] = useState<string>("")
    const [backgroundLoading, setBackgroundLoading] = useState<boolean>(false)

    const {
        blurIntensity,
        brightness,

        setBlurIntensity,
        setBrightness
    } = useBackgroundStore()


    const onChangeSourceHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const value = ev.target.value
        setSource(value)
        Storage.sync.set('background', { source: value })
        Storage.local.set("onLoadBackground", true)
    }

    useEffect(() => {
        Storage.sync.get("background", item => {
            const bg = item as BackgroundType
            if (bg) {
                sourceRef.current!.value = bg?.source ?? BACKGROUND_SOURCE_UNSPLASH
                blurIntensityRef.current!.value = (bg?.blur_intensity ?? blurIntensity).toString()
                brightnessRef.current!.value = (bg?.brightness ?? brightness).toString()
                setSource(bg?.source ?? BACKGROUND_SOURCE_UNSPLASH)
                useBackgroundStore.setState(prev => ({ ...prev, blurIntensity: bg.blur_intensity, brightness: bg.brightness }))
            }
        })

        Storage.local.watch("onLoadBackground", (load: boolean) => {
            delay(() => {
                setOnRefreshBackground(load)
            }, 500);
        })

        Storage.local.watch("backgroundLoading", (loading: boolean) => {
            setBackgroundLoading(loading)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className={`background-settings ${backgroundLoading && 'loading'}`}>
        <h2 className='settings-title'>
            {backgroundLoading && <Loader />} BACKGROUND
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Source
                </div>
                <Select
                    items={BACKGROUND_SOURCE}
                    ref={sourceRef}
                    onSelect={onChangeSourceHandler}
                />
            </div>
            <hr />
            <div className='items'>
                <div className='items-title'>
                    Refresh
                </div>
                <div className="items-content">
                    <div
                        className={`save-action`}
                        onClick={() => {
                            setOnRefreshBackground(true)
                            if (!onRefreshBackground) Storage.local.set("onLoadBackground", true)
                        }}
                    >
                        <Icon ref={refreshIconRef} icon="arrow-path" className={`refresh-icon ${onRefreshBackground && 'spin'}`} />
                    </div>
                    <Select
                        items={BACKGROUND_REFRESH_FREQUENCY}
                        ref={frequencyRef}
                        onSelect={() => { }}
                    />
                </div>
            </div>
            <hr />
            <div className='items'>
                <div className='items-title'>
                    Blur intensity
                </div>
                <div className="items-content">
                    <Range
                        onChange={e => setBlurIntensity(parseInt(e.target.value))}
                        ref={blurIntensityRef}
                    />
                </div>
            </div>
            <hr />
            <div className='items'>
                <div className='items-title'>
                    Brightness
                </div>
                <div className="items-content">
                    <Range
                        onChange={e => setBrightness(parseInt(e.target.value))}
                        ref={brightnessRef}
                        min={10}
                        max={200}
                    />
                </div>
            </div>
            <div className={`dropshow ww ${source !== BACKGROUND_SOURCE_UNSPLASH && "hidden"}`}>
                <hr />
                <Unsplash />
            </div>
            <div className={`dropshow ww ${source !== BACKGROUND_SOURCE_LOCAL && "hidden"}`}>
                <hr />
                <Local />
            </div>
        </div>
    </div>
}

export default Background