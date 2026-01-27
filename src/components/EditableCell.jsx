import React, { useState } from 'react'
import './EditableCell.css'

function EditableCell({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  React.useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleBlur = () => {
    onChange(editValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onChange(editValue)
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      setEditValue(value)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <input
        type="text"
        className="editable-cell-input"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    )
  }

  return (
    <div
      className="editable-cell"
      onClick={() => setIsEditing(true)}
      title="Click para editar"
    >
      {value || <span className="editable-cell-placeholder">Click para editar</span>}
    </div>
  )
}

export default EditableCell
