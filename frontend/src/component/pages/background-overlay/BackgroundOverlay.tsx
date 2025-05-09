import { useEffect, useRef } from 'react';

import { loadUnsplaceImage } from '../../../utils/BackgroundUnsplash';
import { loadLocalImage } from '../../../utils/BackgroundLocal';
import { BACKGROUND_SOURCE_LOCAL, BACKGROUND_SOURCE_UNSPLASH, UNSPLASH_UTM } from '../../../constant/background';
import { BackgroundType } from '../../../types/Storage';
import { delay } from '../../../utils/Helpers';
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

    const loadBackground = async () => {
        const bg: BackgroundType | undefined = await Storage.sync.get("background")
        if (bg?.source === BACKGROUND_SOURCE_LOCAL) {
            await loadLocalImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef)
        }
        if (bg?.source === BACKGROUND_SOURCE_UNSPLASH) {
            await loadUnsplaceImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef)
        }
    }

    Storage.local.watch<UnsplashCollectionChangeType>("onChangeUnsplashCollection", async (collect) => {
        if (collect) {
            delay(async () => {
                const runAsync = async () => {
                    await loadUnsplaceImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef, collect?.type === "custom")
                    Storage.local.set("onChangeUnsplashCollection", false)
                }
                runAsync()
            })
        }
    })

    Storage.local.watch("onLoadBackground", async (onLoad: boolean) => {
        if (onLoad) {
            delay(async () => {
                await loadBackground()
                Storage.local.set("onLoadBackground", false)
            })
        }
    })

    Storage.local.watch("onLoadSelectedLocalBackground", async (selectedId: string) => {
        if (selectedId) {
            delay(async () => {
                await loadLocalImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef, selectedId)
                Storage.local.set("onLoadSelectedLocalBackground", "")
            })
        }
    })

    useEffect(() => {
        (async () => {
            await loadBackground()
        })()
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