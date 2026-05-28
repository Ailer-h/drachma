import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PaymentMethod from "./PaymentMethod";

export type PaymentMethodType = {
    id: string;
    name: string;
    icon: string | null;
    type: string;
    account: string;       // UUID (FK to accounts.id)
    account_name: string;  // resolved display name
    due_day: number | null;
    card_limit: number | null;
}

interface PaymentMethodsTableProps {
    refreshKey?: number
    onEdit?: (method: PaymentMethodType) => void
    onDelete?: (method: PaymentMethodType) => void
}

const PaymentMethodsTable = ({ refreshKey, onEdit, onDelete }: PaymentMethodsTableProps) => {
    const [methods, setMethods] = useState<PaymentMethodType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentMethods = async () => {

            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                console.log("No user logged in");
                return;
            }

            const { data, error } = await supabase
                .from("payment_methods")
                .select("id, name, icon, type, account, accounts(account_name), due_day, card_limit")
                .eq("user_id", user.id);

            if (error) {
                console.log(error)
                return;
            }

            const methods: PaymentMethodType[] = (data || []).map(m => ({
                id: m.id,
                name: m.name,
                icon: m.icon,
                type: m.type,
                account: m.account,
                account_name: (m.accounts as { account_name: string } | null)?.account_name ?? "",
                due_day: m.due_day,
                card_limit: m.card_limit,
            }))

            setMethods(methods)
            setLoading(false)
        };

        fetchPaymentMethods();
    }, [refreshKey])

    return <>
        <table>
            <thead>
                <tr><th>Method</th><th>Type</th><th>Account</th><th>Due Day</th><th>Limit</th><th className="actions">Actions</th></tr>
            </thead>
                
            <tbody id="payments-list">
                {loading ? (
                      <tr>
                        <td colSpan={6}>Loading...</td>
                      </tr>
                    ) : methods.length === 0 ? (
                      <tr>
                        <td colSpan={6}>No payment methods</td>
                      </tr>
                    ) : (
                      methods.map((method) => (
                        <PaymentMethod key={method.id} id={method.id} icon={method.icon ?? ""} type={method.type} account={method.account_name} dueDay={method.due_day} cardLimit={method.card_limit}
                            onEdit={() => onEdit?.(method)}
                            onDelete={() => onDelete?.(method)}>{method.name}</PaymentMethod>
                      ))
                    )}
            </tbody>
        </table>
    </>
    
}

export default PaymentMethodsTable