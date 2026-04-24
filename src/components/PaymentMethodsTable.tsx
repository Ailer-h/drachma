import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PaymentMethod from "./PaymentMethod";

type PaymentMethodType = {
    id: string;
    paymenttypename: string;
    icon: string | null;
}

const PaymentMethodsTable = () => {
    const [methods, setMethods] = useState<PaymentMethodType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentMethods = async () => {

            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                console.log("No user logged in");
                return;
            }

            const { data, error } = await supabase.from("paymentmethod").select("id, paymenttypename, icon").eq("user", user.id);

            if (error) {
                console.log(error)
                return;
            }

            console.log("DATA:", data);
            
            setMethods(data || [])
            setLoading(false)
        };

        fetchPaymentMethods();
    }, [])

    return <>
        <table>
            <thead>
                <tr><th>Method</th><th className="actions">Actions</th></tr>
            </thead>
                
            <tbody id="payments-list">
                {loading ? (
                      <tr>
                        <td colSpan={2}>Loading...</td>
                      </tr>
                    ) : methods.length === 0 ? (
                      <tr>
                        <td colSpan={2}>No payment methods</td>
                      </tr>
                    ) : (
                      methods.map((method) => (
                        <PaymentMethod key={method.id} icon={method.icon ? method.icon : ""}>{method.paymenttypename}</PaymentMethod>
                      ))
                    )}
            </tbody>
        </table>
    </>
    
}

export default PaymentMethodsTable