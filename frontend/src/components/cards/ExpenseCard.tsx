import DownIcon from "../../assets/icons8-down-48.png"



function ExpenseCard(){
    return (
        <div className="card-container max-w-sm rounded overflow-hidden shadow-lg bg-[#1E1E1E]  rounded-2xl m-10 p-6 gap-6 w-50 h-45 transition duration-300 ease-in-out hover:scale-105 hover:shadow-[#5A8DEE]">
            <div className="card-title text-3xl">
                <span>Total Expenses</span>
            </div>
            <img src={DownIcon} alt="Up Sign Icon" className="icon h-8 " />
            <div className="value text-5xl">
                <span>$7000.00</span>
            </div>
        </div>        
    )
}

export default ExpenseCard