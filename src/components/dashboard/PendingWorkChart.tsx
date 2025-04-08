import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Dummy data for pending work
const data = {
  labels: ['High Priority', 'Medium Priority', 'Low Priority'],
  datasets: [
    {
      data: [4, 8, 12],
      backgroundColor: ['#FF5252', '#FFC107', '#4CAF50'],
      borderColor: ['#FF5252', '#FFC107', '#4CAF50'],
      borderWidth: 1,
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
      text: 'Pending Work',
    },
  },
}

const PendingWorkChart = () => {
  return (
    <div className="chart-container">
      <h2>Pending Work</h2>
      <div className="chart">
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default PendingWorkChart