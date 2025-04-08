import { Line } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'

ChartJS.register(
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend
)

// Dummy data for performance metrics
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Productivity',
      data: [65, 68, 70, 74, 75, 78],
      borderColor: '#8884d8',
      backgroundColor: 'rgba(136, 132, 216, 0.5)',
      tension: 0.2,
    },
    {
      label: 'Efficiency',
      data: [55, 59, 63, 67, 70, 72],
      borderColor: '#82ca9d',
      backgroundColor: 'rgba(130, 202, 157, 0.5)',
      tension: 0.2,
    },
    {
      label: 'Quality',
      data: [70, 72, 75, 78, 80, 82],
      borderColor: '#ff7300',
      backgroundColor: 'rgba(255, 115, 0, 0.5)',
      tension: 0.2,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Performance Metrics',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
}

const PerformanceChart = () => {
  return (
    <div className="chart-container">
      <h2>Performance Metrics</h2>
      <div className="chart">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default PerformanceChart