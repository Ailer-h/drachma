'use client'
import Table, { type Column } from "./Table"
import { useUserPreferences } from "../context/UserPreferencesContext"
import { formatCurrencyValue } from "../lib/currency"

export type TransactionType = {
    id: string
    name: string
    value: number
    payment_method_id: string
    payment_method_name: string
    date: string
    refunded_amount: number | null
}

interface TransactionsListProps {
    transactions: TransactionType[]
    loading: boolean
}

const TransactionsList = ({ transactions, loading }: TransactionsListProps) => {
    const { currency } = useUserPreferences()

    const columns: Column<TransactionType>[] = [
        {
            header: "Transaction",
            render: (t) => t.name,
        },
        {
            header: "Value",
            render: (t) => {
                const negative = t.value < 0
                const formatted = formatCurrencyValue(Math.abs(t.value), currency)
                return (
                    <span style={{ color: negative ? "var(--danger-600)" : "var(--success-600)" }}>
                        {negative ? `(${formatted})` : formatted}
                    </span>
                )
            },
        },
        {
            header: "Payment Method",
            render: (t) => t.payment_method_name,
        },
        {
            header: "Date",
            render: (t) => new Date(t.date).toLocaleDateString(),
        },
        {
            header: "Refunded",
            render: (t) => t.refunded_amount != null
                ? formatCurrencyValue(t.refunded_amount, currency)
                : "—",
        },
    ]

    return (
        <Table
            columns={columns}
            data={transactions}
            keyExtractor={(t) => t.id}
            loading={loading}
            emptyMessage="No transactions"
        />
    )
}

export default TransactionsList
