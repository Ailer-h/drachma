import { useEffect, useRef, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Modal from "../components/Modal"
import PaymentMethodsTable from "../components/PaymentMethodsTable"
import "../stylesheets/PaymentMethods.css"
import RequireAuth from "../routes/RequireAuth"
import InputField from "../components/InputField"
import Icon from "../components/Icon"
import IconSelector from "../components/IconSelector"
import InputGroup from "../components/InputGroup"
import ListSelector from "../components/ListSelector"
import DatePicker from "../components/DatePicker"

const PaymentMethods = () => {

    const defaultPaymentTypes = [
        "Credit Card",
        "Debit Card",
        "Voucher",
        "Cash",
        "Money Transfer",
    ]

    const accounts = [
        "PagBank",
        "Clear",
        "Flash"
    ]

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ refreshKey, setRefreshKey ] = useState(0);
    const [ selectedIcon, setSelectedIcon ] = useState("credit_card");
    const [ paymentName, setPaymentName ] = useState("");
    const [ paymentType, setPaymentType ] = useState("");
    const [ account, setAccount ] = useState("");
    const [ cardLimit, setCardLimit ] = useState("");
    const [ date, setDate ] = useState<Date | null>(null)

    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (clearForm: boolean = false) => {

        setModalOpen(false)

        if (!clearForm) return

        setSelectedIcon("credit_card");
        setPaymentName("");
        setPaymentType("");
        setAccount("");
        setDate(null);

    }

    const isCreditCard = paymentType === "Credit Card"

    const isFormValid =
        paymentName.trim() !== "" &&
        defaultPaymentTypes.includes(paymentType) &&
        account.trim() !== "" &&
        (!isCreditCard || (date !== null && parseInt(cardLimit.replace(/\D/g, ""), 10) > 0))

    const submitForm = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("payment_methods").insert({
            user_id:    user.id,
            name:       paymentName,
            type:       paymentType,
            account:    account,
            icon:       selectedIcon,
            due_day:    isCreditCard ? date?.getDate() ?? null : null,
            card_limit: isCreditCard ? parseInt(cardLimit.replace(/\D/g, ""), 10) / 100 : null,
        })

        if (error) {
            console.error(error)
            return
        }

        closeModal(true)
        setRefreshKey(k => k + 1)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                closeModal(false)
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
                <PaymentMethodsTable refreshKey={refreshKey}/>
            </section>
        </main>

        <Modal visible={modalOpen} title="New Payment Method"
                width={60}
                height={20}
                ref={modalRef}
                onClose={() => closeModal(true)}
                onCancel={() => closeModal(true)}
                onConfirm={() => submitForm()}
                confirmDisabled={!isFormValid}>

            <div className="form-body">
                <div className="grid-tile" style={{"borderRight": ".1px solid var(--lines-secondary)"}}>
                    <InputGroup type="row" gap={1.5}>
                        <InputField type="text" name="paymentName" id="paymentName" labelTxt="Payment type name:"
                                    value={paymentName} onChange={(e) => setPaymentName(e.target.value)}/>
                        <ListSelector id="account" name="account" labelTxt="Takes from account:"
                                    options={accounts}
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    onSelect={setAccount}/>
                    </InputGroup>

                    <ListSelector id="paymentType" name="paymentType"
                                labelTxt="Payment Type"
                                options={defaultPaymentTypes}
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                onSelect={setPaymentType}/>
                    
                    <hr/>
                    
                    {
                        !defaultPaymentTypes.includes(paymentType) ?
                        "" :
                        (paymentType == "Credit Card" ? 
                            <><InputGroup groupContainer="div" type="row" gap={1.5}>
                                <DatePicker id="dueDay" name="dueDay" labelTxt="Due day:" value={date} onChange={setDate} mode="day"/>
                                <InputField type="currency" id="limit" name="limit" labelTxt="Card Limit:" value={cardLimit} onChange={(e) => setCardLimit(e.target.value)} currency="BRL"/>
                            </InputGroup></> :
                           ""
                        )
                    }
                    
                </div>
                <div className="grid-tile">
                    <IconSelector type="fullsize" label="Select the icon:" cols={5} value={selectedIcon} onChange={setSelectedIcon}/>
                </div>
            </div>
            
        </Modal>

    </RequireAuth></>

}

export default PaymentMethods