import { useEffect, useState } from 'react'
import Storage, { ProfileProps } from './utils/Storage'

import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverlay'
import SearchLocation from './component/search-loaction/SearchLocation'
import PrayerTime from './component/pages/prayer-time/PrayerTime'
import Greating from './component/pages/greating/Greating'
import Setting from './component/pages/settings/Setting'
import Weather from './component/pages/weather/Weather'
import Quote from './component/pages/quotes/Quote'
import Clock from './component/pages/clock/Clock'
import Notes from './component/pages/notes/Notes'

import './app.css'


const countries = {
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania"
}

function App() {

    const [profile, setProfile] = useState<ProfileProps | undefined>({})
    useEffect(() => {
        const fetchProfile = (item: ProfileProps) => {
            const city = item?.address?.split(',')[0]?.trim()
            const countryCode = item?.address?.split(',')[1]?.trim() ?? "AD"
            const country = countries[countryCode]

            setProfile({ ...item, city, country });
        }

        (async () => {
            const item = await Storage.profile.get();
            fetchProfile(item as ProfileProps);
        })();
        // Storage.profile.listen(fetchProfile);

    }, [])

    const [open, setOpen] = useState(false)

    return (
        <>
            <SearchLocation open={open} setOpen={setOpen} />

            <BackgroundOverlay />

            <div className='container'>
                <div className='header'>
                    <Setting />
                    <Clock />
                    <Weather />
                    <Greating />
                </div>
                <div className='content'>
                    <PrayerTime />
                    <Notes />
                </div>
                <div className='footer'>
                    <Quote />
                </div>
            </div>

        </>
    )
}

export default App
