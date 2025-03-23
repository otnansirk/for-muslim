
import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverlay'
import PrayerTime from './component/pages/prayer-time/PrayerTime'
import Greating from './component/pages/greating/Greating'
import Weather from './component/pages/weather/Weather'
// import Quote from './component/pages/quotes/Quote'
import Notes from './component/pages/notes/Notes'
import Clock from './component/pages/clock/Clock'
import { LocationType } from './types/Storage'
import { useEffect, useState } from 'react'
import Storage from './utils/Storage'

import './app.css'


function App() {
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [timezone, setTimezone] = useState("")

    useEffect(() => {
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const timezone = new Intl.DateTimeFormat("en", { timeZoneName: "long" }).resolvedOptions().timeZone;
                    setLatitude(position.coords.latitude.toString())
                    setLongitude(position.coords.longitude.toString())
                    setTimezone(timezone.toString())
                    Storage.sync.set('location', {
                        timezone,
                        lat: position.coords.latitude.toString(),
                        lng: position.coords.longitude.toString()
                    })
                },
                (error) => {
                    console.log("Error getting location:");

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
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [])

    return (
        <>
            <BackgroundOverlay />
            <div className='container'>
                <div className='header'>
                    <Clock />
                    {
                        <Weather lat={latitude} lng={longitude} />
                    }
                    <Greating />
                </div>
                <div className='content'>
                    {<PrayerTime lat={latitude} lng={longitude} tz={timezone} />}
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
