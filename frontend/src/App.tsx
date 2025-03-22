
import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverlay'
import PrayerTime from './component/pages/prayer-time/PrayerTime'
import Greating from './component/pages/greating/Greating'
import Weather from './component/pages/weather/Weather'
// import Quote from './component/pages/quotes/Quote'
import Clock from './component/pages/clock/Clock'
import Notes from './component/pages/notes/Notes'
import { LocationType } from './types/Storage'
import Storage from './utils/Storage'
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

            Storage.sync.get("location", (data) => {
                const position = data as LocationType
                if (position.lat && position.lng) {
                    setLatitude(position.lat)
                    setLongitude(position.lng)
                }
            })
            console.error("Error getting location:", error.message);
        }
    );

    return (
        <>
            <BackgroundOverlay />
            <div className='container'>
                <div className='header'>
                    <Clock />
                    {
                        (latitude && longitude) && <Weather lat={latitude} lng={longitude} />
                    }
                    <Greating />
                </div>
                <div className='content'>
                    {(latitude && longitude) && <PrayerTime lat={latitude} lng={longitude} tz={timezone} />}
                    <Notes />
                </div>
                {/* <div className='footer'>
                    <Quote />
                </div> */}
            </div>

        </>
    )
}

export default App
