import React from 'react'
import './DashboardContent.css'

function DashboardContent({ data, section }) {
  if (!data) {
    return (
      <div className="dashboard-content">
        <div className="content-empty">No hay datos disponibles</div>
      </div>
    )
  }

  // Si es dashboard, mostrar métricas
  if (section === 'dashboard') {
    return (
      <div className="dashboard-content">
        <div className="content-header">
          <h2>{data.title}</h2>
        </div>
        <div className="metrics-grid">
          {data.data.map(metric => (
            <div key={metric.id} className="metric-card">
              <div className="metric-label">{metric.metric}</div>
              <div className="metric-value">{metric.value}</div>
              <div className={`metric-change ${metric.trend}`}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Para otras secciones, mostrar tabla
  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>{data.title}</h2>
      </div>
      <div className="content-table-wrapper">
        <table className="content-table">
          <thead>
            <tr>
              <th className="table-checkbox">
                <input type="checkbox" />
              </th>
              <th className="table-favorite">
                <span className="icon-heart">♡</span>
              </th>
              {data.columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                <td className="table-checkbox">
                  <input type="checkbox" />
                </td>
                <td className="table-favorite">
                  <span className={`icon-heart ${row.favorite ? 'favorited' : ''}`}>
                    {row.favorite ? '♥' : '♡'}
                  </span>
                </td>
                {data.columns.map((column, colIndex) => {
                  // Buscar el valor en el row que coincida con la columna
                  const columnKey = column.toLowerCase().replace(/\s+/g, '')
                  let cellValue = row[columnKey]
                  
                  // Si no encuentra por clave exacta, buscar por coincidencia parcial
                  if (!cellValue) {
                    const matchingKey = Object.keys(row).find(k => 
                      k.toLowerCase().includes(columnKey) || 
                      columnKey.includes(k.toLowerCase())
                    )
                    cellValue = matchingKey ? row[matchingKey] : null
                  }
                  
                  // Si aún no hay valor, buscar por nombre de campo común
                  if (!cellValue) {
                    if (column.toLowerCase().includes('from') || column.toLowerCase().includes('de')) {
                      cellValue = row.from || row.de || '-'
                    } else if (column.toLowerCase().includes('to') || column.toLowerCase().includes('para')) {
                      cellValue = row.to || row.para || '-'
                    } else if (column.toLowerCase().includes('title') || column.toLowerCase().includes('título') || column.toLowerCase().includes('subject')) {
                      cellValue = row.title || row.título || row.subject || '-'
                    } else if (column.toLowerCase().includes('received') || column.toLowerCase().includes('recibido') || column.toLowerCase().includes('sent')) {
                      cellValue = row.received || row.recibido || row.sent || '-'
                    } else {
                      cellValue = '-'
                    }
                  }
                  
                  return (
                    <td key={colIndex}>
                      <div className="table-cell-content">
                        {cellValue}
                        {(column.toLowerCase().includes('received') || column.toLowerCase().includes('sent')) && row.attachment && (
                          <span className="attachment-icon" title="Tiene adjunto">📎</span>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardContent
