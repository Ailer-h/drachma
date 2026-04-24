import { useLocation, useNavigate } from "react-router-dom"

const PageNavigator = () => {

    const Navigate = useNavigate();
    const Location = useLocation();

    const routes = [
        { address: "/paymentMethods", label: "Payment methods" },
        { address: "/income", label: "Income sources" },
        { address: "/expenses", label: "Expenses" }
    ].filter(route => route.address !== Location.pathname)

    console.log(routes)

    return <>{
        routes.map((route) => {
            return <p className="navigation" key={route.address} onClick={() => {Navigate(route.address)}}>{route.label}</p>
        })
    }</>
    

}

export default PageNavigator