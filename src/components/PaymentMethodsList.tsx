'use client'
import Table, { type Column } from "./Table"
import "../stylesheets/PaymentMethodsList.css"
import Icon from "./Icon"
import { useUserPreferences } from "../context/UserPreferencesContext"
import { formatCurrencyValue } from "../lib/currency"

export type PaymentMethodType = {
    id: string
    name: string
    icon: string | null
    type: string
    account: string
    account_name: string
    due_day: number | null
    card_limit: number | null
}

interface PaymentMethodsListProps {
    methods: PaymentMethodType[]
    loading: boolean
    onEdit?: (method: PaymentMethodType) => void
    onDelete?: (method: PaymentMethodType) => void
}

const PaymentMethodsList = ({ methods, loading, onEdit, onDelete }: PaymentMethodsListProps) => {
    const { currency } = useUserPreferences()

    const columns: Column<PaymentMethodType>[] = [
        {
            header: "Method",
            render: (m) => (
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <Icon iconName={m.icon ?? "credit_card"} />
                    {m.name}
                </div>
            ),
        },
        { header: "Type",    render: (m) => m.type },
        { header: "Account", render: (m) => m.account_name },
        { header: "Due Day", render: (m) => m.due_day ?? "—" },
        {
            header: "Limit",
            render: (m) => m.card_limit != null ? formatCurrencyValue(m.card_limit, currency) : "—",
        },
        {
            header: "Actions",
            className: "actions",
            render: (m) => (
                <div>
                    <Icon iconName="edit"   onClick={() => onEdit?.(m)} />
                    <Icon iconName="delete" onClick={() => onDelete?.(m)} />
                </div>
            ),
        },
    ]

    return (
        <Table
            columns={columns}
            data={methods}
            keyExtractor={(m) => m.id}
            loading={loading}
            emptyMessage="No payment methods"
        />
    )
}

export default PaymentMethodsList
