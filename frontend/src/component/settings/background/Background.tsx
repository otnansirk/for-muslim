import { useEffect, useRef, useState } from "react"
import { BACKGROUND_COLLECTION_ISLAMIC, BACKGROUND_COLLECTIONS, BACKGROUND_REFRESH_FREQUENCY, BACKGROUND_TYPES } from "../../../constant/background"
import { fetchDataUnsplash, refreshBackgroundHandler } from "../../../utils/Background"
import { BackgroundType, UnsplashType } from "../../../types/Storage"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Icon from "../../Icon"

import "./style.css"
import Loader from "../../loader/Loader"


const Background = () => {
    const rotateRef = useRef<number>(0)

    const isTypeRef = useRef<HTMLSelectElement>(null)
    const isRefreshFrequencyRef = useRef<HTMLSelectElement>(null)
    const isRefreshIconRef = useRef<SVGSVGElement>(null)
    const collectionsRef = useRef<HTMLSelectElement>(null)

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        Storage.sync.get("background", async (item) => {
            const bg = item as BackgroundType
            isRefreshFrequencyRef.current!.value = bg?.frequency ?? "tab"
            isTypeRef.current!.value = bg?.type ?? "unsplash"
            collectionsRef.current!.value = bg?.collections ?? BACKGROUND_COLLECTION_ISLAMIC

            Storage.local.get("unsplash", async (cache) => {
                const data = cache as UnsplashType[]
                if (!Array.isArray(data) || data.length <= 2) {
                    await fetchDataUnsplash(data, { collections: bg.collections })
                    Storage.sync.set("background", { frequency: "tab", type: "unsplash" })
                    return
                }
            })
        })

    }, [])


    return <div className={`background-settings ${loading && 'loading'}`}>
        <h2 className='settings-title'>
            {loading && <Loader />} BACKGROUND
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
                        onClick={async () => {
                            isRefreshIconRef.current!.style.transform = `rotate(${rotateRef.current += 360}deg)`
                            await refreshBackgroundHandler()
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
            <hr />
            <div className='items'>
                <div className='items-title'>
                    Collections
                </div>
                <div className="items-content">
                    <Select
                        items={BACKGROUND_COLLECTIONS}
                        ref={collectionsRef}
                        onSelect={async (e) => {
                            setLoading(true)
                            Storage.sync.set('background', { collections: e.target.value })
                            await fetchDataUnsplash([], { collections: e.target.value })
                            setLoading(false)
                        }}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default Background