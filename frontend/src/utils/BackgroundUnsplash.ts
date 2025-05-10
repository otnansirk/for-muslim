import { BACKGROUND_COLLECTION_ISLAMIC, BACKGROUND_MAX_FEATURED_INDEX, BACKGROUND_SOURCE_UNSPLASH } from "../constant/background";
import { BackgroundType, UnsplashCollectionsType, UnsplashType } from "../types/Storage";
import { applyImageBackground } from "./Background";
import Request from "./Request";
import Storage from "./Storage";


export const initUnsplash = async (collection_value: string = BACKGROUND_COLLECTION_ISLAMIC): Promise<UnsplashType[] | undefined> => {
    const query = {
        collections: collection_value,
        count: BACKGROUND_MAX_FEATURED_INDEX.toString(),
    }
    try {
        const response = await Request.get({
            path: "/unsplash/random",
            query
        });

        const res = await response.json()
        if (response.status !== 200) {
            console.error("Error fetching data from Unsplash:", res)
            return
        }
        if (res.data.length < 1) {
            console.error("No data found in Unsplash response:", res)
            return
        }

        imagePreload(res.data[0].url)
        const result = res.data as UnsplashType[]
        return result

    } catch (error) {
        console.error("Fetch failed /unsplash/random:", error)
        return
    }
}

export const cacheUnsplash = async (unsplashCache: UnsplashCollectionsType, backgroundSync: BackgroundType, reset: boolean = false): Promise<UnsplashType | undefined> => {

    const collectType = backgroundSync?.collection_type ?? "islamic"
    const collectValue = backgroundSync?.collection_value ?? BACKGROUND_COLLECTION_ISLAMIC

    // Init unsplash cache if not exist
    if (!unsplashCache?.[collectType as keyof UnsplashCollectionsType]) {
        unsplashCache = { ...unsplashCache, [collectType]: [] }
    }

    let currentCache = reset ? [] : (unsplashCache?.[collectType as keyof UnsplashCollectionsType] ?? []) as UnsplashType[]

    currentCache.shift()

    if (currentCache === undefined || currentCache.length <= 2) {
        const photos = await initUnsplash(collectValue)
        currentCache = [...currentCache ?? [], ...photos ?? []]
    }

    if (currentCache) {

        unsplashCache[collectType as keyof UnsplashCollectionsType] = currentCache
        Storage.local.set(`unsplash`, unsplashCache)

        imagePreload(currentCache[1].url)
        return currentCache[0]
    }
}

export const loadUnsplaceImage = async (
    bgOverlay: React.RefObject<HTMLDivElement | null>,
    bg1Ref: React.RefObject<HTMLDivElement | null>,
    bg2Ref: React.RefObject<HTMLDivElement | null>,
    creditRef: React.RefObject<HTMLAnchorElement | null>,
    reset: boolean = false
) => {

    const background = await Storage.sync.get("background") as BackgroundType
    const unsplash = await Storage.local.get("unsplash") as UnsplashCollectionsType
    const cache: UnsplashType | undefined = await cacheUnsplash(unsplash, background, reset)
    if (!cache) {
        console.warn("Can't load unplash cache");
        return
    }

    applyImageBackground(
        cache,
        bgOverlay,
        bg1Ref,
        bg2Ref,
        creditRef)

    Storage.sync.set("background", { source: BACKGROUND_SOURCE_UNSPLASH })
}

// Preload image
export const imagePreload = async (url: string) => {
    try {
        const img = new Image()

        const { width, height } = screen
        const dpr = window.devicePixelRatio
        const quality = Math.min(100 - dpr * 20, 75)

        const qparams = `&h=${height}&w=${width}&q=${quality}&dpr=1&auto=format&fit=crop`
        img.src = url + qparams
        await img.decode()

        img.remove()
    } catch (_error) {
        console.error("Error preloading image:", url)
        console.error("Error image decode:", _error)
    }
}