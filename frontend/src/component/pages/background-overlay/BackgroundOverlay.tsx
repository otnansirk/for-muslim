import { useEffect, useRef } from 'react';

import { UNSPLASH_UTM } from '../../../constant/background';
import { BackgroundType, UnsplashType } from '../../../types/Storage';
import Storage from '../../../utils/Storage';

import './style.css';

const BackgroundOverlay = () => {

    const bgRef = useRef<HTMLDivElement>(null)
    const bg1Ref = useRef<HTMLDivElement>(null)
    const bg2Ref = useRef<HTMLDivElement>(null)
    const bgArtistRef = useRef<HTMLAnchorElement>(null)
    const bgLoadingRef = useRef<boolean>(null)

    const refreshRef = (url: string) => {
        if (bgLoadingRef.current) return;
        const image = new Image();

        bgLoadingRef.current = true
        image.onload = () => {
            const loadBg = bg2Ref.current!.style.opacity === '1'
            bg2Ref.current!.style.opacity = loadBg ? '0' : '1'

            const changeBg = loadBg ? bg1Ref.current : bg2Ref.current;
            changeBg!.style.backgroundImage = `url(${url})`

            bgRef.current!.style.opacity = '1'
            bgLoadingRef.current = false
        }
        image.src = url;
        image.remove()
    }

    const credit = (name: string, username: string) => {
        bgArtistRef.current!.textContent = `Photo by ${name}`
        bgArtistRef.current!.href = `https://unsplash.com/@${username}${UNSPLASH_UTM}`
    }

    const setBackground = (bgInfo: UnsplashType) => {

        credit(bgInfo.user.name, bgInfo.user.username)

        const { width, height } = screen
        const dpr = window.devicePixelRatio
        const quality = Math.min(100 - dpr * 20, 75)

        const qparams = `&h=${height}&w=${width}&q=${quality}&dpr=1&auto=format&fit=crop`
        refreshRef(bgInfo.url + qparams)
    }

    useEffect(() => {
        Storage.local.watch("unsplash", (item) => {
            const unsplash = item as UnsplashType[]
            if (!Array.isArray(unsplash)) return;
            if (unsplash.length < 1) return;

            Storage.sync.get("background", item => {
                const bg = item as BackgroundType;
                const lastIndex = typeof bg?.index === 'number' ? bg.index : -1;

                let bgInfo = null
                if (bg?.frequency === "tab") {
                    const indx = [...Array(unsplash.length).keys()].filter(i => i !== lastIndex);
                    const random = Math.floor(Math.random() * indx.length);
                    const randomIndex = indx[random];

                    Storage.sync.set("background", { index: randomIndex ?? 0 });

                    bgInfo = unsplash[randomIndex];
                }
                if (bg?.frequency === "off") {
                    bgInfo = unsplash[lastIndex];
                    if (!bgInfo && unsplash.length > 0) {
                        bgInfo = unsplash[0];
                    }
                }

                if (!bgInfo) return;
                setBackground(bgInfo);
            });
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='background'>
            <div ref={bgRef} className={`background-overlay`}>
                <div ref={bg1Ref} className='overlay' />
                <div ref={bg2Ref} className='overlay otnansirk' />
            </div>
            {
                <div className={`background-info`}>
                    <a ref={bgArtistRef} />&nbsp;
                    on <a href={`https://unsplash.com/${UNSPLASH_UTM}`}>Unsplash</a>
                </div>
            }
        </div >
    )
}

export default BackgroundOverlay