import { useEffect, useRef, useState } from "react"
import { BACKGROUND_COLLECTION, BACKGROUND_COLLECTIONS, BACKGROUND_REFRESH_FREQUENCY, BACKGROUND_TYPES } from "../../../constant/background"
import { BackgroundType } from "../../../types/Storage"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Input from "../../form/input/Input"
import Icon from "../../Icon"

import "./style.css"
import Loader from "../../loader/Loader"


const Background = () => {

    const typeRef = useRef<HTMLSelectElement>(null)
    const frequencyRef = useRef<HTMLSelectElement>(null)
    const refreshIconRef = useRef<SVGSVGElement>(null)
    const collectionTypeRef = useRef<HTMLSelectElement>(null)
    const collectionValueRef = useRef<HTMLInputElement>(null)
    const lastCollectionValueRef = useRef<string>("")

    const [collectionType, setCollectionType] = useState<string>()
    const [onRefreshBackground, setOnRefreshBackground] = useState<boolean>(false)
    const [onChangeUnsplashCollection, setOnChangeUnsplashCollection] = useState<boolean | undefined>(undefined)
    const [currentCollectionValue, setCurrentCollectionValue] = useState<string>("")

    const onCollectionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setCollectionType(value)
        if (value !== "custom") {
            setOnChangeUnsplashCollection(true)
            Storage.local.set("onChangeUnsplashCollection", { collection_type: value, collection_value: BACKGROUND_COLLECTION[value as string] })
            Storage.sync.set("background", { collection_type: value, collection_value: BACKGROUND_COLLECTION[value as string] })
        }
    }

    const onSaveCustomCollection = () => {
        if (onChangeUnsplashCollection) return
        setOnChangeUnsplashCollection(true)
        Storage.local.set("onChangeUnsplashCollection", { type: "custom", value: collectionValueRef.current?.value })
        Storage.sync.set("background", { collection_type: "custom", collection_value: collectionValueRef.current?.value })
    }

    useEffect(() => {
        Storage.sync.get("background", item => {
            const bg = item as BackgroundType
            if (bg) {
                typeRef.current!.value = bg.type as string
                frequencyRef.current!.value = bg.frequency as string
                collectionTypeRef.current!.value = bg.collection_type as string
                collectionValueRef.current!.placeholder = bg.collection_value as string
                lastCollectionValueRef.current = bg.collection_value as string

                setCollectionType(bg.collection_type as string)
                setCurrentCollectionValue(bg.collection_value as string)
            }
        })

        Storage.local.watch("onRefreshBackground", (load) => {
            setTimeout(() => {
                setOnRefreshBackground(load as boolean)
            }, 500);
        })

        Storage.local.watch("onChangeUnsplashCollection", (load) => {
            if (collectionValueRef.current?.value && load === false) {
                setTimeout(() => {
                    setOnChangeUnsplashCollection(false)
                    lastCollectionValueRef.current = collectionValueRef.current?.value as string
                }, 500);
            }
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
                    items={BACKGROUND_TYPES}
                    ref={typeRef}
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
                            setOnRefreshBackground(true)
                            if (!onRefreshBackground) {
                                Storage.local.set("onRefreshBackground", true)
                            }
                        }}
                    >
                        <Icon ref={refreshIconRef} icon="arrow-path" className={`refresh-icon ${onRefreshBackground && 'spin'}`} />
                    </div>
                    <Select
                        items={BACKGROUND_REFRESH_FREQUENCY}
                        ref={frequencyRef}
                        onSelect={() => {

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
                        ref={collectionTypeRef}
                        onSelect={onCollectionHandler}
                    />
                </div>
            </div>
            <div className={`dropshow ${collectionType !== "custom" && "hidden"}`}>
                <hr />
                <div className='items'>
                    <div className='items-title'>
                        Custom
                    </div>
                    <div className="items-content">
                        {
                            (currentCollectionValue && currentCollectionValue !== lastCollectionValueRef.current) &&
                            <div
                                className={`save-action`}
                                onClick={onSaveCustomCollection}
                            >
                                {
                                    onChangeUnsplashCollection
                                        ? <Loader />
                                        : <Icon icon="check" className="check-icon" />
                                }
                            </div>
                        }
                        <Input
                            ref={collectionValueRef}
                            onChange={e => setCurrentCollectionValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Background