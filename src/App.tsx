import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './stylesheets/App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {

  return <>
    <BrowserRouter>
        <Routes>

            <Route index path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>

        </Routes>
    </BrowserRouter>
    </>
}

export default App
