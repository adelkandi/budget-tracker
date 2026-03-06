import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register"
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions"
import Budget from "./pages/budget"
import Reports from "./pages/reports"
import Profile from "./pages/profile"

function App(){
    console.log("App component is rendering!");
    
    return (
        <Router>
            <div style={{ minHeight: "100vh" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/budget" element={<Budget />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;