import { useEffect, useRef } from 'react';

import { UNSPLASH_UTM } from '../../../constant/background';
import { loadUnsplaceImage } from '../../../utils/BackgroundUnsplash';
import Storage from '../../../utils/Storage';

import './style.css';

type UnsplashCollectionChangeType = {
    type?: string
    value?: string
}

const BackgroundOverlay = () => {

    const bgOverlayRef = useRef<HTMLDivElement>(null)
    const bg1Ref = useRef<HTMLDivElement>(null)
    const bg2Ref = useRef<HTMLDivElement>(null)
    const creditRef = useRef<HTMLAnchorElement>(null)

    Storage.local.watch<UnsplashCollectionChangeType>("onChangeUnsplashCollection", async (collect) => {
        if (collect) {
            setTimeout(async () => {
                const runAsync = async () => {
                    await loadUnsplaceImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef, collect?.type === "custom")
                    Storage.local.set("onChangeUnsplashCollection", false)
                }

                runAsync()
            }, 200)
        }
    })

    Storage.local.watch("onRefreshBackground", async (load) => {
        if (load) {
            await loadUnsplaceImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef)
            Storage.local.set("onRefreshBackground", false)
        }
    })

    useEffect(() => {
        loadUnsplaceImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef)
    }, [])

    return (
        <div className='background'>
            <div ref={bgOverlayRef} className={`background-overlay`}>
                <div ref={bg1Ref} className='overlay' />
                <div ref={bg2Ref} className='overlay otnansirk' />
            </div>
            {
                <div className={`background-info`}>
                    <a ref={creditRef} />&nbsp;
                    on <a href={`https://unsplash.com/${UNSPLASH_UTM}`}>Unsplash</a>
                </div>
            }
        </div >
    )
}

export default BackgroundOverlay