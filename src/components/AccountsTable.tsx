import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Account from "./Account";

export type AccountType = {
    id: string;
    account_name: string;
    account_type: string;
}

interface AccountsTableProps {
    refreshKey?: number
    onEdit?: (account: AccountType) => void
    onDelete?: (account: AccountType) => void
}

const AccountsTable = ({ refreshKey, onEdit, onDelete }: AccountsTableProps) => {
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
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th className="actions">Actions</th>
                </tr>
            </thead>
            <tbody id="accounts-list">
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
            </tbody>
        </table>
    </>;
};

export default AccountsTable;
