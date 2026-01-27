import React, { useState } from 'react'
import EditableCell from './EditableCell'
import './TreeNode.css'

function TreeNode({ node, level, columnHeaders, onCellEdit, onToggleExpand, onAddRow }) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [nodeName, setNodeName] = useState(node.name)

  const hasChildren = node.children && node.children.length > 0
  const hasData = node.data && node.data.length > 0

  const handleNameChange = (newName) => {
    setNodeName(newName)
    setIsEditingName(false)
  }

  const indent = level * 24

  return (
    <>
      <div className="treenode-row">
        <div
          className="treenode-cell treenode-name-cell"
          style={{ paddingLeft: `${indent + 12}px` }}
        >
          <div className="treenode-name-content">
            {hasChildren && (
              <button
                className="treenode-toggle"
                onClick={() => onToggleExpand(node.id)}
                aria-label={node.expanded ? 'Colapsar' : 'Expandir'}
              >
                <span className={`treenode-icon ${node.expanded ? 'expanded' : ''}`}>
                  ▶
                </span>
              </button>
            )}
            {!hasChildren && <span className="treenode-spacer" />}
            
            {isEditingName ? (
              <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                onBlur={() => handleNameChange(nodeName)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNameChange(nodeName)
                  } else if (e.key === 'Escape') {
                    setNodeName(node.name)
                    setIsEditingName(false)
                  }
                }}
                className="treenode-name-input"
                autoFocus
              />
            ) : (
              <span
                className="treenode-name"
                onClick={() => setIsEditingName(true)}
                title="Click para editar"
              >
                {nodeName}
              </span>
            )}

            {hasChildren && (
              <button
                className="treenode-add-btn"
                onClick={() => onAddRow(node.id)}
                title="Agregar item hijo"
              >
                +
              </button>
            )}
          </div>
        </div>

        {hasData ? (
          columnHeaders.map((_, index) => (
            <div key={index} className="treenode-cell treenode-data-cell">
              <EditableCell
                value={node.data[index]?.value || ''}
                onChange={(newValue) =>
                  onCellEdit(node.id, node.data[index].id, newValue)
                }
              />
            </div>
          ))
        ) : (
          columnHeaders.map((_, index) => (
            <div key={index} className="treenode-cell treenode-data-cell empty">
              <span className="treenode-empty">-</span>
            </div>
          ))
        )}
      </div>

      {hasChildren && node.expanded && (
        <div className="treenode-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              columnHeaders={columnHeaders}
              onCellEdit={onCellEdit}
              onToggleExpand={onToggleExpand}
              onAddRow={onAddRow}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default TreeNode
