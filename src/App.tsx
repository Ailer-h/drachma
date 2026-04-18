import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import './stylesheets/App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {

  const [navbarType, setNavbarType] = useState("start")

  return <>
    <BrowserRouter>
      <Navbar type={navbarType}/>

        <Routes>

            <Route index path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>

        </Routes>
      <Footer/>

    </BrowserRouter>
    </>
}

export default App
