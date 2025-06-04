
import { useEffect, useRef, useState } from 'react'
import { getRemainingTime, getStatusAdhan, stopAdhan } from '../utils/Prayer'
import { firstUpper } from '../utils/Strings'
import { PrayerType } from '../types/Storage'
import Storage from '../utils/Storage'
import Icon from '../component/Icon'

import './popup.css'


function AppPopup() {
    const intervalRef = useRef<number | null>(null)
    const prayerRef = useRef<HTMLDivElement>(null)
    const [isAdhanPlaying, setIsAdhanPlaying] = useState<boolean>(false)
    const [nowPlaying, setNowlaying] = useState<string>("")
    const [remainingTime, setRemainingTime] = useState<{ hours: string, minutes: string, seconds: string } | null>({ hours: "0", minutes: "0", seconds: "0" })


    useEffect(() => {
        const updateAdhan = async (data: PrayerType, delay: number | undefined = undefined) => {
            const adhanStatus = await getStatusAdhan(undefined, delay)
            const isPlaying = adhanStatus.status === 'playing'
            setIsAdhanPlaying(isPlaying)
            prayerRef.current!.classList.remove('blink')

            if (isPlaying) {
                prayerRef.current!.classList.add('blink')
                setNowlaying(adhanStatus.type)
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setRemainingTime(null); // reset remaining time when playing
                return
            }

            setNowlaying(data.upcoming?.title as string)
            const updateRemaining = () => {
                const remaining = getRemainingTime(data.upcoming?.datetime as string, data.tz as string)
                setRemainingTime(remaining)
            }

            // clear previous interval if any
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            updateRemaining()
            intervalRef.current = window.setInterval(updateRemaining, 1000)
        }

        Storage.sync.get('prayer', item => {
            const data = item as PrayerType
            updateAdhan(data)
        })

        Storage.sync.watch('prayer', item => {
            const data = item as PrayerType
            setRemainingTime({ hours: "00", minutes: "00", seconds: "00" }); // reset remaining time when playing
            updateAdhan(data, 300)
        })

        chrome.runtime.onMessage.addListener(item => {
            const to = item?.to
            if (to !== 'ADHAN') return

            Storage.sync.get('prayer', item => {
                const data = item as PrayerType
                updateAdhan(data)
            })
        })

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

    }, [isAdhanPlaying]);

    return (
        <>{
            <div className='notify' >
                <div ref={prayerRef} className='prayer'>
                    <h2>{firstUpper(nowPlaying)}</h2>
                    <p>{isAdhanPlaying ? "It's time" : 'Remaining'}</p>
                </div>
                {
                    isAdhanPlaying ? (
                        <div className='control'>
                            <button
                                className='control-icon'
                                title='STOP'
                                onClick={() => {
                                    stopAdhan()
                                    setIsAdhanPlaying(false)
                                }}>
                                <Icon icon='stop' />
                            </button>
                        </div>
                    ) : (
                        <span className='remaining'>
                            {remainingTime?.hours}:{remainingTime?.minutes}:{remainingTime?.seconds}
                        </span>
                    )
                }
            </div>
        }
        </>
    )
}

export default AppPopup
