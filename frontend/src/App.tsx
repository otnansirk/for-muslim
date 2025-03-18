
import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverlay'
import PrayerTime from './component/pages/prayer-time/PrayerTime'
import Greating from './component/pages/greating/Greating'
import Weather from './component/pages/weather/Weather'
import Quote from './component/pages/quotes/Quote'
import Clock from './component/pages/clock/Clock'
import Notes from './component/pages/notes/Notes'

import './app.css'
import { useState } from 'react'

function App() {
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    navigator.geolocation.getCurrentPosition(
        (position) => {
            setLatitude(position.coords.latitude.toString())
            setLongitude(position.coords.longitude.toString())
        },
        (error) => {
            console.error("Error getting location:", error.message);
        }
    );



    return (
        <>
            {/* <SearchLocation open={open} setOpen={setOpen} /> */}

            <BackgroundOverlay />

            <div className='container'>
                <div className='header'>
                    {/* <Setting /> */}
                    <Clock />
                    <Weather lat={latitude} lng={longitude} />
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
