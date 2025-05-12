import { useEffect, useRef, useState } from "react"
import { BACKGROUND_COLLECTION, BACKGROUND_COLLECTION_ISLAMIC, BACKGROUND_COLLECTIONS } from "../../../constant/background"
import { BackgroundType } from "../../../types/Storage"
import Select from "../../form/select/Select"
import Storage from "../../../utils/Storage"
import Input from "../../form/input/Input"
import Loader from "../../loader/Loader"
import Icon from "../../Icon"


const Unsplash = () => {

    const collectionTypeRef = useRef<HTMLSelectElement>(null)
    const collectionValueRef = useRef<HTMLInputElement>(null)
    const lastCollectionValueRef = useRef<string>("")
    const errorNotifyRef = useRef<HTMLSpanElement>(null)

    const [collectionType, setCollectionType] = useState<string>()
    const [onChangeUnsplashCollection, setOnChangeUnsplashCollection] = useState<boolean | undefined>(undefined)
    const [currentCollectionValue, setCurrentCollectionValue] = useState<string>("")

    const onCollectionHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setCollectionType(value)
        if (value !== "custom") {
            setOnChangeUnsplashCollection(true)
            Storage.local.set("onChangeUnsplashCollection", { collection_type: value, collection_value: BACKGROUND_COLLECTION[value as string] })
            Storage.sync.set("background", { collection_type: value, collection_value: BACKGROUND_COLLECTION[value as string] })
        } else {
            const bg = await Storage.sync.get("background")
            setOnChangeUnsplashCollection(false)
            collectionValueRef.current!.placeholder = bg?.collection_value ?? BACKGROUND_COLLECTION_ISLAMIC
        }
    }

    const onSaveCustomCollection = () => {
        if (onChangeUnsplashCollection) return
        setOnChangeUnsplashCollection(true)
        Storage.local.set("onChangeUnsplashCollection", { type: "custom", value: collectionValueRef.current?.value })
        Storage.sync.set("background", { collection_type: "custom", collection_value: collectionValueRef.current?.value })
        collectionValueRef.current!.placeholder = collectionValueRef.current?.value ?? ""
    }

    useEffect(() => {
        Storage.sync.get("background", item => {
            const bg = item as BackgroundType
            if (bg) {
                collectionTypeRef.current!.value = bg?.collection_type ?? "islamic"
                collectionValueRef.current!.placeholder = bg?.collection_value ?? BACKGROUND_COLLECTION_ISLAMIC
                lastCollectionValueRef.current = bg?.collection_value as string

                setCollectionType(bg?.collection_type as string)
                setCurrentCollectionValue(bg?.collection_value as string)
            }
        })

        Storage.local.watch("onChangeUnsplashCollection", (load) => {
            if (collectionValueRef.current?.value && load === false) {
                setTimeout(() => {
                    setOnChangeUnsplashCollection(false)
                    lastCollectionValueRef.current = collectionValueRef.current?.value as string
                }, 500);
            }
        })

        Storage.local.watch("error", (error) => {
            errorNotifyRef.current!.textContent = error as string
            errorNotifyRef.current!.style = `display: none`
            if (error) {
                errorNotifyRef.current!.style = `display: inline-block`
                setOnChangeUnsplashCollection(false)
            }
        })
    }, [])

    return <>

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
            <span className="notify-error" ref={errorNotifyRef} />
        </div>
    </>
}

export default Unsplash