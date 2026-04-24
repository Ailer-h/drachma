import { useNavigate, Route, Routes } from 'react-router-dom'

import './stylesheets/App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

import Layout from './Layout'
import PageNotFound from './pages/PageNotFound'
import { useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import PaymentMethods from './pages/PaymentMethods'

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
            </Route>

            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </>
}

export default App
