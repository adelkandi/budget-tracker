import { useNavigate } from "react-router-dom";
import { BarChart3, TrendingDown, PieChart, Wallet, ArrowUp, ArrowDown } from "lucide-react";

function Home() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Wallet className="w-8 h-8" />,
            title: "Budget Tracking",
            description: "Set budgets for different categories and monitor spending in real-time"
        },
        {
            icon: <TrendingDown className="w-8 h-8" />,
            title: "Expense Management",
            description: "Track all your expenses with detailed categories and payment methods"
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Analytics & Reports",
            description: "Get detailed insights into your spending patterns and financial trends"
        },
        {
            icon: <PieChart className="w-8 h-8" />,
            title: "Visual Dashboard",
            description: "Beautiful charts and graphs to visualize your financial overview"
        },
        {
            icon: <ArrowUp className="w-8 h-8" />,
            title: "Income Tracking",
            description: "Monitor all your income sources in one centralized location"
        },
        {
            icon: <ArrowDown className="w-8 h-8" />,
            title: "Spending Insights",
            description: "Understand where your money goes and optimize your spending"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
            {/* Navigation */}
            <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-400">
                        Budget Tracker
                    </div>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-slate-300 hover:text-white transition"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Take Control of Your <span className="text-blue-400">Finances</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Budget Tracker helps you manage your money with ease. Track expenses, set budgets, 
                        and get insights into your spending habits—all in one beautiful dashboard.
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-blue-500/50"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-slate-800/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        Powerful Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600/50 hover:border-blue-400/50 transition group"
                            >
                                <div className="text-blue-400 group-hover:text-blue-300 transition mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to take control?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Join thousands of users who are already managing their finances smarter.
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-blue-500/50"
                    >
                        Create Your Account Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-700/50 py-8 px-6 bg-slate-900/50">
                <div className="max-w-6xl mx-auto text-center text-slate-400">
                    <p>&copy; 2024 Budget Tracker. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
