import { useEffect, useRef } from 'react';

import { BACKGROUND_SOURCE_LOCAL } from '../../../constant/background';
import { loadUnsplaceImage } from '../../../utils/BackgroundUnsplash';
import { loadLocalImage } from '../../../utils/BackgroundLocal';
import { useBackgroundStore } from '../../../utils/Store';
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
    const creditRef = useRef<HTMLDivElement>(null)

    const { blurIntensity, brightness } = useBackgroundStore()


    const loadBackground = async () => {
        const bg: BackgroundType | undefined = await Storage.sync.get("background")
        if (bg?.source === BACKGROUND_SOURCE_LOCAL) {
            await loadLocalImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef)
        } else {
            await loadUnsplaceImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef)
        }
    }


    useEffect(() => {
        (async () => {
            await loadBackground()
        })()


        Storage.local.watch<UnsplashCollectionChangeType>("onChangeUnsplashCollection", async (collect) => {
            if (collect) {
                delay(async () => {
                    await loadUnsplaceImage(bgOverlayRef, bg1Ref, bg2Ref, creditRef, collect?.type === "custom")
                    Storage.local.set("onChangeUnsplashCollection", false)
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
    }, [])

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--bg-blur', `${blurIntensity}px`)
    }, [blurIntensity])

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--bg-brightness', (brightness / 100).toString())
    }, [brightness])

    return (
        <div className='background'>
            <div ref={bgOverlayRef} className='background-overlay'>
                <div ref={bg1Ref} className='overlay' />
                <div ref={bg2Ref} className='overlay otnansirk' />
            </div>
            {
                <div className='background-credit' ref={creditRef}>
                    <a id='credit-user' />&nbsp;
                    <a id='credit-unsplash' />
                </div>
            }
        </div >
    )
}

export default BackgroundOverlay