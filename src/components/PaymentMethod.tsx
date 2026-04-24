import Icon from "./Icon"

interface PaymentMethodProps {
    icon: string
    children?: React.ReactNode,
}

const PaymentMethod = ({ icon, children }: PaymentMethodProps) => {

    return <>
        <tr>
            <td>
                <div>
                   <Icon iconName={icon}/>
                   <p>{children}</p>
               </div>
            </td>
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