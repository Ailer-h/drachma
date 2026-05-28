import Icon from "./Icon"
import { useUserPreferences } from "../context/UserPreferencesContext"
import { formatCurrencyValue } from "../lib/currency"

interface PaymentMethodProps {
    id: string
    icon: string
    type: string
    account: string
    dueDay: number | null
    cardLimit: number | null
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
    children?: React.ReactNode
}

const PaymentMethod = ({ id, icon, type, account, dueDay, cardLimit, onEdit, onDelete, children }: PaymentMethodProps) => {

    const { currency } = useUserPreferences()

    return <>
        <tr>
            <td>
                <Icon iconName={icon}/>
                {children}
            </td>
            <td>{type}</td>
            <td>{account}</td>
            <td>{dueDay ?? "—"}</td>
            <td>{cardLimit != null ? formatCurrencyValue(cardLimit, currency) : "—"}</td>
            <td className="actions">
                <div>
                    <Icon iconName="edit" onClick={() => onEdit?.(id)}/>
                    <Icon iconName="delete" onClick={() => onDelete?.(id)}/>
                </div>
            </td>
        </tr>
    </>

}

export default PaymentMethod