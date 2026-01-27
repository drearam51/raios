import React, { useState } from 'react'
import TreeGrid from './components/TreeGrid'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="app">
      {activeTab === 'treegrid' ? (
        <>
          <header className="app-header">
            <div className="header-content">
              <h1>RAIOS - TreeGrid Editable</h1>
              <p>Tabla jerárquica con celdas editables y organización</p>
            </div>
            <nav className="app-nav">
              <button 
                className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`nav-tab ${activeTab === 'treegrid' ? 'active' : ''}`}
                onClick={() => setActiveTab('treegrid')}
              >
                TreeGrid
              </button>
            </nav>
          </header>
          <main className="app-main">
            <TreeGrid />
          </main>
        </>
      ) : (
        <>
          <nav className="dashboard-nav">
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-tab ${activeTab === 'treegrid' ? 'active' : ''}`}
              onClick={() => setActiveTab('treegrid')}
            >
              TreeGrid
            </button>
          </nav>
          <Dashboard />
        </>
      )}
    </div>
  )
}

export default App
