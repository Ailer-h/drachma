'use client'
import { usePathname, useRouter } from "next/navigation"

const PageNavigator = () => {

    const router = useRouter()
    const pathname = usePathname()

    const routes = [
        { address: "/accounts", label: "Accounts" },
        { address: "/paymentMethods", label: "Payment methods" },
        { address: "/transactions", label: "Transactions" },
    ].filter(route => route.address !== pathname)

    return <>{
        routes.map((route) => {
            return <p className="navigation" key={route.address} onClick={() => { router.push(route.address) }}>{route.label}</p>
        })
    }</>

}

export default PageNavigator
