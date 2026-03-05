// API service for budget-related endpoints

const API_BASE_URL = "https://budget-tracker.railway.app";

// Default fetch options to include credentials (cookies)
const fetchOptions: RequestInit = {
    credentials: "include", // Include cookies in requests
};

export interface BudgetItem {
    category: string;
    budgeted: number;
    spent: number;
}

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    created_at?: string;
}

/**
 * Get current authenticated user
 * @returns Promise with user data or null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, fetchOptions);
        
        if (!response.ok) {
            return null;
        }
        
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

/**
 * Login user
 * @param username - Username
 * @param password - Password
 * @returns Promise with user data
 */
export async function login(username: string, password: string): Promise<{ user: User; message: string }> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        ...fetchOptions,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
    }
    
    return response.json();
}

/**
 * Register new user
 * @param name - Full name
 * @param username - Username
 * @param email - Email
 * @param password - Password
 * @returns Promise with user data
 */
export async function register(
    name: string,
    username: string,
    email: string,
    password: string
): Promise<{ user: User; message: string }> {
    const response = await fetch(`${API_BASE_URL}/register`, {
        ...fetchOptions,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed");
    }
    
    return response.json();
}

/**
 * Logout user
 * @returns Promise with success message
 */
export async function logout(): Promise<void> {
    await fetch(`${API_BASE_URL}/logout`, {
        ...fetchOptions,
        method: "POST",
    });
}

/**
 * Fetch budget data from the backend
 * @param userId - The user ID to fetch budget data for (optional, uses authenticated user)
 * @returns Promise with array of budget items
 */
export async function fetchBudgetData(userId?: number): Promise<BudgetItem[]> {
    try {
        const url = userId 
            ? `${API_BASE_URL}/budget?user_id=${userId}`
            : `${API_BASE_URL}/budget`;
            
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: BudgetItem[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching budget data:", error);
        throw error;
    }
}
