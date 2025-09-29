import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register"
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions"
import Budget from "./pages/budget"


function app(){

    
    return (
        <Router>
    
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/transactions" element={<Transactions />}></Route>
                    <Route path="/budget" element={<Budget />}></Route>
                </Routes>
            
        </Router>
    )
}

export default app;