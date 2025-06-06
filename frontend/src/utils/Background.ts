import { UNSPLASH_UTM } from "../constant/background";
import { LocalBackgroundType, UnsplashType } from "../types/Storage";

export const applyImageBackground = (
    data: UnsplashType | LocalBackgroundType,
    bgOverlay: React.RefObject<HTMLDivElement | null>,
    bg1Ref: React.RefObject<HTMLDivElement | null>,
    bg2Ref: React.RefObject<HTMLDivElement | null>,
    creditRef?: React.RefObject<HTMLDivElement | null>,
) => {
    const { width, height } = screen
    const dpr = window.devicePixelRatio
    const quality = Math.min(100 - dpr * 20, 75)
    const params = `&h=${height}&w=${width}&q=${quality}&dpr=1&auto=format&fit=crop`
    const url = data.url.startsWith("blob:") ? data.url : `${data.url + params}`

    const image = new Image();
    image.onload = () => {
        const loadBg = bg2Ref.current!.style.opacity === '1'
        bg2Ref.current!.style.opacity = loadBg ? '0' : '1'

        const changeBg = loadBg ? bg1Ref.current : bg2Ref.current;
        changeBg!.style.backgroundImage = `url(${url})`

        bgOverlay.current!.style.opacity = '1'

        // Set Credit Info
        if (creditRef) {
            const cuser = creditRef.current?.querySelector("#credit-user") as HTMLAnchorElement
            const cunspalsh = creditRef.current?.querySelector("#credit-unsplash") as HTMLAnchorElement

            if ("user" in data) {
                cuser!.textContent = `Photo by ${data.user?.name}`
                cuser!.href = `https://unsplash.com/@${data.user?.username}${UNSPLASH_UTM}`
                // credit of unsplash
                cunspalsh!.textContent = `on Unsplash`
                cunspalsh!.href = `https://unsplash.com/${UNSPLASH_UTM}`
            } else {
                cuser!.textContent = ""
                cuser!.href = ""
                cunspalsh!.textContent = ""
                cunspalsh!.href = ""
            }
        }

    }
    image.src = url;
    image.remove()
}