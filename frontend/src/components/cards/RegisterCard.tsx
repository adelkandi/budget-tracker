import Logo from "../../assets/BudgetTracker.svg"
import {useState} from "react"
import { useNavigate } from "react-router-dom"


function RegisterCard(){
    const [fname, setFname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const handleregister = async (e:React.FormEvent) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/register" ,{
            method:"POST",
            headers: {"Content-type": "application/json"},
            body:JSON.stringify({fname,username,email,password})
        })
        if (response.ok){
            navigate("/dashboard")
        } else{
            alert("Invalid input")
        }
    } 


    // Register Card:
    return(
        <div className="container">
            <div className="cart-box">
                
                    {/* Logo */}
                    <img className="logo" src={Logo} alt="Budget Tracker Logo" />

                    {/* Title */}
                    <h1 className="title">Register</h1>

                    {/* Full Name */}
                    <label htmlFor="fname"></label>
                    <input className="card-form" type="text" placeholder=" Full Name " name="fname" required/> 

                    {/* UserName */}
                    <label htmlFor="uname"></label>
                    <input className="card-form" type="text" placeholder=" Username " name="uname" required/> 

                    {/* Password */}
                    <label htmlFor="psw"></label>
                    <input className="card-form" type="password" placeholder=" Password " name="psw" required/> 

                    {/* RePassword */}
                    <label htmlFor="repsw"></label>
                    <input className="card-form" type="password" placeholder=" Re-Password " name="repsw" required/> 

                    {/* Submit Button */}
                    <button type="submit" className="button inline-flex items-center justify-center px-6 py-2 rounded-lg
                            bg-blue-700 text-white font-semibold
                            hover:bg-blue-700 active:bg-blue-800
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            transition">Submit
                    </button>
                
            </div>
        </div>
    )
}
export default RegisterCard