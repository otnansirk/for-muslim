import { BACKGROUND_MAX_FEATURED_INDEX } from "../constant/background";
import { BackgroundQueryParams } from "../types/bckground-overlay";
import { BackgroundType, UnsplashType } from "../types/Storage";
import Request from "./Request";
import Storage from "./Storage";

export const fetchDataUnsplash = async (queryParams?: BackgroundQueryParams) => {

    const response = await Request.get({
        path: "/unsplash/random",
        query: {
            count: BACKGROUND_MAX_FEATURED_INDEX.toString(),
            ...queryParams
        }
    });

    const res = await response.json()
    Storage.local.set("unsplash", res.data)
}

export const refreshBackgroundHandler = (params?: BackgroundQueryParams) => {
    Storage.sync.get("background", async (item) => {
        const data = item as BackgroundType
        if (data.type === "unsplash") {
            Storage.local.get("unsplash", async (item) => {
                const data = item as UnsplashType[]
                if (data.length) {
                    Storage.local.set("unsplash", data.slice(1));
                    return
                } else {
                    fetchDataUnsplash(params)
                }
            })
        }
    })
}