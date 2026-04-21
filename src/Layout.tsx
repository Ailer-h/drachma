import { Outlet, useLocation } from "react-router-dom";

import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = () => {

    const hideNavbarPaths = ["/login", "/signup"];
    const hideFooterPaths = ["/login", "/signup"];
    const location = useLocation();

    return <>
        {
            !hideNavbarPaths.includes(location.pathname) &&
            <Navbar type={location.pathname == "/" ? "start" : "main"}/>
        }

        <Outlet/>
        
        {
            !hideFooterPaths.includes(location.pathname) &&
            <Footer/>
        }
    
    </>
}

export default Layout
