import { useState } from 'react';
import Icon from '../../Icon'
import './style.css'

const Notify = ({ show }: { show: string }) => {
    const [active, setActive] = useState<string>(show)
    const onclose = () => {
        setActive("")
    }

    return (
        <div className={`notify ${active}`} onClick={onclose}>
            <div className='content'>
                <Icon icon="logo" />
                <div className='text'>
                    <div className='title'>It's time for Isha prayer <strong>Isha!</strong></div>
                    <div className='desc'>Luangkan waktu sejenak untuk beribadah.</div>
                </div>
            </div>
        </div>
    )
}

export default Notify