import Logo from "../../assets/BudgetTracker.svg"


function LoginCard(){
    return (
        <form action="">
            <div className="container">
                
                <div className="cart-box">
                    {/* Logo */}
                    <img className="logo" src={Logo} alt="Budget Tracker Logo" />

                    {/* Login */}
                    <h1 className="title">Login</h1>

                    {/* User Name */}
                    <label htmlFor="uname"></label>
                    <input className="card-form" type="text" placeholder=" Enter Username " name="uname" required/>

                    {/* Password */}
                    <label htmlFor="psw"></label>
                    <input className="card-form" type="password" placeholder=" Enter Password " name="psw" required/>


                    {/* Remember me*/}
                    <label>
                        <input type="checkbox"  name="remember" /> Remember me 
                    </label>

                    {/* Submit Button */}
                    <button
                            type="submit"
                            className=" button inline-flex items-center justify-center px-6 py-2 rounded-lg
                            bg-blue-700 text-white font-semibold
                            hover:bg-blue-700 active:bg-blue-800
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            transition"
                    >
                            Submit
                    </button>
                
                </div>
            </div>
        </form>
    )

}

export default LoginCard;