// Simple workload heatmap using CSS grid instead of chart.js
// (Chart.js doesn't have a built-in heatmap type)

// Dummy data for workload heatmap
const data = [
  { team: 'Team A', mon: 8, tue: 5, wed: 7, thu: 9, fri: 4 },
  { team: 'Team B', mon: 6, tue: 8, wed: 9, thu: 7, fri: 5 },
  { team: 'Team C', mon: 3, tue: 4, wed: 6, thu: 8, fri: 9 },
  { team: 'Team D', mon: 7, tue: 6, wed: 4, thu: 5, fri: 7 },
]

// Color scale for the heatmap
const getColor = (value: number) => {
  if (value <= 3) return '#E8F5E9' // Very light green
  if (value <= 5) return '#C8E6C9' // Light green
  if (value <= 7) return '#4CAF50' // Medium green
  if (value <= 8) return '#388E3C' // Dark green
  return '#1B5E20' // Very dark green
}

const getTextColor = (value: number) => {
  return value >= 7 ? 'white' : 'black'
}

const WorkloadHeatmap = () => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri']
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  return (
    <div className="chart-container">
      <h2>Team Workload</h2>
      <div className="heatmap">
        <div className="heatmap-header">
          <div className="team-label"></div>
          {dayLabels.map(day => (
            <div key={day} className="day-label">{day}</div>
          ))}
        </div>
        
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="heatmap-row">
            <div className="team-label">{row.team}</div>
            {days.map(day => (
              <div 
                key={day} 
                className="heatmap-cell" 
                style={{ 
                  backgroundColor: getColor(row[day as keyof typeof row] as number),
                  color: getTextColor(row[day as keyof typeof row] as number)
                }}
              >
                {row[day as keyof typeof row]}
              </div>
            ))}
          </div>
        ))}
        
        <div className="heatmap-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#E8F5E9' }}></div>
            <span>Low</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
            <span>Medium</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#1B5E20' }}></div>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkloadHeatmap