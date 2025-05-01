import { useEffect, useRef } from "react"
import { BACKGROUND_REFRESH_FREQUENCY, BACKGROUND_TYPES } from "../../../constant/background"
import { fetchDataUnsplash, refreshBackgroundHandler } from "../../../utils/Background"
import { BackgroundType, UnsplashType } from "../../../types/Storage"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Icon from "../../Icon"

import "./style.css"


const Background = () => {
    const isTypeRef = useRef<HTMLSelectElement>(null)
    const isRefreshFrequencyRef = useRef<HTMLSelectElement>(null)
    const isRefreshIconRef = useRef<SVGSVGElement>(null)
    let rotate = 0

    useEffect(() => {

        Storage.sync.get("background", async (item) => {
            const data = item as BackgroundType
            isRefreshFrequencyRef.current!.value = data?.frequency ?? "tab"
            isTypeRef.current!.value = data?.type ?? "unsplash"
        })

        Storage.local.get("unsplash", async (cache) => {
            const data = cache as UnsplashType[]
            if (!Array.isArray(data) || data.length <= 2) {
                await fetchDataUnsplash(data)
                Storage.sync.set("background", { frequency: "tab", type: "unsplash" })
                return
            }
        })

    }, [])


    return <div className="background-settings">
        <h2 className='settings-title'>
            BACKGROUND
        </h2>
        <div className='settings-items'>
            <div className='items'>
                <div className='items-title'>
                    Source
                </div>
                <Select
                    items={BACKGROUND_TYPES}
                    ref={isTypeRef}
                    onSelect={e => Storage.sync.set('background', { type: e.target.value })}
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
                            refreshBackgroundHandler()
                            isRefreshIconRef.current!.style.transform = `rotate(${rotate += 360}deg)`
                        }}
                    >
                        <Icon ref={isRefreshIconRef} icon="arrow-path" className="refresh-icon" />
                    </div>
                    <Select
                        items={BACKGROUND_REFRESH_FREQUENCY}
                        ref={isRefreshFrequencyRef}
                        onSelect={(e) => {
                            const data: BackgroundType = { frequency: e.target.value }
                            Storage.sync.set('background', data)
                        }}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default Background