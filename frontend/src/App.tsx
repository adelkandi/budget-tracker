import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register"

function app(){

    // return (<Register />)
    return (
        <Router>
            
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            
        </Router>
    )
}

export default app;