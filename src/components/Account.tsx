import { useNavigate } from "react-router-dom"
import { useUserPreferences } from "../context/UserPreferencesContext"
import { formatCurrencyValue } from "../lib/currency"
import Icon from "./Icon"

interface AccountProps {
    id: string
    accountName: string
    accountType: string
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
}

const Account = ({ id, accountName, accountType, onEdit, onDelete }: AccountProps) => {
    
    const UserPreferences = useUserPreferences()
    const Navigate = useNavigate()
    
    return <>
        <div className="account" onClick={() => Navigate("/accounts/" + accountName.toLowerCase())}>
            <Icon iconName="menu_dot" className="options" onClick={(e) => {
                e.stopPropagation()
                alert("Options")
            }}/>
            <div className="main-info">
                <p>{accountName} <span>{accountType}</span></p>

                <span>
                    <p>Balance:</p>
                    <h1 className="mono">{formatCurrencyValue(1000, UserPreferences.currency)}</h1>
                </span>
            </div>

            <div className="history">
                <p>Last entry:</p>
                <span className="mono positive">+{formatCurrencyValue(10, UserPreferences.currency)}</span>
            </div>
            
        </div>
    </>
}

export default Account
