import Navbar from "../components/layout/Navbar"

function Transactions(){
    return (
        <>
            <Navbar />
            <div className="transactions-container grid justify-center">
                {/* This is a test to design the table later it will change {AI help used for testing here, the real design will come later after db is connected}*/}
                <button className=" button inline-flex items-center justify-self-end px-6 py-2 rounded-lg
                            bg-blue-700 text-white font-semibold
                            hover:bg-blue-700 active:bg-blue-800
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            transition">
                                Add
                </button>
                <div className="overflow-x-auto bg-[#1E1E1E] rounded-lg shadow-md">
                    <table className="min-w-full border border-[#1E1E1E]">
                        <tr className="bg-[#1E1E1E] text-gray-200">
                            <th className="py-3 px-4 text-left border-b">Date</th>
                            <th className="py-3 px-4 text-left border-b">Type</th>
                            <th className="py-3 px-4 text-left border-b">Category</th>
                            <th className="py-3 px-4 text-left border-b">Amount</th>
                            <th className="py-3 px-4 text-left border-b">Method</th>
                            <th className="py-3 px-4 text-left border-b">Notes</th>
                        </tr>
                        <tr className="bg-[#1E1E1E] text-gray-300">
                            <td className="py-3 px-4 border-b">2025-08-01 </td>
                            <td className="py-3 px-4 border-b">Income</td>
                            <td className="py-3 px-4 border-b">Personal Transfer</td>
                            <td className="py-3 px-4 border-b">12.80</td>
                            <td className="py-3 px-4 border-b">Interac Transfer</td>
                            <td className="py-3 px-4 border-b">Wifi Bill payment for Idris</td>
                        </tr>
                        <tr className="bg-[#1E1E1E] text-gray-300">
                            <td className="py-3 px-4 border-b">2025-08-02 </td>
                            <td className="py-3 px-4 border-b">Income</td>
                            <td className="py-3 px-4 border-b">Personal Transfer</td>
                            <td className="py-3 px-4 border-b">200.80</td>
                            <td className="py-3 px-4 border-b">Interac Transfer</td>
                            <td className="py-3 px-4 border-b">Wifi Bill payment for abdou</td>
                        </tr>
                        <tr className="bg-[#1E1E1E] text-gray-300">
                            <td className="py-3 px-4 border-b">2025-08-03 </td>
                            <td className="py-3 px-4 border-b">Expense</td>
                            <td className="py-3 px-4 border-b">Credit Card Payment</td>
                            <td className="py-3 px-4 border-b">50.00 </td>
                            <td className="py-3 px-4 border-b">Bank Transfer</td>
                            <td className="py-3 px-4 border-b">Paying my credit card debt</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Transactions