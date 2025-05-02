import { BACKGROUND_COLLECTION_ISLAMIC, BACKGROUND_MAX_FEATURED_INDEX } from "../constant/background";
import { BackgroundQueryParams } from "../types/bckground-overlay";
import { BackgroundType, UnsplashType } from "../types/Storage";
import Request from "./Request";
import Storage from "./Storage";

export const fetchDataUnsplash = async (data: UnsplashType[], queryParams?: BackgroundQueryParams) => {

    const response = await Request.get({
        path: "/unsplash/random",
        query: {
            collections: BACKGROUND_COLLECTION_ISLAMIC,
            count: BACKGROUND_MAX_FEATURED_INDEX.toString(),
            ...queryParams
        }
    });

    const res = await response.json()
    Storage.local.set("unsplash", [...data, ...res.data])
}

export const refreshBackgroundHandler = async (params?: BackgroundQueryParams) => {
    Storage.sync.get("background", async (item) => {
        const bg = item as BackgroundType
        if (bg.type === "unsplash") {
            Storage.local.get("unsplash", async (item) => {
                const data = item as UnsplashType[]
                if (data.length > 2) {
                    Storage.local.set("unsplash", data.filter((_, key) => key !== bg.index));
                    return
                } else {
                    await fetchDataUnsplash(data, { collections: bg.collections, ...params })
                }
            })
        }
    })
}