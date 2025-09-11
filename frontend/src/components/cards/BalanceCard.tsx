import UpIcon from "../../assets/icons8-up-48.png"

function BalanceCard(){
    return (
        <div className="card-container max-w-sm rounded overflow-hidden shadow-lg bg-[#1E1E1E]  rounded-2xl m-10 p-6 gap-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-[#5A8DEE]">
            <div className="card-title text-3xl">
                <span>Balance</span>
            </div>
            <img src={UpIcon} alt="Up Sign Icon" className="icon h-8 " />
            <div className="value text-5xl">
                <span>$52348.00</span>
            </div>
        </div> 
    )
}

export default BalanceCard