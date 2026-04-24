import PaymentMethodsTable from "../components/PaymentMethodsTable"
import "../stylesheets/PaymentMethods.css"

const PaymentMethods = () => {

    return <>

        <main className="paymentMethods">
            <div className="payment-bar">
                <h3>Payment Methods</h3>
                <button id="new-payment-method">New payment type <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M447-128v-319H128v-66h319v-319h66v319h319v66H513v319h-66Z"/></svg></button>
            </div>
            <hr/>
            <section className="payments">
                <PaymentMethodsTable/>
            </section>
        </main>
    
    </>

}

export default PaymentMethods