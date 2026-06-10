'use client'
import RequireAuth from "@/routes/RequireAuth"
import TransactionsTable from "@/components/TransactionsTable"
import "./Transactions.css"

const Transactions = () => {

    return <><RequireAuth>

        <main className="transactions">
            <div className="transactions-bar">
                <h3>Transactions</h3>
            </div>
            <hr/>
            <section className="transactions-section">
                <TransactionsTable/>
            </section>
        </main>

    </RequireAuth></>

}

export default Transactions
