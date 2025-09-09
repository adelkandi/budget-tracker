import Logo from "../../assets/BudgetTracker.svg"
function Navbar(){

 return (
    <nav className="navbar bg-zinc-900 text-[#F8F8FF]">
        <div className="max-w-8xl mx-auto px-4 ms:px-6 lg:px-8">
            <div className="nav-container flex items-center justify-between h-20 relative">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={Logo} alt="Budget tracker Logo" className="h-16 w-auto cursor-pointer" onClick={() =>{console.log('clicked')}}/> {/* test */}
                </div>

                {/* Links */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-10">
                    <a href="#" className="hover:text-[#5A8DEE]">Dashboard</a>
                    <a href="#" className="hover:text-[#5A8DEE]">Transactions</a>
                    <a href="#" className="hover:text-[#5A8DEE]">Budget</a>
                    <a href="#" className="hover:text-[#5A8DEE]">Reports</a>
                </div>

                {/* Profile */}
                <div className="hidden md:flex items-center">
                    <a href="#" className="hover:text-[#5A8DEE]">Profile</a>
                </div>
            </div>
        </div>
    </nav>
 )

}


export default Navbar