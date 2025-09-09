import UpIcon from "../../assets/icons8-up-48.png"

function BalanceCard(){
    return (
        <div className="card-container max-w-sm rounded overflow-hidden shadow-lg bg-[#1E1E1E]  rounded-2xl">
            <div className="card-title text-3xl">
                <span>Balance</span>
            </div>
            <img src={UpIcon} alt="Up Sign Icon" className="icon h-8 " />
            <div className="value text-5xl">
                <span>$1.00</span>
            </div>
        </div> 
    )
}

export default BalanceCard