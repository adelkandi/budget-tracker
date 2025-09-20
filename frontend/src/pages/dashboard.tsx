// Import components:
import Navbar from "../components/layout/Navbar"
import IncomeCard from "../components/cards/IncomeCard"
import BalanceCard from "../components/cards/BalanceCard"
import ExpenseCard from "../components/cards/ExpenseCard"
import IncomeExpensesChart from "../components/charts/IncomeExpensesChart"

function Dashboard(){
    return (
        <>
            <Navbar />
            <h1 className="dashboard-title text-5xl mx-5 my-5">Dashboard</h1>
            <div className="dashboard-container flex justify-center gap-6">
                <IncomeCard />
                <ExpenseCard />
                <BalanceCard />
            </div>
            <div className="flex justify-center gap">
                <IncomeExpensesChart />
            </div>
            
        </> 
    );
}


export default Dashboard;