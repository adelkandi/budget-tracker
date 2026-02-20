
interface ItemCardProps {
    category: string;
    budgeted: number;
    spent: number;
    icon?: string;
}

function ItemCard({ category, budgeted, spent, icon }: ItemCardProps) {
    const remaining = budgeted - spent;
    const percentage = budgeted > 0 ? (spent / budgeted) * 100 : 0;
    const isOverBudget = spent > budgeted;

    return (
        <div className="card-container rounded overflow-hidden shadow-lg bg-[#1E1E1E] rounded-2xl p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-[#5A8DEE]">
            <div className="flex justify-between items-start mb-4">
                <div className="card-title text-2xl font-semibold text-gray-200">
                    {category}
                </div>
                {icon && (
                    <img src={icon} alt={`${category} icon`} className="icon h-8 w-8" />
                )}
            </div>

            <div className="budget-info space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Budgeted:</span>
                    <span className="text-gray-200 font-medium">${budgeted.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Spent:</span>
                    <span className={`font-medium ${isOverBudget ? 'text-red-400' : 'text-blue-400'}`}>
                        ${spent.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Remaining:</span>
                    <span className={`font-medium ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
                        ${remaining.toFixed(2)}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                    <div
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                </div>
                
                <div className="text-right text-xs text-gray-500 mt-1">
                    {percentage.toFixed(1)}% used
                </div>
            </div>
        </div>
    );
}

export default ItemCard;