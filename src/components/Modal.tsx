import { useEffect, useRef } from "react"

import "../stylesheets/Modal.css"
import Icon from "./Icon"

interface ModalProps {

    title: string

    ref?: React.RefObject<HTMLDivElement | null>

    width?: number
    height?: number

    visible: boolean,
    onClose: React.MouseEventHandler

    children?: React.ReactNode,

}

const Modal = ({ title, height, width, visible, onClose, ref, children }: ModalProps) => {

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
            <div className={`modal ${visible ? "open" : ""}`} style={{"height": height + "em", "width": width + "em"}} tabIndex={-1} ref={ref}>
                <div className="modal-bar-top">
                    <h1>{title}</h1>
                    <Icon onClick={onClose} iconName="close"/>
                </div>

                <div className="modal-body">
                    {children}
                </div>

                <div className="modal-bar-bottom">
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="confirm">Confirm</button>
                </div>                
            </div>
        </div>
    
    </>

}

export default Modal