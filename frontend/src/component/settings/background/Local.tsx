
import { useEffect, useRef, useState } from "react"
import { LocalBackgroundCollectionsType, LocalImagesType } from "../../../types/Storage"
import { deleteImage, uploadFiles } from "../../../utils/BackgroundLocal"
import { BACKGROUND_SOURCE_LOCAL } from "../../../constant/background"
import Storage from "../../../utils/Storage"
import Loader from "../../loader/Loader"
import Each from "../../Each"

import "./style.css"


type ThumbnailType = {
    key: string,
    value: string
}

const Local = () => {
    const uploadImageRef = useRef<HTMLInputElement>(null)

    const [thumbnails, setThumbnails] = useState<ThumbnailType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onRemoveHandler = (id: string) => {
        deleteImage(id)
        setThumbnails(state => state.filter(item => item.key !== id))
    }

    const onUploadHandler = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files: HTMLInputElement["files"] = ev.target.files
        if (loading) return

        setLoading(true)
        await uploadFiles(files)
        await loadThumbnails()
        Storage.sync.set("background", { source: BACKGROUND_SOURCE_LOCAL })
        setLoading(false)
    }

    const loadThumbnails = async () => {
        const localImages = await Storage.db.get("localImages") as LocalImagesType
        const thumbnailsFormated: ThumbnailType[] = []
        const ids = localImages?.ids
        if (!ids) return

        for (const id of localImages.ids) {
            const thumbnail = await Storage.db.get(id) as LocalBackgroundCollectionsType
            thumbnailsFormated.push({ key: id, value: URL.createObjectURL(thumbnail.thumbnail) })
        }
        setThumbnails(thumbnailsFormated)
    }

    useEffect(() => {
        loadThumbnails()
    }, [])


    return <>
        <div className='items'>
            <div className='items-title'>
                Collections {loading && <Loader />}
            </div>
            <div className="items-content">
                <label className="file-upload">
                    <span>Select Images</span>
                    <input type="file" multiple accept="image/*" ref={uploadImageRef} onChange={onUploadHandler} />
                </label>
            </div>
        </div>
        <div className="thumbnails">
            {
                <Each
                    data={thumbnails}
                    render={(thumbnail, key) => (
                        <button className="thumbnail" key={key} id={thumbnail.key}>
                            <img src={thumbnail.value} />
                            <span className="remove-button" onClick={() => onRemoveHandler(thumbnail.key)}>✕</span>
                        </button>

                    )}
                />
            }
        </div>
    </>
}

export default Local