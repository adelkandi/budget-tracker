// Import components:
import Navbar from "../components/layout/Navbar"
import IncomeCard from "../components/cards/IncomeCard"
import BalanceCard from "../components/cards/BalanceCard"
import ExpenseCard from "../components/cards/ExpenseCard"


function Dashboard(){
    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <IncomeCard />
                <ExpenseCard />
                <BalanceCard />
            </div>
        </> 
    );
}


export default Dashboard;