
import { ReactNode } from 'react';
import './modal.css'

type ModalProps = {
    setOpen: (open: boolean) => void;
    open: boolean,
    children: ReactNode
}

const Modal = (props: ModalProps) => {

    return <div className={`modal ${props.open && 'open-modal'}`} onClick={() => props.setOpen(false)}>
        <div className='modal-body' onClick={(e) => e.stopPropagation()}>
            {props.children}
        </div>
    </div>
}

export default Modal