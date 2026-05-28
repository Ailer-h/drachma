import { useEffect, useRef, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Modal from "../components/Modal"
import AccountsTable, { type AccountType } from "../components/AccountsTable"
import "../stylesheets/Accounts.css"
import RequireAuth from "../routes/RequireAuth"
import InputField from "../components/InputField"
import Icon from "../components/Icon"
import InputGroup from "../components/InputGroup"
import ListSelector from "../components/ListSelector"

const Accounts = () => {

    const accountTypes = [
        "Checking",
        "Savings",
        "Investment",
        "Business",
        "Cash",
        "Benefits"
    ]

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ refreshKey, setRefreshKey ] = useState(0);
    const [ accountName, setAccountName ] = useState("");
    const [ accountType, setAccountType ] = useState("");

    const [ editingAccount, setEditingAccount ] = useState<AccountType | null>(null);
    const [ editName, setEditName ] = useState("");
    const [ editType, setEditType ] = useState("");

    const [ deletingAccount, setDeletingAccount ] = useState<AccountType | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);
    const editModalRef = useRef<HTMLDivElement>(null);
    const deleteModalRef = useRef<HTMLDivElement>(null);

    const closeModal = (clearForm: boolean = false) => {
        setModalOpen(false)

        if (!clearForm) return

        setAccountName("")
        setAccountType("")
    }

    const isFormValid =
        accountName.trim() !== "" &&
        accountTypes.includes(accountType)

    const submitForm = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("accounts").insert({
            user_id:      user.id,
            account_name: accountName,
            account_type: accountType,
        })

        if (error) {
            console.error(error)
            return
        }

        closeModal(true)
        setRefreshKey(k => k + 1)
    }

    const openEditModal = (account: AccountType) => {
        setEditingAccount(account)
        setEditName(account.account_name)
        setEditType(account.account_type)
    }

    const closeEditModal = () => setEditingAccount(null)

    const isEditFormValid =
        editName.trim() !== "" &&
        accountTypes.includes(editType)

    const submitEdit = async () => {
        if (!editingAccount) return
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("accounts").update({
            account_name: editName,
            account_type: editType,
        }).eq("id", editingAccount.id)

        if (error) {
            console.error(error)
            return
        }

        closeEditModal()
        setRefreshKey(k => k + 1)
    }

    const submitDelete = async () => {
        if (!deletingAccount) return
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("accounts").delete().eq("id", deletingAccount.id)

        if (error) {
            console.error(error)
            return
        }

        setDeletingAccount(null)
        setRefreshKey(k => k + 1)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                closeModal(false)
            }
            if (editModalRef.current && !editModalRef.current.contains(e.target as Node)) {
                closeEditModal()
            }
            if (deleteModalRef.current && !deleteModalRef.current.contains(e.target as Node)) {
                setDeletingAccount(null)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return <><RequireAuth>

        <main className="accounts">
            <div className="account-bar">
                <h3>Accounts</h3>
                <button id="new-account" onClick={() => { setModalOpen(true) }}>New account <Icon iconName="add"/></button>
            </div>
            <hr/>
            <section className="accounts-section">
                <AccountsTable refreshKey={refreshKey} onEdit={openEditModal} onDelete={setDeletingAccount}/>
            </section>
        </main>

        <Modal visible={modalOpen} title="New Account"
                width={40}
                height={12}
                ref={modalRef}
                onClose={() => closeModal(true)}
                onCancel={() => closeModal(true)}
                onConfirm={() => submitForm()}
                confirmDisabled={!isFormValid}>

            <div className="account-form">
                <InputGroup type="row" gap={1.5}>
                    <InputField type="text" name="accountName" id="accountName" labelTxt="Account name:"
                                value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
                    <ListSelector id="accountType" name="accountType"
                                labelTxt="Account type:"
                                options={accountTypes}
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                                onSelect={setAccountType}/>
                </InputGroup>
            </div>

        </Modal>

        <Modal key={editingAccount?.id ?? "none"} visible={editingAccount !== null} title="Edit Account"
                width={40}
                height={12}
                ref={editModalRef}
                onClose={closeEditModal}
                onCancel={closeEditModal}
                onConfirm={submitEdit}
                confirmDisabled={!isEditFormValid}>

            <div className="account-form">
                <InputGroup type="row" gap={1.5}>
                    <InputField type="text" name="editName" id="editName" labelTxt="Account name:"
                                value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    <ListSelector id="editAccountType" name="editAccountType"
                                labelTxt="Account type:"
                                options={accountTypes}
                                value={editType}
                                onChange={(e) => setEditType(e.target.value)}
                                onSelect={setEditType}/>
                </InputGroup>
            </div>

        </Modal>

        <Modal visible={deletingAccount !== null} title="Delete Account"
                width={30}
                height={10}
                ref={deleteModalRef}
                onClose={() => setDeletingAccount(null)}
                onCancel={() => setDeletingAccount(null)}
                onConfirm={submitDelete}
                confirmColor="danger">

            <p style={{color: "var(--text-default)", padding: "1rem 0"}}>
                Are you sure you want to delete <strong>{deletingAccount?.account_name}</strong>? This action cannot be undone.
            </p>

        </Modal>

    </RequireAuth></>

}

export default Accounts
