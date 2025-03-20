import { useEffect, useState } from 'react'
import { GreatingType } from '../../../types/Storage'
import { greating } from '../../../utils/Datetime'
import Storage from '../../../utils/Storage'

import './style.css'

const Greating = () => {

    const [name, setName] = useState<string>("")

    useEffect(() => {
        Storage.sync.get('greating', (item) => {
            const great = item as GreatingType
            setName(great.name ?? "")
        })
    }, [])


    const onHandlerName = (name: string) => {
        setName(name)
        Storage.sync.set('greating', { name })
    }

    return (
        <div className="greating">
            {greating()} {name && ","}
            <label className="input-sizer" data-value={name}>
                <input className='name' onChange={ev => onHandlerName(ev.target.value)} defaultValue={name} size={1} />
            </label>
        </div>
    )
}

export default Greating