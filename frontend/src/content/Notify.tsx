import { useState } from 'react';
import Icon from '../component/Icon';
import { IMSAK } from '../constant/prayer';

const Notify = () => {
    const [active, setActive] = useState<string>("")
    const [prayerFor, setPrayerFor] = useState<string>("")
    const onclose = () => setActive("")

    chrome.runtime.onMessage.addListener((message, _, sendRespons) => {
        setActive("active")
        setPrayerFor(message)
        sendRespons({ status: "ok" })
    })

    return (
        <div className={`for-muslim__notify ${active}`} onClick={onclose}>
            <div className='content'>
                <Icon icon="notify-on" className='bell' />
                It's time for {prayerFor !== IMSAK ? 'prayer' : ''} <strong>{prayerFor}!</strong>
            </div>
        </div>
    )
}

export default Notify