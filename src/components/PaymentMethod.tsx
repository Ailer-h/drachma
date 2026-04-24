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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M194-194h43.92l407.93-407.92-43.93-42.93L194-236.92V-194Zm-66 66v-136.77l557.23-558.77q5.15-5.48 11.57-6.97 6.43-1.49 12.49-1.49 6.06 0 11.12.54 5.05.54 11.44 6.15l92.69 91.93q5.61 6.38 6.54 12 .92 5.63.92 12.25 0 6.13-1.74 12.06-1.74 5.92-6.72 11.07L264.77-128H128Zm626.77-581.31-45.46-44.46 45.46 44.46ZM624.5-623.5l-22.58-21.35 43.93 42.93-21.35-21.58Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M300.62-128q-38.85 0-64.74-25.88Q210-179.77 210-218.62V-724h-40v-66h188v-38.77h246V-790h188v66h-40v505.38q0 38.35-26.14 64.48Q699.73-128 661.38-128H300.62ZM686-724H276v505.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h360.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-724ZM371.31-275h66v-368h-66v368Zm153.38 0h66v-368h-66v368ZM276-724v530-530Z"/></svg>
                </div>
            </td>
        </tr>
    </>

}

export default PaymentMethod