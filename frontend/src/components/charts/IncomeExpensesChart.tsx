
// Importing ChartJS  to create the charts:
import {Line} from "react-chartjs-2"
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// Plain object {Test}:

const chartData = {
    labels:["Jan","Feb","Mar","Apr","May"],
    datasets: [
        {
            label:"Income",
            data: [2400,2800,3000,3400,3000],
            borderColor: "#4CAF50",
            backgroundColor: "#23232323",
            tension: 0.5
        },
        {
            label:"Expenses",
            data: [1500,1800,2000,1600,1700],
            borderColor: "#E53800",
            backgroundColor: "#23232323",
            tension: 0.5
        }
    ]
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend : {
            position: "top" as const,
            labels: { color:"#f8f8f8"}
        },
        title: {
            display : true,
            text: "Income vs Expenses",
            color: "#f8f8f8"
        }
    },
    scales: {
        x: {ticks: {color: "#aaa" , grid: {color:"#2323"}}},
        y: {ticks: {color: "#aaa", grid: {color:"#2323"}}}
    }
}

function IncomeExpensesChart(){
    return (
        <div className="bg-[#1E1E1E]  p-6 rounded-2xl h-130 w-full mx-20" >
            <Line data={chartData} options={chartOptions}/>
        </div>
    )
}


export default IncomeExpensesChart
