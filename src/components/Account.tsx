import Icon from "./Icon"

interface AccountProps {
    id: string
    accountName: string
    accountType: string
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
}

const Account = ({ id, accountName, accountType, onEdit, onDelete }: AccountProps) => {
    return <>
        <tr>
            <td>{accountName}</td>
            <td>{accountType}</td>
            <td className="actions">
                <div>
                    <Icon iconName="edit" onClick={() => onEdit?.(id)}/>
                    <Icon iconName="delete" onClick={() => onDelete?.(id)}/>
                </div>
            </td>
        </tr>
    </>
}

export default Account
