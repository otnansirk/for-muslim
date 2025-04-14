import { useEffect, useState } from 'react'

import { LocationType } from '../../../types/Storage'
import { WeatherType } from '../../../types/Weather'
import Storage from '../../../utils/Storage'
import Request from '../../../utils/Request'
import Loader from '../../loader/Loader'
import Icon from '../../Icon'

import './style.css'

type WeatherProps = {
    lat?: string
    lng?: string
}

const Weather = (props: WeatherProps) => {

    const [weather, setWeather] = useState<WeatherType | null>(null)
    const [location, setLocation] = useState<LocationType>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Request.get({
                    path: "/weathers-accu",
                    query: props.lat && props.lng
                        ? {
                            lat: props.lat,
                            lng: props.lng
                        }
                        : {}
                });

                const res = await response.json()
                Storage.sync.set('location', res.data?.location)
                setLocation(res.data?.location)

                const wData: WeatherType = {
                    temp_c: res.data.temp.c,
                    temp_f: res.data.temp.f,
                    feels_c: res.data.temp.feels_c,
                    feels_f: res.data.temp.feels_f,
                    text: res.data.text,
                    last_update: Date.now()
                }
                Storage.sync.set('weather', wData)
                setWeather(wData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        Storage.sync.get('weather', weather => {
            const res = weather as WeatherType
            setWeather(res)
            Storage.sync.get('location', location => setLocation(location as LocationType))

            if (res?.last_update) {
                const fiveHours = 5 * 60 * 60 * 1000; // 5hr
                const expiredAt = res?.last_update + fiveHours
                const isExpired = expiredAt < Date.now()

                if (isExpired) {
                    fetchData();
                }

            } else {
                fetchData();
            }
        })

    }, [props])

    return (<div className='weather'>
        {
            weather
                ? <>
                    <div className='temperature'>
                        <Icon icon='weather' />
                        {weather?.text}, {weather?.feels_c}&#xb0;
                    </div>
                    <div className='location'>
                        {location?.city}, {location?.region}
                    </div>
                </>
                : <div className='loading'><Loader /></div>
        }

    </div>
    )
}

export default Weather