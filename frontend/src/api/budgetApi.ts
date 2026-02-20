// API service for budget-related endpoints

const API_BASE_URL = "http://192.168.0.168:5000";

export interface BudgetItem {
    category: string;
    budgeted: number;
    spent: number;
}

/**
 * Fetch budget data from the backend
 * @param userId - The user ID to fetch budget data for (optional, defaults to 1)
 * @returns Promise with array of budget items
 */
export async function fetchBudgetData(userId: number = 1): Promise<BudgetItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/budget?user_id=${userId}`);
        
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
