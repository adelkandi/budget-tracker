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
            <div className="dashboard-container flex justify-center gap-6">
                <IncomeCard />
                <ExpenseCard />
                <BalanceCard />
            </div>
            <IncomeExpensesChart />
        </> 
    );
}


export default Dashboard;