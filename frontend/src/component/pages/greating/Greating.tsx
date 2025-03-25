import { useEffect, useState } from 'react'
import { GreatingType } from '../../../types/Storage'
import Datetime from '../../../utils/Datetime'
import Storage from '../../../utils/Storage'

import './style.css'

const Greating = () => {

    const [name, setName] = useState<string>("")
    const [greatings, setGreatings] = useState<string>("")

    useEffect(() => {
        Storage.sync.get('greating', (item) => {
            const great = item as GreatingType
            const name = great?.name ?? ""
            setGreatings(Datetime.greating())
            setName(name)
        })
    }, [])


    const onHandlerName = (name: string) => {
        setName(name)
        Storage.sync.set('greating', { name })
    }

    return (
        <div className="greating">
            {greatings}{name && ", "}
            <label className="input-sizer" data-value={name}>
                <input className='name' onChange={ev => onHandlerName(ev.target.value)} defaultValue={name} size={1} />
            </label>
        </div >
    )
}

export default Greating