import { useNavigate } from "react-router-dom";
import { BarChart3, TrendingDown, PieChart, Wallet, ArrowUp, ArrowDown } from "lucide-react";
import Logo from "../assets/BudgetTracker.svg";

function Home() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Wallet className="w-10 h-10" />,
            title: "Budget Tracking",
            description: "Set budgets for different categories and monitor spending in real-time"
        },
        {
            icon: <TrendingDown className="w-10 h-10" />,
            title: "Expense Management",
            description: "Track all your expenses with detailed categories and payment methods"
        },
        {
            icon: <BarChart3 className="w-10 h-10" />,
            title: "Analytics & Reports",
            description: "Get detailed insights into your spending patterns and financial trends"
        },
        {
            icon: <PieChart className="w-10 h-10" />,
            title: "Visual Dashboard",
            description: "Beautiful charts and graphs to visualize your financial overview"
        },
        {
            icon: <ArrowUp className="w-10 h-10" />,
            title: "Income Tracking",
            description: "Monitor all your income sources in one centralized location"
        },
        {
            icon: <ArrowDown className="w-10 h-10" />,
            title: "Spending Insights",
            description: "Understand where your money goes and optimize your spending"
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-900 text-[#F8F8FF]">
            {/* Navigation Bar */}
            <nav className="bg-zinc-900">
                <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <img src={Logo} alt="Budget Tracker" className="h-16 w-auto cursor-pointer" onClick={() => navigate("/")} />
                        <button
                            onClick={() => navigate("/login")}
                            className="text-[#F8F8FF] hover:text-[#5A8DEE] transition font-semibold"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <img src={Logo} alt="Budget Tracker" className="h-24 w-auto mx-auto mb-8" />
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Take Control of Your <span className="text-[#5A8DEE]">Finances</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Budget Tracker helps you manage your money with ease. Track expenses, set budgets, 
                        and get insights into your spending habits—all in one beautiful dashboard.
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="button inline-flex items-center justify-center px-8 py-3 rounded-lg
                            bg-blue-700 text-white font-semibold
                            hover:bg-blue-800 active:bg-blue-900
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            transition"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 md:px-8 bg-[#1E1E1E]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="title text-5xl text-center mb-16">
                        Powerful Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-zinc-900 rounded-lg border border-[#4472C4] hover:border-[#5A8DEE] transition hover:shadow-lg hover:shadow-blue-700/30 group"
                            >
                                <div className="text-[#5A8DEE] group-hover:text-blue-400 transition mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="title text-5xl mb-6">
                        Ready to take control?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Join thousands of users who are already managing their finances smarter.
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="button h-40 w-50 inline-flex items-center justify-center px-8 py-3 rounded-lg
                            bg-blue-700 text-white font-semibold
                            hover:bg-blue-800 active:bg-blue-900
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            transition "
                    >
                        Create Your Account Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#4472C4] py-8 px-4 bg-[#1E1E1E] text-center text-gray-400">
                <p>&copy; 2024 Budget Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
