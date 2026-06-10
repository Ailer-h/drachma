'use client'
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import TransactionsList, { type TransactionType } from "./TransactionsList"

export type { TransactionType }

interface TransactionsTableProps {
    refreshKey?: number
}

const TransactionsTable = ({ refreshKey }: TransactionsTableProps) => {
    const [transactions, setTransactions] = useState<TransactionType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                const { data, error } = await supabase
                    .from("transactions")
                    .select("id, name, value, payment_method, payment_methods(name), date, refunded_amount")
                    .eq("user_id", user.id)
                    .order("date", { ascending: false })

                if (error) {
                    console.error(error)
                    return
                }

                setTransactions((data || []).map(t => ({
                    id: t.id,
                    name: t.name,
                    value: t.value,
                    payment_method_id: t.payment_method,
                    payment_method_name: (t.payment_methods as unknown as { name: string } | null)?.name ?? "—",
                    date: t.date,
                    refunded_amount: t.refunded_amount,
                })))
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [refreshKey])

    return (
        <TransactionsList
            transactions={transactions}
            loading={loading}
        />
    )
}

export default TransactionsTable
