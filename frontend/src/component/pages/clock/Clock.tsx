import './style.css'

const Clock = () => {
    return (
        <div className='clock'>
            <div className="clock-digital">
                <div className="hours">20</div>
                <div className="separation">:</div>
                <div className="minutes">18</div>
            </div>
            <div className='clock-hijri'>
                Ahad, Ramadhan 16, 1446
            </div>
            <div className='clock-date'>
                Sunday, March 16
            </div>
        </div>
    )
}

export default Clock