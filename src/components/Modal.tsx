import { useEffect, useRef, type MouseEventHandler } from "react"

import "../stylesheets/Modal.css"
import Icon from "./Icon"

interface ModalProps {

    title: string

    ref?: React.RefObject<HTMLDivElement | null>

    width?: number
    height?: number

    visible: boolean,
    onClose: Function,
    onCancel: Function,
    onConfirm: Function
    confirmDisabled?: boolean

    children?: React.ReactNode,

    cancelColor?: "confirm" | "cancel" | "danger",
    confirmColor?: "confirm" | "cancel" | "danger"

}

const Modal = ({ title, height=30, width=80, visible, onClose, onCancel, onConfirm, confirmDisabled, ref, children, confirmColor="confirm", cancelColor="cancel" }: ModalProps) => {

    const firstItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visible) {
            firstItemRef.current?.focus();
        }
    }, [visible]);

    const style = {

        height: height + "em",
        width: width + "em"

    }

    if (visible) {

        document.body.style.overflowY = "hidden";

    }else {

        document.body.style.overflowY = "scroll";

    }

    return <>
        <div className={`modal-overlay ${visible ? "open" : ""}`}>
            <div className={`modal ${visible ? "open" : ""}`} style={style} tabIndex={-1} ref={ref}>
                <div className="modal-bar-top">
                    <h1>{title}</h1>
                    <Icon onClick={onClose as MouseEventHandler} iconName="close"/>
                </div>

                <div className="modal-body">
                    {children}
                </div>

                <div className="modal-bar-bottom">
                    <button type="button" className={cancelColor} onClick={onCancel as MouseEventHandler}>Cancel</button>
                    <button type="button" className={confirmColor} onClick={onConfirm as MouseEventHandler} disabled={confirmDisabled}>Confirm</button>
                </div>                
            </div>
        </div>
    
    </>

}

export default Modal