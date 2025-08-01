import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const chartContainerStyle = {
  marginTop: '20px',
  padding: '20px',
  background: '#fff',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
}

const emptyStateStyle = {
  padding: '40px 10px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: '1rem',
  background: '#f9fafb',
  borderRadius: '6px',
  border: '1px dashed #d1d5db',
}

const chartWrapperStyle = {
  width: '100%',
  height: '400px',
  marginTop: '16px',
}

const MetricsChart = ({ data, selectedExperiments, selectedMetric }) => {
  if (!data.length || !selectedExperiments.length || !selectedMetric) {
    return (
      <div style={chartContainerStyle}>
        <div style={emptyStateStyle}>
          <h3 style={{ margin: '0 0 10px 0' }}>No Data to Display</h3>
          <p style={{ margin: '0' }}>
            Upload a CSV file and select experiments to get started
          </p>
        </div>
      </div>
    )
  }

  const relevantData = data.filter(
    (row) =>
      row.metric_name === selectedMetric &&
      selectedExperiments.includes(row.experiment_id)
  )

  const chartDataMap = {}
  relevantData.forEach((row) => {
    if (!chartDataMap[row.step]) {
      chartDataMap[row.step] = { step: row.step }
    }
    chartDataMap[row.step][row.experiment_id] = row.value
  })

  const sortedChartData = Object.values(chartDataMap).sort(
    (a, b) => a.step - b.step
  )

  const colorPalette = [
    '#6366f1',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#06b6d4',
    '#ef4444',
    '#84cc16',
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p
            style={{ margin: '0 0 8px 0', fontWeight: '600' }}
          >{`Step: ${label}`}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{
                margin: '4px 0',
                color: entry.color,
                fontWeight: '500',
              }}
            >
              {`${entry.dataKey}: ${entry.value?.toFixed(4)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div style={chartContainerStyle}>
      <h3
        style={{
          margin: '0 0 10px 0',
          color: '#374151',
          fontSize: '1.4rem',
          fontWeight: '600',
        }}
      >
        {selectedMetric} Performance
      </h3>
      <p style={{ color: '#6b7280', margin: '0', fontSize: '0.9rem' }}>
        Comparing {selectedExperiments.length} experiment
        {selectedExperiments.length !== 1 ? 's' : ''}
      </p>
      <div style={chartWrapperStyle}>
        <ResponsiveContainer>
          <LineChart
            data={sortedChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="step"
              stroke="#6b7280"
              fontSize={12}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {selectedExperiments.map((exp, index) => (
              <Line
                key={exp}
                type="monotone"
                dataKey={exp}
                stroke={colorPalette[index % colorPalette.length]}
                strokeWidth={3}
                dot={{
                  fill: colorPalette[index % colorPalette.length],
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  stroke: colorPalette[index % colorPalette.length],
                  strokeWidth: 2,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MetricsChart
