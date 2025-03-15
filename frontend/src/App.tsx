import { useEffect, useState } from 'react'
import SearchLocation from './component/search-loaction/SearchLocation'
import Storage, { ProfileProps } from './utils/Storage'
import Icon from './component/Icon'
import Each from './component/Each'
import './app.css'

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

    console.log(profile, "OKEEEEE");

    const [open, setOpen] = useState(false)

    return (
        <>
            <SearchLocation open={open} setOpen={setOpen} />
            <div className='fly-date'>
                <div className='date'>
                    <div className='hijri'>1 Ramadhan 1446</div>
                    <div className='geor'>1 March 2025</div>
                </div>
            </div>

            <div className='header'>
                <img className='bg' src='/assets/bg.svg' />
                <div className='header-upcoming'>
                    <div className='upcoming'>
                        <div className='weather'><Icon icon='weather' /> 72</div>
                        <div className='time'>07:00 <span>pm</span></div>
                        <span><img src={'./assets/plus-minus.svg'} /> in 2 hours 34 minutes</span>
                    </div>
                    <div className='location'>
                        <div className='icon' onClick={() => setOpen(true)}><img src={'./assets/edit.svg'} /></div>
                        <div className='city'>{profile?.city}</div>
                        <div className='country'>{profile?.country}</div>
                    </div>
                </div>
                <div className='calculation-method'>
                    <select>
                        <Each data={calculateMethod} render={(item, key) => (
                            <option key={key} value={item.id}>{item.name}</option>
                        )} />
                    </select>
                </div>
                <div className='settings'><Icon icon='gear' /></div>
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
                                        <div className='tr-prayer'>
                                            <div className='table-td icon pray-icon'><Icon icon={item.icon} />{item.title}</div>
                                            <div className='table-td'>{item.time}</div>
                                        </div>
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
