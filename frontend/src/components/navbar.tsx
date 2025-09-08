import Logo from "../assets/BudgetTracker.svg"

function Navbar(){

 return (
    <nav className="navbar bg-zinc-900 text-[#F8F8FF]">
        <div className="max-w-8xl mx-auto px- ms:px-6 lg:px-8">
            <div className="nav-container flex justify-between h-20 ">
                <img src={Logo} alt="Budget tracker Logo"  width={180} height={180} onClick={() =>{console.log('clicked')}}/> {/* test */}
                <div className="pages hidden md:flex items-center space-x-6 gap-9">
                    <a href="#" className="hover:text-[#5A8DEE]">Dashboard</a>
                    <a href="#" className="hover:text-[#5A8DEE]">Transactions</a>
                    <a href="#" className="hover:text-[#5A8DEE]">Budget</a>
                    <a href="#" className="hover:text-[#5A8DEE]">Reports</a>
                </div>
                <div className="hidden md:flex items-center"><a href="#" className="hover:text-[#5A8DEE]">Profile</a></div>
            </div>
        </div>
    </nav>
 )

}


export default Navbar