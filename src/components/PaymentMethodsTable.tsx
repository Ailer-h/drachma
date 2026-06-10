'use client'
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import PaymentMethodsList, { type PaymentMethodType } from "./PaymentMethodsList"

export type { PaymentMethodType }

interface PaymentMethodsTableProps {
    refreshKey?: number
    onEdit?: (method: PaymentMethodType) => void
    onDelete?: (method: PaymentMethodType) => void
}

const PaymentMethodsTable = ({ refreshKey, onEdit, onDelete }: PaymentMethodsTableProps) => {
    const [methods, setMethods] = useState<PaymentMethodType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) {
                    console.log("No user logged in")
                    return
                }

                const { data, error } = await supabase
                    .from("payment_methods")
                    .select("id, name, icon, type, account, accounts(account_name), due_day, card_limit")
                    .eq("user_id", user.id)

                if (error) {
                    console.log(error)
                    return
                }

                setMethods((data || []).map(m => ({
                    id: m.id,
                    name: m.name,
                    icon: m.icon,
                    type: m.type,
                    account: m.account,
                    account_name: (m.accounts as unknown as { account_name: string } | null)?.account_name ?? "",
                    due_day: m.due_day,
                    card_limit: m.card_limit,
                })))
            } finally {
                setLoading(false)
            }
        }

        fetchPaymentMethods()
    }, [refreshKey])

    return (
        <PaymentMethodsList
            methods={methods}
            loading={loading}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    )
}

export default PaymentMethodsTable
