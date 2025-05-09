import { useEffect, useRef, useState } from "react"
import { BACKGROUND_REFRESH_FREQUENCY, BACKGROUND_SOURCE, BACKGROUND_SOURCE_LOCAL, BACKGROUND_SOURCE_UNSPLASH } from "../../../constant/background"
import { BackgroundType } from "../../../types/Storage"
import { delay } from "../../../utils/Helpers"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Unsplash from "./Unsplash"
import Icon from "../../Icon"
import Local from "./Local"

import "./style.css"


const Background = () => {

    const sourceRef = useRef<HTMLSelectElement>(null)
    const frequencyRef = useRef<HTMLSelectElement>(null)
    const refreshIconRef = useRef<SVGSVGElement>(null)

    const [onRefreshBackground, setOnRefreshBackground] = useState<boolean>(false)
    const [source, setSource] = useState<string>("")

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
                setSource(bg?.source ?? BACKGROUND_SOURCE_UNSPLASH)
            }
        })

        Storage.local.watch("onLoadBackground", (load: boolean) => {
            delay(() => {
                setOnRefreshBackground(load)
            }, 500);
        })

    }, [])

    return <div className={`background-settings`}>
        <h2 className='settings-title'>
            BACKGROUND
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