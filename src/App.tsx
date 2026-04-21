import { Route, Routes } from 'react-router-dom'

import './stylesheets/App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

import Layout from './Layout'
import PageNotFound from './pages/PageNotFound'

const App = () => {

    return <>
        <Routes>

            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>

            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </>
}

export default App
