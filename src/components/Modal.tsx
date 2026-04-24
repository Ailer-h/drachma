import { useEffect, useRef, type FocusEventHandler } from "react"

import "../stylesheets/Modal.css"
import Icon from "./Icon"

interface ModalProps {

    title: string

    width?: number
    height?: number

    visible: boolean,
    onBlur: FocusEventHandler
    onClose: React.MouseEventHandler

    children?: React.ReactNode,

}

const Modal = ({ title, height, width, visible, onClose, onBlur, children }: ModalProps) => {

    const firstItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visible) {
            firstItemRef.current?.focus();
        }
    }, [visible]);
    

    if (!height) {
        height = 30
    }

    if (!width) {
        width = 80
    }

    if (visible) {

        document.body.style.overflowY = "hidden";

    }else {

        document.body.style.overflowY = "scroll";

    }

    return <>
        <div className={`modal-overlay ${visible ? "open" : ""}`}>
            <div className={`modal ${visible ? "open" : ""}`} style={{"height": height + "em", "width": width + "em"}} tabIndex={-1} ref={firstItemRef} onBlur={onBlur}>
                <div className="modal-bar">
                    <h1>{title}</h1>
                    <Icon onClick={onClose} iconName="close"/>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    
    </>

}

export default Modal