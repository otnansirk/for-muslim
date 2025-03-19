
import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverlay'
import PrayerTime from './component/pages/prayer-time/PrayerTime'
import Greating from './component/pages/greating/Greating'
import Weather from './component/pages/weather/Weather'
import Quote from './component/pages/quotes/Quote'
import Clock from './component/pages/clock/Clock'
import Notes from './component/pages/notes/Notes'
import { useState } from 'react'

import './app.css'

function App() {
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [timezone, setTimezone] = useState("")

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const timezone = new Intl.DateTimeFormat("en", { timeZoneName: "long" }).resolvedOptions().timeZone;

            setLatitude(position.coords.latitude.toString())
            setLongitude(position.coords.longitude.toString())
            setTimezone(timezone.toString())
        },
        (error) => {
            console.error("Error getting location:", error.message);
        }
    );

    return (
        <>
            <BackgroundOverlay />

            <div className='container'>
                <div className='header'>
                    <Clock />
                    <Weather lat={latitude} lng={longitude} />
                    <Greating />
                </div>
                <div className='content'>
                    <PrayerTime lat={latitude} lng={longitude} tz={timezone} />
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
