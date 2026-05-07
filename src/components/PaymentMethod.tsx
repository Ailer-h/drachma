import Icon from "./Icon"
import { useUserPreferences } from "../context/UserPreferencesContext"
import { formatCurrencyValue } from "../lib/currency"

interface PaymentMethodProps {
    icon: string
    type: string
    account: string
    dueDay: number | null
    cardLimit: number | null
    children?: React.ReactNode
}

const PaymentMethod = ({ icon, type, account, dueDay, cardLimit, children }: PaymentMethodProps) => {

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
                    <Icon iconName="edit"/>
                    <Icon iconName="delete"/>
                </div>
            </td>
        </tr>
    </>

}

export default PaymentMethod