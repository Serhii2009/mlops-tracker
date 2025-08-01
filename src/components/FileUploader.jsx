import { useState } from 'react'

const uploaderContainerStyle = {
  marginBottom: '20px',
  padding: '20px',
  border: '2px dashed #d1d5db',
  borderRadius: '8px',
  textAlign: 'center',
  background: '#f3f4f6',
  cursor: 'pointer',
}

const uploaderActiveStyle = {
  ...uploaderContainerStyle,
  background: '#e0e7ff',
  borderColor: '#e56646ff',
}

const fileInputStyle = {
  margin: '12px 0',
  padding: '10px 20px',
  fontSize: '14px',
  borderRadius: '4px',
  border: 'none',
  background: '#e57e46ff',
  color: '#fff',
  cursor: 'pointer',
}

const FileUploader = ({ onDataLoad }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)

  const processFile = async (file) => {
    if (!file || !file.name.endsWith('.csv')) {
      setUploadError('CSV files only please')
      return
    }

    setIsProcessing(true)
    setUploadError('')

    try {
      const fileContent = await file.text()
      const rows = fileContent.trim().split('\n')

      const nonEmptyRows = rows.filter((row) => row.trim() !== '')

      if (nonEmptyRows.length < 2) {
        throw new Error('File must contain at least a header and one data row')
      }

      const headers = nonEmptyRows[0].split(',')

      const parsedData = nonEmptyRows.slice(1).map((row, index) => {
        const values = row.split(',')
        if (values.length < 4) {
          throw new Error(`Row ${index + 2} must have at least 4 values`)
        }
        return {
          experiment_id: values[0].trim(),
          metric_name: values[1].trim(),
          step: parseInt(values[2].trim()),
          value: parseFloat(values[3].trim()),
          ...(values.length > 4 && {
            extra_data: values.slice(4).map((v) => v.trim()),
          }),
        }
      })

      onDataLoad(parsedData)
    } catch (err) {
      setUploadError(err.message || 'Failed to process file')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  return (
    <div
      style={isDragOver ? uploaderActiveStyle : uploaderContainerStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.querySelector('input[type="file"]').click()}
    >
      <h3>Upload CSV Data</h3>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Drag & drop your CSV file here or click to browse
      </p>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => processFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <button style={fileInputStyle}>Select CSV File</button>
      {isProcessing && (
        <p
          style={{ color: '#6366f1', fontWeight: '500', margin: '15px 0 0 0' }}
        >
          Processing your data...
        </p>
      )}
      {uploadError && (
        <p
          style={{ color: '#ef4444', fontWeight: '500', margin: '15px 0 0 0' }}
        >
          {uploadError}
        </p>
      )}
    </div>
  )
}

export default FileUploader
