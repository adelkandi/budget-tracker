import DownIcon from "../../assets/icons8-down-48.png"



function ExpenseCard(){
    return (
        <div className="card-container max-w-sm rounded overflow-hidden shadow-lg bg-[#1E1E1E]  rounded-2xl">
            <div className="card-title text-3xl">
                <span>Total Expenses</span>
            </div>
            <img src={DownIcon} alt="Up Sign Icon" className="icon h-8 " />
            <div className="value text-5xl">
                <span>$40.00</span>
            </div>
        </div>        
    )
}

export default ExpenseCard