const selectorContainerStyle = {
  marginBottom: '20px',
  padding: '16px',
  background: '#f9fafb',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
}

const experimentGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '10px',
  marginTop: '10px',
}

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px',
  background: '#fff',
  borderRadius: '4px',
  border: '1px solid #d1d5db',
  cursor: 'pointer',
}

const checkboxLabelActiveStyle = {
  ...checkboxLabelStyle,
  borderColor: '#4f46e5',
  background: '#eef2ff',
  color: '#4f46e5',
}

const checkboxStyle = {
  width: '16px',
  height: '16px',
  cursor: 'pointer',
}

const ExperimentSelector = ({ experiments, selectedExperiments, onToggle }) => {
  return (
    <div style={selectorContainerStyle}>
      <h3 style={{ margin: '0 0 5px 0', color: '#374151', fontSize: '1.3rem' }}>
        Select Experiments to Compare:
      </h3>
      <p style={{ color: '#6b7280', margin: '0', fontSize: '0.9rem' }}>
        Choose one or more experiments to visualize
      </p>
      <div style={experimentGridStyle}>
        {experiments.map((exp) => {
          const isSelected = selectedExperiments.includes(exp)
          return (
            <label
              key={exp}
              style={isSelected ? checkboxLabelActiveStyle : checkboxLabelStyle}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(exp)}
                style={checkboxStyle}
              />
              <span>{exp}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default ExperimentSelector
