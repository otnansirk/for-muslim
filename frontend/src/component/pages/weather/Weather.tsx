import { useEffect, useRef } from 'react'

import { WeatherType } from '../../../types/Weather'
import Storage from '../../../utils/Storage'
import Icon from '../../Icon'

import './style.css'


const Weather = () => {

    const weatherRef = useRef<HTMLDivElement>(null)
    const tempRef = useRef<HTMLDivElement>(null)
    const addressRef = useRef<HTMLDivElement>(null)


    useEffect(() => {

        Storage.sync.watch('weather', data => {
            const weather = data as WeatherType
            weatherRef.current!.style = `display: ${weather.temp && weather.enable ? 'flex' : 'none'}`
            tempRef.current!.textContent = `${weather.text}, ${weather.temp}°${weather.unit}`
            addressRef.current!.textContent = `${weather.address}`
        })

    }, [])

    return <>
        <div className='weather' ref={weatherRef}>
            <Icon icon='weather' />
            <div className='weather-wrap'>
                <div ref={tempRef} className='weather-temp' />
                <div ref={addressRef} className='weather-address' />
            </div>
        </div>
    </>
}

export default Weather