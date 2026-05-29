import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Account from "./Account";

export type AccountType = {
    id: string;
    account_name: string;
    account_type: string;
}

interface AccountsGridProps {
    refreshKey?: number
    onEdit?: (account: AccountType) => void
    onDelete?: (account: AccountType) => void
}

const AccountsGrid = ({ refreshKey, onEdit, onDelete }: AccountsGridProps) => {
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("accounts")
                .select("id, account_name, account_type")
                .eq("user_id", user.id);

            if (error) {
                console.log(error);
                return;
            }

            setAccounts(data || []);
            setLoading(false);
        };

        fetchAccounts();
    }, [refreshKey]);

    return <>
        <div className="accounts-grid">
                {loading ? (
                    <tr><td colSpan={3}>Loading...</td></tr>
                ) : accounts.length === 0 ? (
                    <tr><td colSpan={3}>No accounts</td></tr>
                ) : (
                    accounts.map((account) => (
                        <Account
                            key={account.id}
                            id={account.id}
                            accountName={account.account_name}
                            accountType={account.account_type}
                            onEdit={() => onEdit?.(account)}
                            onDelete={() => onDelete?.(account)}/>
                    ))
                )}
        </div>
    </>;
};

export default AccountsGrid;
