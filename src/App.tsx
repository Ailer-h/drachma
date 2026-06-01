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
import Transactions from './pages/Transactions'

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
                <Route path="/transactions" element={<Transactions/>}/>
            </Route>

            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </>
}

export default App
