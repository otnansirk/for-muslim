import { UNSPLASH_UTM } from "../constant/background";
import { LocalBackgroundType, UnsplashType } from "../types/Storage";
import Storage from "./Storage";

export const applyImageBackground = (
    data: UnsplashType | LocalBackgroundType,
    bgOverlay: React.RefObject<HTMLDivElement | null>,
    bg1Ref: React.RefObject<HTMLDivElement | null>,
    bg2Ref: React.RefObject<HTMLDivElement | null>,
    creditRef?: React.RefObject<HTMLAnchorElement | null>,
) => {
    const { width, height } = screen
    const dpr = window.devicePixelRatio
    const quality = Math.min(100 - dpr * 20, 75)

    const url = `${data.url}&h=${height}&w=${width}&q=${quality}&dpr=1&auto=format&fit=crop`

    const image = new Image();
    image.onload = () => {
        const loadBg = bg2Ref.current!.style.opacity === '1'
        bg2Ref.current!.style.opacity = loadBg ? '0' : '1'

        const changeBg = loadBg ? bg1Ref.current : bg2Ref.current;
        changeBg!.style.backgroundImage = `url(${url})`

        bgOverlay.current!.style.opacity = '1'

        // Set Credit Info
        if ("user" in data && creditRef) {
            creditRef.current!.textContent = `Photo by ${data.user?.name}`
            creditRef.current!.href = `https://unsplash.com/@${data.user?.username}${UNSPLASH_UTM}`
        }

        Storage.local.set("unsplashEmageLoad", false)
    }
    image.src = url;
    image.remove()
}