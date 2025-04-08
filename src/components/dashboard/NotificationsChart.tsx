import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Dummy data for notifications
const data = {
  labels: ['Mentions', 'Deadlines', 'Updates'],
  datasets: [
    {
      data: [8, 4, 12],
      backgroundColor: ['#3F51B5', '#E91E63', '#009688'],
      borderColor: ['#3F51B5', '#E91E63', '#009688'],
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
      text: 'Notifications Overview',
    },
  },
}

const NotificationsChart = () => {
  return (
    <div className="chart-container">
      <h2>Notifications Overview</h2>
      <div className="chart">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default NotificationsChart