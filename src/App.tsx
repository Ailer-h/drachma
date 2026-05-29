import { useNavigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PaymentMethods from './pages/PaymentMethods'
import Accounts from './pages/Accounts'
import PageNotFound from './pages/PageNotFound'

import Layout from './Layout'
import { useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import AccountDetails from './pages/AccountDetails'

const App = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                Navigate("/login");
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const fetchAccounts = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await supabase
            .from("accounts")
            .select("id, account_name")
            .eq("user_id", user.id);

        if (error) {
            console.log(error);
            return;
        }

        return data || []

    };

    return <>
        <Routes>

            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/paymentMethods" element={<PaymentMethods/>}/>
                <Route path="/accounts" element={<Accounts/>}/>
                <Route path="/accounts/:accountName" element={<AccountDetails/>}/>
            </Route>

            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </>
}

export default App
