import DashboardTile from "../components/DashboardTile"
import RequireAuth from "../routes/RequireAuth"
import "../stylesheets/Dashboard.css"

const Dashboard = () => {

    return <><RequireAuth>
    
        <main className="dashboard">
            <DashboardTile gridArea="overview"></DashboardTile>
            <DashboardTile gridArea="overview-legend"></DashboardTile>
            <DashboardTile gridArea="expenses"></DashboardTile>
            <DashboardTile gridArea="investments"></DashboardTile>
        </main>
    
    </RequireAuth></>

}

export default Dashboard