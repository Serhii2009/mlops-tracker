import React, { useState, useEffect } from 'react'
import FileUploader from './components/FileUploader'
import ExperimentSelector from './components/ExperimentSelector'
import MetricsChart from './components/MetricsChart'

const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  minHeight: '90vh',
}

const titleStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '2rem',
  fontWeight: '600',
  color: '#333',
}

const metricSelectorStyle = {
  marginBottom: '20px',
  padding: '16px',
  background: '#f9fafb',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
}

const selectStyle = {
  padding: '10px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #d1d5db',
  background: '#fff',
  minWidth: '180px',
  cursor: 'pointer',
}

function App() {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem('experimentTrackerState')
    return savedState
      ? JSON.parse(savedState)
      : {
          experimentData: [],
          availableExperiments: [],
          availableMetrics: [],
          activeExperiments: [],
          currentMetric: '',
        }
  })

  useEffect(() => {
    localStorage.setItem('experimentTrackerState', JSON.stringify(state))
  }, [state])

  const processUploadedData = (csvData) => {
    const experimentIds = [...new Set(csvData.map((row) => row.experiment_id))]
    const metricNames = [...new Set(csvData.map((row) => row.metric_name))]

    setState((prev) => ({
      ...prev,
      experimentData: csvData,
      availableExperiments: experimentIds,
      availableMetrics: metricNames,
      activeExperiments:
        prev.activeExperiments.length === 0 && experimentIds.length > 0
          ? [experimentIds[0]]
          : prev.activeExperiments.filter((exp) => experimentIds.includes(exp)),
      currentMetric:
        prev.currentMetric || (metricNames.length > 0 ? metricNames[0] : ''),
    }))
  }

  const handleExperimentToggle = (expId) => {
    setState((prev) => ({
      ...prev,
      activeExperiments: prev.activeExperiments.includes(expId)
        ? prev.activeExperiments.filter((id) => id !== expId)
        : [...prev.activeExperiments, expId],
    }))
  }

  const handleMetricChange = (metric) => {
    setState((prev) => ({
      ...prev,
      currentMetric: metric,
    }))
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>MLOps Experiment Tracker</h1>

      <FileUploader onDataLoad={processUploadedData} />

      {state.availableExperiments.length > 0 && (
        <>
          <div style={metricSelectorStyle}>
            <h3 style={{ margin: '0 0 12px 0', color: '#374151' }}>
              Choose Metric:
            </h3>
            <select
              value={state.currentMetric}
              onChange={(e) => handleMetricChange(e.target.value)}
              style={selectStyle}
            >
              {state.availableMetrics.map((metric) => (
                <option key={metric} value={metric}>
                  {metric}
                </option>
              ))}
            </select>
          </div>

          <ExperimentSelector
            experiments={state.availableExperiments}
            selectedExperiments={state.activeExperiments}
            onToggle={handleExperimentToggle}
          />

          <MetricsChart
            data={state.experimentData}
            selectedExperiments={state.activeExperiments}
            selectedMetric={state.currentMetric}
          />
        </>
      )}
    </div>
  )
}

export default App
