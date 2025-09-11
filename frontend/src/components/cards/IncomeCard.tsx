import UpIcon from "../../assets/icons8-up-48.png"

function IncomeCard(){
    return (
        <div className="card-container max-w-sm rounded overflow-hidden shadow-lg bg-[#1E1E1E]  rounded-2xl m-10 gap-6 p-6 transition duration-300 ease-in-out hover:scale-105 hover:shadow-[#5A8DEE]">
            <div className="card-title text-3xl">
                <span>Total Income</span>
            </div>
            <img src={UpIcon} alt="Up Sign Icon" className="icon h-8 " />
            <div className="value text-5xl">
                <span>$78000.00</span>
            </div>
        </div> 
    )
}


export default IncomeCard; 