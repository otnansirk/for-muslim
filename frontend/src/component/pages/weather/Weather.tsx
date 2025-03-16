import Icon from '../../Icon'
import './style.css'

const Weather = () => {
    return (<div className='weather'>
        <div className='temperature'>
            <Icon icon='weather' />
            Cloudy, 23&#xb0;
        </div>
        <div className='location'>
            Ponorogo, Indonesia
        </div>
    </div>
    )
}

export default Weather