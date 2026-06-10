'use client'
import { useEffect, useRef, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import Modal from "../../components/Modal"
import PaymentMethodsTable, { type PaymentMethodType } from "../../components/PaymentMethodsTable"
import "./PaymentMethods.css"
import RequireAuth from "../../routes/RequireAuth"
import InputField from "../../components/InputField"
import Icon from "../../components/Icon"
import IconSelector from "../../components/IconSelector"
import InputGroup from "../../components/InputGroup"
import ListSelector from "../../components/ListSelector"
import DatePicker from "../../components/DatePicker"
import Button from "@/components/Button"

const PaymentMethods = () => {

    const defaultPaymentTypes = [
        "Credit Card",
        "Debit Card",
        "Voucher",
        "Cash",
        "Money Transfer",
    ]

    const [ accounts, setAccounts ] = useState<{ id: string; account_name: string }[]>([]);

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ refreshKey, setRefreshKey ] = useState(0);
    const [ selectedIcon, setSelectedIcon ] = useState("credit_card");
    const [ paymentName, setPaymentName ] = useState("");
    const [ paymentType, setPaymentType ] = useState("");
    const [ account, setAccount ] = useState("");
    const [ accountInput, setAccountInput ] = useState("");
    const [ cardLimit, setCardLimit ] = useState("");
    const [ date, setDate ] = useState<Date | null>(null)

    const [ editingMethod, setEditingMethod ] = useState<PaymentMethodType | null>(null);
    const [ editName, setEditName ] = useState("");
    const [ editType, setEditType ] = useState("");
    const [ editAccount, setEditAccount ] = useState("");
    const [ editAccountInput, setEditAccountInput ] = useState("");
    const [ editIcon, setEditIcon ] = useState("credit_card");
    const [ editCardLimit, setEditCardLimit ] = useState("");
    const [ editDate, setEditDate ] = useState<Date | null>(null);

    const [ deletingMethod, setDeletingMethod ] = useState<PaymentMethodType | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);
    const editModalRef = useRef<HTMLDivElement>(null);
    const deleteModalRef = useRef<HTMLDivElement>(null);

    const closeModal = (clearForm: boolean = false) => {

        setModalOpen(false)

        if (!clearForm) return

        setSelectedIcon("credit_card");
        setPaymentName("");
        setPaymentType("");
        setAccount("");
        setAccountInput("");
        setDate(null);

    }

    const isCreditCard = paymentType === "Credit Card"

    const isFormValid =
        paymentName.trim() !== "" &&
        defaultPaymentTypes.includes(paymentType) &&
        account !== "" &&
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

    const openEditModal = (method: PaymentMethodType) => {
        setEditingMethod(method)
        setEditName(method.name)
        setEditType(method.type)
        setEditAccount(method.account)
        setEditAccountInput(method.account_name)
        setEditIcon(method.icon ?? "credit_card")
        setEditCardLimit(method.card_limit != null ? String(Math.round(method.card_limit * 100)) : "")
        setEditDate(method.due_day != null ? new Date(2000, 0, method.due_day) : null)
    }

    const closeEditModal = () => setEditingMethod(null)

    const isEditCreditCard = editType === "Credit Card"

    const isEditFormValid =
        editName.trim() !== "" &&
        defaultPaymentTypes.includes(editType) &&
        editAccount !== "" &&
        (!isEditCreditCard || (editDate !== null && parseInt(editCardLimit.replace(/\D/g, ""), 10) > 0))

    const submitEdit = async () => {
        if (!editingMethod) return
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("payment_methods").update({
            name:       editName,
            type:       editType,
            account:    editAccount,
            icon:       editIcon,
            due_day:    isEditCreditCard ? editDate?.getDate() ?? null : null,
            card_limit: isEditCreditCard ? parseInt(editCardLimit.replace(/\D/g, ""), 10) / 100 : null,
        }).eq("id", editingMethod.id)

        if (error) {
            console.error(error)
            return
        }

        closeEditModal()
        setRefreshKey(k => k + 1)
    }

    const submitDelete = async () => {
        if (!deletingMethod) return
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("payment_methods").delete().eq("id", deletingMethod.id)

        if (error) {
            console.error(error)
            return
        }

        setDeletingMethod(null)
        setRefreshKey(k => k + 1)
    }

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from("accounts")
                .select("id, account_name")
                .eq("user_id", user.id)

            if (error) {
                console.error(error)
                return
            }

            setAccounts(data)
        }

        fetchAccounts()
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                closeModal(false)
            }
            if (editModalRef.current && !editModalRef.current.contains(e.target as Node)) {
                closeEditModal()
            }
            if (deleteModalRef.current && !deleteModalRef.current.contains(e.target as Node)) {
                setDeletingMethod(null)
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
                <Button text="New payment method" iconName="add" onClick={() => { setModalOpen(true) }}/>
            </div>
            <hr/>
            <section className="payments">
                <PaymentMethodsTable refreshKey={refreshKey} onEdit={openEditModal} onDelete={setDeletingMethod}/>
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
                                    options={accounts.map(a => a.account_name)}
                                    value={accountInput}
                                    onChange={(e) => { setAccountInput(e.target.value); setAccount("") }}
                                    onSelect={(name) => { setAccountInput(name); setAccount(accounts.find(a => a.account_name === name)?.id ?? "") }}/>
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

        <Modal key={editingMethod?.id ?? "none"} visible={editingMethod !== null} title="Edit Payment Method"
                width={60}
                height={20}
                ref={editModalRef}
                onClose={closeEditModal}
                onCancel={closeEditModal}
                onConfirm={submitEdit}
                confirmDisabled={!isEditFormValid}>

            <div className="form-body">
                <div className="grid-tile" style={{"borderRight": ".1px solid var(--lines-secondary)"}}>
                    <InputGroup type="row" gap={1.5}>
                        <InputField type="text" name="editName" id="editName" labelTxt="Payment type name:"
                                    value={editName} onChange={(e) => setEditName(e.target.value)}/>
                        <ListSelector id="editAccount" name="editAccount" labelTxt="Takes from account:"
                                    options={accounts.map(a => a.account_name)}
                                    value={editAccountInput}
                                    onChange={(e) => { setEditAccountInput(e.target.value); setEditAccount("") }}
                                    onSelect={(name) => { setEditAccountInput(name); setEditAccount(accounts.find(a => a.account_name === name)?.id ?? "") }}/>
                    </InputGroup>

                    <ListSelector id="editPaymentType" name="editPaymentType"
                                labelTxt="Payment Type"
                                options={defaultPaymentTypes}
                                value={editType}
                                onChange={(e) => setEditType(e.target.value)}
                                onSelect={setEditType}/>

                    <hr/>

                    {
                        !defaultPaymentTypes.includes(editType) ?
                        "" :
                        (editType === "Credit Card" ?
                            <InputGroup groupContainer="div" type="row" gap={1.5}>
                                <DatePicker id="editDueDay" name="editDueDay" labelTxt="Due day:" value={editDate} onChange={setEditDate} mode="day"/>
                                <InputField type="currency" id="editLimit" name="editLimit" labelTxt="Card Limit:" value={editCardLimit} onChange={(e) => setEditCardLimit(e.target.value)} currency="BRL"/>
                            </InputGroup> :
                            ""
                        )
                    }
                </div>
                <div className="grid-tile">
                    <IconSelector type="fullsize" label="Select the icon:" cols={5} value={editIcon} onChange={setEditIcon}/>
                </div>
            </div>

        </Modal>

        <Modal visible={deletingMethod !== null} title="Delete Payment Method"
                width={30}
                height={10}
                ref={deleteModalRef}
                onClose={() => setDeletingMethod(null)}
                onCancel={() => setDeletingMethod(null)}
                onConfirm={submitDelete}
                confirmColor="danger">

            <p style={{color: "var(--text-default)", padding: "1rem 0"}}>
                Are you sure you want to delete <strong>{deletingMethod?.name}</strong>? This action cannot be undone.
            </p>

        </Modal>

    </RequireAuth></>

}

export default PaymentMethods
