import { RefObject } from 'react'
import './style.css'

type LoaderProps = {
    ref?: RefObject<HTMLInputElement | null>
}
const Loader = ({ ref }: LoaderProps) => {
    return <span className="loader" ref={ref} />
}

export default Loader