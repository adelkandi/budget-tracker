import Navbar from "../components/layout/Navbar"
import ItemCard from "../components/cards/ItemCard"
import { useEffect, useState } from "react"
import { fetchBudgetData } from "../api/budgetApi"
import type { BudgetItem } from "../api/budgetApi"

function Budget(){
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBudgetData = async () => {
            try {
                setLoading(true);
                const data = await fetchBudgetData(1); // User ID 1 for now
                setBudgetItems(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load budget data:", err);
                setError("Failed to load budget data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadBudgetData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="budget-container px-5 py-5">
                <h1 className="title text-5xl mb-8">Budget</h1>
                
                {loading && (
                    <div className="text-center text-gray-400 text-xl py-10">
                        Loading budget data...
                    </div>
                )}
                
                {error && (
                    <div className="text-center text-red-400 text-xl py-10">
                        {error}
                    </div>
                )}
                
                {!loading && !error && budgetItems.length === 0 && (
                    <div className="text-center text-gray-400 text-xl py-10">
                        No budget data available. Start by adding some transactions!
                    </div>
                )}
                
                {!loading && !error && budgetItems.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {budgetItems.map((item, index) => (
                            <ItemCard
                                key={index}
                                category={item.category}
                                budgeted={item.budgeted}
                                spent={item.spent}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Budget