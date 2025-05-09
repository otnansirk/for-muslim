import { BACKGROUND_SOURCE_LOCAL } from "../constant/background";
import { LocalBackgroundCollectionsType, LocalBackgroundType, LocalImagesType } from "../types/Storage";
import { applyImageBackground } from "./Background";
import { loadUnsplaceImage } from "./BackgroundUnsplash";
import { generateID } from "./Helpers";
import Storage from "./Storage";


export const uploadFiles = async (files: HTMLInputElement["files"]): Promise<LocalBackgroundCollectionsType[]> => {
    const data: LocalBackgroundCollectionsType[] = []
    const localImagesCache: LocalImagesType = await Storage.db.get("localImages")

    const ids: string[] = localImagesCache?.ids ? localImagesCache.ids : []

    if (files) {
        for (const item of files) {
            const ID = generateID(11)
            const file: LocalBackgroundCollectionsType = {
                background: item,
                thumbnail: await getThumbnail(item)
            }
            await Storage.db.set(ID, file)
            data.push(file)
            ids.push(ID)
        }
    }

    const localImages: LocalImagesType = {
        ids,
        selected: ids[0],
        time: Date.now()
    }

    await Storage.db.set("localImages", localImages)
    return data
}


export const loadLocalImage = async (
    bgOverlay: React.RefObject<HTMLDivElement | null>,
    bg1Ref: React.RefObject<HTMLDivElement | null>,
    bg2Ref: React.RefObject<HTMLDivElement | null>,
    creditRef: React.RefObject<HTMLAnchorElement | null>,
) => {

    Storage.local.set("unsplashEmageLoad", true)

    const localImages = await Storage.db.get("localImages") as LocalImagesType
    const currentIds = localImages.ids.length <= 1 ? localImages.ids : localImages.ids.filter(i => i != localImages.selected)
    const length = currentIds.length

    if (!length) {
        loadUnsplaceImage(
            bgOverlay,
            bg1Ref,
            bg2Ref,
            creditRef)
        return
    }

    const random = Math.floor(Math.random() * length)
    const selectedId = currentIds[random]
    const selectedImage: LocalBackgroundCollectionsType = await Storage.db.get(selectedId)

    if (selectedImage) {
        const url = URL.createObjectURL(selectedImage.background)
        const data: LocalBackgroundType = { url }

        applyImageBackground(
            data,
            bgOverlay,
            bg1Ref,
            bg2Ref,
            creditRef)

        await Storage.db.set("localImages", {
            ids: localImages.ids,
            selected: selectedId,
            time: Date.now()
        })

        Storage.sync.set("background", { source: BACKGROUND_SOURCE_LOCAL })
    }
}


export const deleteImage = async (id: string) => {
    await Storage.db.delete(id)
    const localImages = await Storage.db.get("localImages") as LocalImagesType

    if (localImages?.ids) {
        const newIds = localImages.ids.filter(imgId => imgId !== id)
        const newLocalImages: LocalImagesType = {
            ids: newIds,
            selected: localImages?.selected !== id ? localImages.selected : newIds[0],
            time: Date.now()
        }
        await Storage.db.set("localImages", newLocalImages)
    }
}

// Generate thumbnail image
export const getThumbnail = async (blob: Blob) => {
    const img = await createImageBitmap(blob);

    const height = 140 * window.devicePixelRatio;
    const scaleFactor = height / img.height;
    const width = img.width * scaleFactor;

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);

    return await canvas.convertToBlob({
        type: 'image/webp',
        quality: 0.8
    });
}