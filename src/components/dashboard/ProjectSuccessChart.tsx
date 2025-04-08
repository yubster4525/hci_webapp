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

// Dummy data for project success/failure
const data = {
  labels: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
  datasets: [
    {
      label: 'Success Rate',
      data: [80, 60, 90, 75, 50],
      backgroundColor: '#4CAF50',
    },
    {
      label: 'Failure Rate',
      data: [20, 40, 10, 25, 50],
      backgroundColor: '#F44336',
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
      max: 100,
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Project Success Rates',
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.dataset.label}: ${context.raw}%`;
        }
      }
    }
  },
}

const ProjectSuccessChart = () => {
  return (
    <div className="chart-container">
      <h2>Project Success Rates</h2>
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default ProjectSuccessChart