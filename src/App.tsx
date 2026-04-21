import { Route, Routes, useLocation } from 'react-router-dom'

import './stylesheets/App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PageNotFound from './pages/PageNotFound'
import Dashboard from './pages/Dashboard'

const App = () => {

    const hideNavbarPaths = ["/login", "/signup"];
    const location = useLocation();

    return <>
        {
            !hideNavbarPaths.includes(location.pathname) &&
            <Navbar type={location.pathname == "/home" ? "start" : "main"}/>
        }
        <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={<PageNotFound/>}/>

        </Routes>
        
        {
            !hideNavbarPaths.includes(location.pathname) &&
            <Footer/>
        }
    
    </>
}

export default App
