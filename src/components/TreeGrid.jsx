import React, { useState } from 'react'
import TreeNode from './TreeNode'
import './TreeGrid.css'

// Datos de ejemplo con estructura jerárquica
const initialData = [
  {
    id: '1',
    name: 'Categoría Principal 1',
    expanded: true,
    children: [
      {
        id: '1-1',
        name: 'Subcategoría 1.1',
        expanded: false,
        children: [
          {
            id: '1-1-1',
            name: 'Item 1.1.1',
            data: [
              { id: 'col1', value: 'Valor 1' },
              { id: 'col2', value: 'Valor 2' },
              { id: 'col3', value: 'Valor 3' },
              { id: 'col4', value: 'Valor 4' }
            ]
          },
          {
            id: '1-1-2',
            name: 'Item 1.1.2',
            data: [
              { id: 'col1', value: 'Dato A' },
              { id: 'col2', value: 'Dato B' },
              { id: 'col3', value: 'Dato C' },
              { id: 'col4', value: 'Dato D' }
            ]
          }
        ]
      },
      {
        id: '1-2',
        name: 'Subcategoría 1.2',
        expanded: false,
        children: [
          {
            id: '1-2-1',
            name: 'Item 1.2.1',
            data: [
              { id: 'col1', value: 'Info X' },
              { id: 'col2', value: 'Info Y' },
              { id: 'col3', value: 'Info Z' },
              { id: 'col4', value: 'Info W' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Categoría Principal 2',
    expanded: false,
    children: [
      {
        id: '2-1',
        name: 'Subcategoría 2.1',
        expanded: false,
        children: [
          {
            id: '2-1-1',
            name: 'Item 2.1.1',
            data: [
              { id: 'col1', value: 'Test 1' },
              { id: 'col2', value: 'Test 2' },
              { id: 'col3', value: 'Test 3' },
              { id: 'col4', value: 'Test 4' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Categoría Principal 3',
    expanded: false,
    children: []
  }
]

const columnHeaders = ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4']

function TreeGrid() {
  const [data, setData] = useState(initialData)
  const [sortConfig, setSortConfig] = useState({ column: null, direction: null })

  // Función para actualizar datos recursivamente
  const updateNodeData = (nodes, nodeId, fieldId, newValue) => {
    return nodes.map(node => {
      if (node.id === nodeId && node.data) {
        return {
          ...node,
          data: node.data.map(item =>
            item.id === fieldId ? { ...item, value: newValue } : item
          )
        }
      }
      if (node.children) {
        return {
          ...node,
          children: updateNodeData(node.children, nodeId, fieldId, newValue)
        }
      }
      return node
    })
  }

  // Función para toggle de expansión
  const toggleExpanded = (nodes, nodeId) => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded }
      }
      if (node.children) {
        return {
          ...node,
          children: toggleExpanded(node.children, nodeId)
        }
      }
      return node
    })
  }

  const handleCellEdit = (nodeId, fieldId, newValue) => {
    setData(prevData => updateNodeData(prevData, nodeId, fieldId, newValue))
  }

  const handleToggleExpand = (nodeId) => {
    setData(prevData => toggleExpanded(prevData, nodeId))
  }

  const handleSort = (columnIndex) => {
    const direction =
      sortConfig.column === columnIndex && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc'
    setSortConfig({ column: columnIndex, direction })

    // Función recursiva para ordenar todos los nodos hoja
    const sortNodes = (nodes) => {
      return nodes.map(node => {
        if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: sortNodes(node.children)
          }
        }
        return node
      }).sort((a, b) => {
        if (a.children && a.children.length > 0) return 0
        if (b.children && b.children.length > 0) return 0

        const aValue = a.data?.[columnIndex]?.value || ''
        const bValue = b.data?.[columnIndex]?.value || ''

        if (direction === 'asc') {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      })
    }

    setData(prevData => sortNodes(prevData))
  }

  const handleAddRow = (parentId) => {
    const newRow = {
      id: `new-${Date.now()}`,
      name: 'Nuevo Item',
      data: [
        { id: 'col1', value: '' },
        { id: 'col2', value: '' },
        { id: 'col3', value: '' },
        { id: 'col4', value: '' }
      ]
    }

    const addRowToNode = (nodes) => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newRow]
          }
        }
        if (node.children) {
          return {
            ...node,
            children: addRowToNode(node.children)
          }
        }
        return node
      })
    }

    setData(prevData => addRowToNode(prevData))
  }

  return (
    <div className="treegrid-container">
      <div className="treegrid-header">
        <h2>Tabla Jerárquica Editable</h2>
        <div className="treegrid-controls">
          <button
            className="btn btn-primary"
            onClick={() => {
              const newCategory = {
                id: `cat-${Date.now()}`,
                name: 'Nueva Categoría',
                expanded: true,
                children: []
              }
              setData(prevData => [...prevData, newCategory])
            }}
          >
            + Agregar Categoría
          </button>
        </div>
      </div>

      <div className="treegrid-wrapper">
        <div className="treegrid-table">
          <div className="treegrid-header-row">
            <div className="treegrid-cell treegrid-cell-header" style={{ minWidth: '250px' }}>
              Nombre / Item
            </div>
            {columnHeaders.map((header, index) => (
              <div
                key={index}
                className="treegrid-cell treegrid-cell-header treegrid-sortable"
                onClick={() => handleSort(index)}
              >
                {header}
                {sortConfig.column === index && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="treegrid-body">
            {data.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                level={0}
                columnHeaders={columnHeaders}
                onCellEdit={handleCellEdit}
                onToggleExpand={handleToggleExpand}
                onAddRow={handleAddRow}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreeGrid
