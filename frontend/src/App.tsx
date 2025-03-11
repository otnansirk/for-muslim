import './app.css'
import Each from './component/Each'
import Icon from './component/Icon'

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
        upcoming: false
    },
    {
        id: "sholat-isha",
        icon: "sholat-isha",
        title: "Isha",
        time: "04:30 am",
        notify: "on",
        upcoming: true
    },
]

function App() {


    return (
        <>
            <div className='header'>
                <div className='header-upcoming'>
                    <div className='upcoming'>
                        <div className='prayer'>Isha</div>
                        <div className='time'>07:00 <span>pm</span></div>
                        <span><img src={'./asset/plus-minus.svg'} /> in 2 hours 34 minutes</span>
                    </div>
                    <div className='location'>
                        <div className='icon'><img src={'./asset/edit.svg'} /></div>
                        <div className='city'>Ponorogo</div>
                        <div className='country'>Indonesia</div>
                    </div>
                </div>
                <div className='calculation-method'>
                    <div>Kementerian Agama Republik Indonesia</div>
                    <div><img src={'./asset/dropdown.svg'} /></div>
                </div>
                <div className='settings'><Icon icon='gear' /></div>
                <div className='date'>
                    <div className='hijri'>1 Ramadhan 1446</div>
                    <div className='geor'>1 March 2025</div>
                </div>
            </div>
            <div className='body'>
                <div className='table'>
                    <div className='table-header'>
                        <div className='table-tr'>
                            <div className='table-td'>Prayer</div>
                            <div className='table-td'>Time</div>
                        </div>
                    </div>
                    <div className='table-body'>
                        {
                            <Each
                                data={prayTime}
                                render={(item, key) => (
                                    <div className={`table-tr ${item.upcoming && 'active'}`} key={key}>
                                        <div className='table-td icon pray-icon'><Icon icon={item.icon} />{item.title}</div>
                                        <div className='table-td'>{item.time}</div>
                                        <div className='table-td icon notify-icon'><Icon icon={`notify-${item.notify}`} /></div>
                                    </div>
                                )}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
