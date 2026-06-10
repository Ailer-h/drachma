'use client'
import DashboardTile from "../../components/DashboardTile"
import RequireAuth from "../../routes/RequireAuth"
import "./Dashboard.css"

const Dashboard = () => {

    return <><RequireAuth>

        <main className="dashboard">
            <DashboardTile gridArea="overview" className="primary"></DashboardTile>
            <DashboardTile gridArea="overview-legend"></DashboardTile>
            <DashboardTile gridArea="expenses"></DashboardTile>
            <DashboardTile gridArea="investments"></DashboardTile>
        </main>

    </RequireAuth></>

}

export default Dashboard
