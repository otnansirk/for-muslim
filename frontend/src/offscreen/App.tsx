
import { useEffect, useRef } from 'react'
import { FAJR, IMSAK, PRAYER_NAMES } from '../constant/prayer';
import { listenAdhan } from '../utils/Prayer';


function AppOffscreen() {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const adhanTypeRef = useRef<typeof PRAYER_NAMES[number]>("")

    useEffect(() => {
        chrome.runtime.onMessage.addListener((item, _, sendResponse) => {
            const to = item?.to

            // HANDSHAKE HANDLER
            if (to === 'HANDSHAKE') {
                if (item.data === 'ping') {
                    sendResponse({ ready: true });
                    return true;
                }
            }

            // ADHAN HANDLER
            if (to === 'ADHAN') {
                const isPlaying = !audioRef.current!.paused && !audioRef.current!.ended && audioRef.current!.currentTime > 0
                const control = item?.data?.control

                if (control === 'play') {
                    const adhanType = item?.data?.type
                    adhanTypeRef.current = adhanType
                    if (isPlaying) {
                        audioRef.current!.pause()
                        audioRef.current!.currentTime = 0
                    }

                    let url = `assets/mp3/adhan-yusuf-maati.mp3`
                    if (adhanType === FAJR) {
                        url = `assets/mp3/adhan-fajr.mp3`
                    }
                    if (adhanType === IMSAK) {
                        url = `assets/mp3/imsak.mp3`
                    }

                    audioRef.current!.src = chrome.runtime.getURL(url)
                    audioRef.current!.play()
                    listenAdhan("playing", adhanTypeRef.current as typeof PRAYER_NAMES[number])
                }

                if (control === 'stop') {
                    audioRef.current!.pause()
                    audioRef.current!.currentTime = 0
                    listenAdhan("stoped", adhanTypeRef.current as typeof PRAYER_NAMES[number])
                }

                if (control === 'status') {
                    sendResponse({
                        status: isPlaying ? 'playing' : 'stoped',
                        type: adhanTypeRef.current
                    })
                }

                audioRef.current?.addEventListener('ended', () => {
                    listenAdhan("stoped", adhanTypeRef.current as typeof PRAYER_NAMES[number])
                    chrome.offscreen.closeDocument()
                })
            }
        })

    }, [])

    return (<audio ref={audioRef} />)
}

export default AppOffscreen
