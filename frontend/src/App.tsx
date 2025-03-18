
import BackgroundOverlay from './component/pages/background-overlay/BackgroundOverlay'
import PrayerTime from './component/pages/prayer-time/PrayerTime'
import Greating from './component/pages/greating/Greating'
import Weather from './component/pages/weather/Weather'
import Quote from './component/pages/quotes/Quote'
import Clock from './component/pages/clock/Clock'
import Notes from './component/pages/notes/Notes'

import './app.css'

function App() {
    return (
        <>
            {/* <SearchLocation open={open} setOpen={setOpen} /> */}

            <BackgroundOverlay />

            <div className='container'>
                <div className='header'>
                    {/* <Setting /> */}
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
