import { useEffect, useRef, useState } from "react"
import Modal from "../components/Modal"
import PaymentMethodsTable from "../components/PaymentMethodsTable"
import "../stylesheets/PaymentMethods.css"
import RequireAuth from "../routes/RequireAuth"
import InputField from "../components/InputField"
import Icon from "../components/Icon"

const PaymentMethods = () => {

    const [ modalOpen, setModalOpen ] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return <><RequireAuth>

        <main className="paymentMethods">
            <div className="payment-bar">
                <h3>Payment Methods</h3>
                <button id="new-payment-method" onClick={() => { setModalOpen(true) }}>New payment type <Icon iconName="add"/></button>
            </div>
            <hr/>
            <section className="payments">
                <PaymentMethodsTable/>
            </section>
        </main>

        <Modal visible={modalOpen} title="New Payment Method"
                width={60}
                height={20}
                ref={modalRef}
                onClose={() => {setModalOpen(false)}}>

            <div className="form-body">
                <div className="grid-tile" style={{"borderRight": ".1px solid var(--lines-secondary)"}}>
                    <span><InputField type="text" name="paymentName" id="paymentName" labelTxt="Payment type name:"/></span>
                    <span><InputField type="text" name="account" id="account" labelTxt="Takes from account:"/></span>
                </div>
                <div className="grid-tile"></div>
            </div>
            
        </Modal>

    </RequireAuth></>

}

export default PaymentMethods