import Logo from "../../assets/BudgetTracker.svg"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import { login } from "../../api/budgetApi"


function LoginCard(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [_error, setError] = useState("")
    const navigate = useNavigate()
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        
        try {
            const result = await login(username, password)
            console.log("Login successful:", result.user)
            // Store user data in localStorage for easy access
            localStorage.setItem("user", JSON.stringify(result.user))
            navigate("/dashboard")
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Login failed"
            setError(errorMessage)
            alert(errorMessage)
        }
    }

    // Login Card
    return (
        <form onSubmit={handleLogin}>
            <div className="container">
                
                <div className="cart-box">
                    {/* Logo */}
                    <img className="logo" src={Logo} alt="Budget Tracker Logo" />

                    {/* Login */}
                    <h1 className="title">Login</h1>

                    {/* User Name */}
                    <label htmlFor="uname"></label>
                    <input className="card-form" type="text" placeholder=" Enter Username " value={username} onChange={(e) => setUsername(e.target.value)} required/>

                    {/* Password */}
                    <label htmlFor="psw"></label>
                    <input className="card-form" type="password" placeholder=" Enter Password " value={password} onChange={(e) => setPassword(e.target.value)} required/>

                    {/* Create Account */}
                    <label htmlFor="cacc"></label>
                    <a href="/register" className="register-link">Create an account</a>

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