import { useEffect, useRef } from "react"
import { BACKGROUND_MAX_FEATURED_INDEX, BACKGROUND_REFRESH_FREQUENCY, BACKGROUND_TYPES } from "../../../constant/background"
import { BackgroundQueryParams } from "../../../types/bckground-overlay"
import { BackgroundType } from "../../../types/Storage"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Request from "../../../utils/Request"
import Icon from "../../Icon"

import "./style.css"

const Background = () => {
    const isTypeRef = useRef<HTMLSelectElement>(null)
    const isRefreshFrequencyRef = useRef<HTMLSelectElement>(null)
    const isRefreshIconRef = useRef<SVGSVGElement>(null)
    let rotate = 0

    const fetchDataUnsplash = async (queryParams?: BackgroundQueryParams) => {
        Storage.sync.get("background", async (item) => {
            const data = item as BackgroundType

            isRefreshFrequencyRef.current!.value = data.frequency ?? "tab"


            let idx = data?.featured_index ?? -1;

            if (idx >= 0 && idx <= BACKGROUND_MAX_FEATURED_INDEX) {
                Storage.sync.set("background", { featured_index: ++idx })
                return
            }

            const response = await Request.get({
                path: "/unsplash/random",
                query: {
                    count: "10",
                    ...queryParams
                }
            });

            const res = await response.json()
            Storage.local.set("unsplash", res.data)
            Storage.sync.set("background", { featured_index: 0 })
        })
    }

    const frequencyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        isRefreshFrequencyRef.current!.value = e.target.value
        Storage.sync.set('background', { frequency: e.target.value })
    }

    const refreshHandler = () => {
        fetchDataUnsplash()
        isRefreshIconRef.current!.style.transform = `rotate(${rotate += 360}deg)`
    }

    useEffect(() => {
        fetchDataUnsplash()
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
                        onClick={refreshHandler}
                    >
                        <Icon ref={isRefreshIconRef} icon="arrow-path" className="refresh-icon" />
                    </div>
                    <Select
                        items={BACKGROUND_REFRESH_FREQUENCY}
                        ref={isRefreshFrequencyRef}
                        onSelect={frequencyHandler}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default Background