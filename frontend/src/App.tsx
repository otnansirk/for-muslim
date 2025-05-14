
import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverlay'
import PrayerTime from './component/pages/prayer-time/PrayerTime'
import Greeting from './component/pages/greeting/Greeting'
import Weather from './component/pages/weather/Weather'
// import Quote from './component/pages/quotes/Quote'
import Settings from './component/settings/Settings'
import Clock from './component/pages/clock/Clock'
import Notes from './component/pages/notes/Notes'

import './app.css'


function App() {
    return (
        <>
            <BackgroundOverlay />
            <div className='container'>
                <Settings />
                <div className='header'>
                    <div>
                        <Clock />
                        <Weather />
                    </div>
                </div>
                <div className='content'>
                    <Greeting />
                    <PrayerTime />
                    <Notes />
                </div>
            </div>
        </>
    )
}

export default App
