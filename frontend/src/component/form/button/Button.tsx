import { ReactNode } from "react"
import './style.css'


type ButtonType = {
    onClick: () => void
    children: ReactNode
}
const Button = (props: ButtonType) => {
    return <button
        className="action-button"
        onClick={props.onClick}
    >
        {props.children}
    </button>
}

export default Button;