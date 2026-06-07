'use client'
import { usePathname } from "next/navigation"
import { useLayoutContext } from './context/LayoutContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { hideLayout } = useLayoutContext()
    const hideNavbarPaths = ["/login", "/signup"]
    const hideFooterPaths = ["/login", "/signup"]
    const pathname = usePathname()

    if (hideLayout) return <>{children}</>

    return <>
        {
            !hideNavbarPaths.includes(pathname) &&
            <Navbar type={pathname === "/" ? "start" : "main"}/>
        }

        {children}

        {
            !hideFooterPaths.includes(pathname) &&
            <Footer/>
        }
    </>
}

export default Layout
