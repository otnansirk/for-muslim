import { useEffect, useState } from 'react'
import SearchLocation from './component/search-loaction/SearchLocation'
import Storage, { ProfileProps } from './utils/Storage'
import Icon from './component/Icon'
import Each from './component/Each'
import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverflay'
import './app.css'
import Clock from './component/pages/clock/Clock'
import Weather from './component/pages/weather/weather'

const countries = {
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania"
}

const calculateMethod = [
    {
        "id": 1,
        "name": "University of Islamic Sciences, Karachi"
    }
]

const prayTime = [
    {
        id: "imsak",
        icon: "imsak",
        title: "Imsak",
        time: "04:30 am",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-fajr",
        icon: "sholat-fajr",
        title: "Fajr",
        time: "04:30 am",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-dhuhr",
        icon: "sholat-dhuhr",
        title: "Dhuhr",
        time: "04:30 am",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-asr",
        icon: "sholat-asr",
        title: "Asr",
        time: "04:30 am",
        notify: "off",
        upcoming: false
    },
    {
        id: "sholat-maghrib",
        icon: "sholat-maghrib",
        title: "Maghrib",
        time: "04:30 am",
        notify: "off",
        upcoming: true
    },
    {
        id: "sholat-isha",
        icon: "sholat-isha",
        title: "Isha",
        time: "04:30 am",
        notify: "on",
        upcoming: false
    },
]

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
                    <Clock />
                    <Weather />
                </div>
                <div className='content'></div>
                <div className='footer'></div>
            </div>

        </>
    )
}

export default App
