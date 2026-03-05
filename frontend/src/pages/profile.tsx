import Navbar from "../components/layout/Navbar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../api/budgetApi"

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    created_at?: string;
}

function Profile(){
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        try {
            // Try to get user from API (validates cookie)
            const userData = await getCurrentUser()
            
            if (userData) {
                setUser(userData)
                localStorage.setItem("user", JSON.stringify(userData))
            } else {
                // No valid session, check localStorage
                const storedUser = localStorage.getItem("user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                } else {
                    // Not logged in, redirect to login
                    navigate("/login")
                }
            }
        } catch (error) {
            console.error("Error loading user:", error)
            navigate("/login")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
            localStorage.removeItem("user")
            navigate("/login")
        } catch (error) {
            console.error("Error logging out:", error)
            // Still redirect even if API call fails
            localStorage.removeItem("user")
            navigate("/login")
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <p>Loading...</p>
                </div>
            </>
        )
    }

    return(
        <>
            <Navbar />
            <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
                <h1 style={{ marginBottom: "2rem" }}>My Profile</h1>
                
                {user && (
                    <div style={{ 
                        backgroundColor: "#f5f5f5", 
                        padding: "2rem", 
                        borderRadius: "8px",
                        marginBottom: "1rem"
                    }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <strong>Username:</strong> {user.username}
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <strong>Email:</strong> {user.email}
                        </div>
                        {user.created_at && (
                            <div style={{ marginBottom: "1rem" }}>
                                <strong>Member Since:</strong>{" "}
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                )}

                <button 
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        padding: "0.75rem 2rem",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        width: "100%"
                    }}
                >
                    Logout
                </button>
            </div>
        </>
    )
}

export default Profile