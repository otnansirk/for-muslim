import './app.css'
import Icon from './component/Icon'

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
                <div className='date'></div>
            </div>
        </>
    )
}

export default App
