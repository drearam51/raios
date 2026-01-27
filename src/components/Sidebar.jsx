import React from 'react'
import './Sidebar.css'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: 'NEW' },
  { id: 'email', label: 'Email', icon: '✉️', badge: 'HOT', submenu: [
    { id: 'compose', label: 'Compose' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'sent', label: 'Sent Mail' },
    { id: 'spam', label: 'Spam' },
    { id: 'trash', label: 'Trash' }
  ]},
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'search', label: 'Search results', icon: '🔍' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'pages', label: 'Pages', icon: '📄' },
  { id: 'widgets', label: 'Widgets', icon: '🧩' },
  { id: 'forms', label: 'Forms', icon: '📝' },
  { id: 'charts', label: 'Charts', icon: '📈' }
]

const friends = [
  { name: 'Torres Tran', online: true },
  { name: 'Hines Moon', online: true },
  { name: 'Molina Wilkerson', online: false },
  { name: 'Suzette Powell', online: true },
  { name: 'Oneill Franklin', online: false },
  { name: 'Branch Allison', online: true }
]

function Sidebar({ activeSection, onSectionChange, collapsed }) {
  const [expandedItems, setExpandedItems] = React.useState(['email'])

  const toggleExpand = (itemId) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleItemClick = (itemId) => {
    onSectionChange(itemId)
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">Sencha</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <div key={item.id} className="nav-section">
            <div
              className={`nav-item ${activeSection === item.id ? 'active' : ''} ${item.submenu ? 'has-submenu' : ''}`}
              onClick={() => {
                if (item.submenu) {
                  toggleExpand(item.id)
                } else {
                  handleItemClick(item.id)
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge ${item.badge.toLowerCase()}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && (
                    <span className={`nav-arrow ${expandedItems.includes(item.id) ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  )}
                </>
              )}
            </div>
            {item.submenu && expandedItems.includes(item.id) && !collapsed && (
              <div className="submenu">
                {item.submenu.map(subItem => (
                  <div
                    key={subItem.id}
                    className={`submenu-item ${activeSection === subItem.id ? 'active' : ''}`}
                    onClick={() => handleItemClick(subItem.id)}
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-friends">
          <div className="friends-header">Friends</div>
          <div className="friends-list">
            {friends.map((friend, index) => (
              <div key={index} className="friend-item">
                <span className={`friend-status ${friend.online ? 'online' : 'offline'}`}></span>
                <span className="friend-name">{friend.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
