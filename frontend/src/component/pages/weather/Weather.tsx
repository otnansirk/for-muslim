import { useEffect, useState } from 'react'

import Request from '../../../utils/Request'
import Storage, { WeatherType } from '../../../utils/Storage'
import Icon from '../../Icon'

import './style.css'
import Loader from '../../loader/Loader'

type WeatherProps = {
    lat: string
    lng: string
}

const Weather = (props: WeatherProps) => {

    const [weather, setWeather] = useState<WeatherType | null>(null)
    const [region, setRegion] = useState<string>("")
    const [city, setCity] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Request.get({
                    path: "/weathers",
                    query: {
                        lat: props.lat,
                        lng: props.lng
                    }
                });

                const res = await response.json()
                Storage.sync.set('lat', res.data.location.lat)
                Storage.sync.set('lng', res.data.location.lng)
                Storage.sync.set('region', res.data.location.region)
                Storage.sync.set('city', res.data.location.city)

                const wData: WeatherType = {
                    temp_c: res.data.temp.c,
                    temp_f: res.data.temp.f,
                    feels_c: res.data.temp.feels_c,
                    feels_f: res.data.temp.feels_f,
                    text: res.data.text,
                    last_update: Date.now()
                }
                Storage.sync.set('weather', wData)

                setWeather(res)
                setRegion(res.data.location.region)
                setCity(res.data.location.city)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        Storage.sync.get('weather').then(weather => {
            const res = weather as WeatherType
            setWeather(res)

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
        Storage.sync.get('city').then(city => setCity(city as string))
        Storage.sync.get('region').then(region => setRegion(region as string))

        Storage.sync.listen('weather', data => data && setWeather(data as WeatherType))
        Storage.sync.listen('city', city => city && setCity(city as string))
        Storage.sync.listen('region', region => region && setRegion(region as string))

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
                        {city}, {region}
                    </div>
                </>
                : <div className='loading'><Loader /></div>
        }

    </div>
    )
}

export default Weather