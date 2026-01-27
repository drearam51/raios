import React from 'react'
import './DashboardHeader.css'

function DashboardHeader({ onMenuClick, sidebarCollapsed }) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick}>
          <span className="hamburger-icon">☰</span>
        </button>
      </div>
      <div className="header-right">
        <div className="header-icons">
          <button className="header-icon" title="Desktop">
            <span>🖥️</span>
          </button>
          <button className="header-icon" title="Mobile">
            <span>📱</span>
          </button>
          <button className="header-icon" title="Search">
            <span>🔍</span>
          </button>
          <button className="header-icon" title="Mail">
            <span>✉️</span>
          </button>
          <button className="header-icon" title="Help">
            <span>❓</span>
          </button>
          <button className="header-icon" title="Settings">
            <span>⚙️</span>
          </button>
        </div>
        <div className="header-profile">
          <span className="profile-name">Goff Smith</span>
          <div className="profile-avatar">
            <span>GS</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
