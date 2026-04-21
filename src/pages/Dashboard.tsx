import DashboardTile from "../components/DashboardTile"
import "../stylesheets/Dashboard.css"

const Dashboard = () => {

    return <>
    
        <main className="dashboard">
            <DashboardTile gridArea="overview"></DashboardTile>
            <DashboardTile gridArea="overview-legend"></DashboardTile>
            <DashboardTile gridArea="expenses"></DashboardTile>
            <DashboardTile gridArea="investments"></DashboardTile>
        </main>
    
    </>

}

export default Dashboard