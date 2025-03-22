import { useState } from 'react';
import Icon from '../component/Icon';

const Notify = ({ show }: { show: string }) => {
    const [active, setActive] = useState<string>(show)
    const onclose = () => {
        setActive("")
    }

    return (
        <div className={`for-muslim__notify ${active}`} onClick={onclose}>
            <div className='content'>
                <Icon icon="notify-on" className='bell' />
                It's time for Isha prayer <strong>Isha!</strong>
            </div>
        </div>
    )
}

export default Notify