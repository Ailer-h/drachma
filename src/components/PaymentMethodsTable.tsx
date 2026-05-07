import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PaymentMethod from "./PaymentMethod";

type PaymentMethodType = {
    id: string;
    name: string;
    icon: string | null;
    type: string;
    account: string;
    due_day: number | null;
    card_limit: number | null;
}

const PaymentMethodsTable = ({ refreshKey }: { refreshKey?: number }) => {
    const [methods, setMethods] = useState<PaymentMethodType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentMethods = async () => {

            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                console.log("No user logged in");
                return;
            }

            const { data, error } = await supabase.from("payment_methods").select("id, name, icon, type, account, due_day, card_limit").eq("user_id", user.id);

            if (error) {
                console.log(error)
                return;
            }

            setMethods(data || [])
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
                        <PaymentMethod key={method.id} icon={method.icon ?? ""} type={method.type} account={method.account} dueDay={method.due_day} cardLimit={method.card_limit}>{method.name}</PaymentMethod>
                      ))
                    )}
            </tbody>
        </table>
    </>
    
}

export default PaymentMethodsTable