import Navbar from "../components/layout/Navbar"
import {useEffect, useState} from "react"

interface Transactions{
    txn_date: string;
    type: string;
    category: string;
    amount: number;
    payment_method: string;
    notes: string;
}



function Transactions(){
    const [data, setData] = useState<Transactions[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("http://192.168.0.168:5000/transactions")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("error fetching data:", err))
        .finally(() => setLoading(false));
    }, [])

    return (
        <>
            <Navbar />
            <h1 className="title text-5xl mx-5 my-5">Transactions</h1>
            <div className="transactions-container grid justify-center ">
                {/* This is a test to design the table later it will change {AI help used for testing here, the real design will come later after db is connected}*/}
                <button className=" button inline-flex items-center justify-self-end px-6 py-2 rounded-lg
                            bg-blue-700 text-white font-semibold
                            hover:bg-blue-700 active:bg-blue-800
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            transition" onClick = {() => console.log('clicked')}>
                                Add
                </button>
                <div className="overflow-x-auto bg-[#1E1E1E] rounded-lg shadow-md">
                    <table className="min-w-full border border-[#1E1E1E]">
                        <thead>
                            <tr className="bg-[#1E1E1E] text-gray-200">
                                <th className="py-3 px-4 text-left border-b">Date</th>
                                <th className="py-3 px-4 text-left border-b">Type</th>
                                <th className="py-3 px-4 text-left border-b">Category</th>
                                <th className="py-3 px-4 text-left border-b">Amount</th>
                                <th className="py-3 px-4 text-left border-b">Method</th>
                                <th className="py-3 px-4 text-left border-b">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((elements, index) => (<tr key={index} className="bg-[#1E1E1E] text-gray-300">
                                <td className="py-3 px-4 border-b">{elements.txn_date}</td>
                                <td className="py-3 px-4 border-b">{elements.type}</td>
                                <td className="py-3 px-4 border-b">{elements.category}</td>
                                <td className="py-3 px-4 border-b">{elements.amount}</td>
                                <td className="py-3 px-4 border-b">{elements.payment_method}</td>
                                <td className="py-3 px-4 border-b">{elements.notes}</td>
                            </tr>))}
                            
                        </tbody>
                        
                    </table>
                    
                </div>
            </div>
        </>
    )
}

export default Transactions