import Navbar from "../components/layout/Navbar"

function Transactions(){
    return (
        <>
            <Navbar />
            <div className="transactions-container grid justify-center">
                {/* This is a test to design the table later it will change */}
                <button className=" button inline-flex items-center justify-center px-6 py-2 rounded-lg
                            bg-blue-700 text-white font-semibold
                            hover:bg-blue-700 active:bg-blue-800
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            transition">Add</button>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Notes</th>
                    </tr>
                    <tr>
                        <td>2025-08-01 </td>
                        <td>Income</td>
                        <td>Personal Transfer</td>
                        <td>12.80</td>
                        <td>Interac Transfer</td>
                        <td>Wifi Bill payment for Idris</td>
                    </tr>
                    <tr>
                        <td>2025-08-02 </td>
                        <td>Income</td>
                        <td>Personal Transfer</td>
                        <td>200.80</td>
                        <td>Interac Transfer</td>
                        <td>Wifi Bill payment for abdou</td>
                    </tr>
                    <tr>
                        <td>2025-08-03 </td>
                        <td>Expense</td>
                        <td>Credit Card Payment</td>
                        <td>50.00 </td>
                        <td>Bank Transfer</td>
                        <td>Paying my credit card debt</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Transactions