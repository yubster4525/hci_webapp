import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'

ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Tooltip, 
  Legend
)

// Dummy data for completed work
const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Bugs Fixed',
      data: [20, 15, 12, 8],
      backgroundColor: '#8884d8',
    },
    {
      label: 'Features Implemented',
      data: [5, 8, 10, 12],
      backgroundColor: '#82ca9d',
    },
    {
      label: 'Documents Updated',
      data: [7, 5, 8, 10],
      backgroundColor: '#ffc658',
    },
  ],
}

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Completed Work',
    },
  },
}

const CompletedWorkChart = () => {
  return (
    <div className="chart-container">
      <h2>Completed Work</h2>
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default CompletedWorkChart