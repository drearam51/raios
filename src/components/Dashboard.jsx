import React, { useState } from 'react'
import Sidebar from './Sidebar'
import DashboardContent from './DashboardContent'
import DashboardHeader from './DashboardHeader'
import './Dashboard.css'

// Datos de ejemplo para diferentes secciones
const dashboardData = {
  dashboard: {
    title: 'Dashboard',
    data: [
      { id: 1, metric: 'Usuarios Activos', value: '1,234', change: '+12%', trend: 'up' },
      { id: 2, metric: 'Ventas Totales', value: '$45,678', change: '+8%', trend: 'up' },
      { id: 3, metric: 'Órdenes Pendientes', value: '89', change: '-5%', trend: 'down' },
      { id: 4, metric: 'Tasa de Conversión', value: '3.2%', change: '+0.5%', trend: 'up' }
    ]
  },
  email: {
    title: 'Email - Inbox',
    columns: ['From', 'Title', 'Received'],
    data: [
      { id: 1, from: 'Estela Gibbs', title: 'Cillum ad ad ut velit.', received: '09/25/2014', favorite: true, attachment: true },
      { id: 2, from: 'Constance Flores', title: 'Consequat officia dolor sit labore aliquip elit enim sunt id magna.', received: '08/16/2014', favorite: false, attachment: false },
      { id: 3, from: 'Tammi Merrill', title: 'Lorem ipsum dolor sit amet consectetur.', received: '09/20/2014', favorite: true, attachment: true },
      { id: 4, from: 'Hannah Robertson', title: 'Adipiscing elit sed do eiusmod tempor.', received: '08/15/2014', favorite: false, attachment: false },
      { id: 5, from: 'Rhea Clemons', title: 'Incididunt ut labore et dolore magna.', received: '09/18/2014', favorite: true, attachment: true }
    ]
  },
  compose: {
    title: 'Compose Email',
    columns: ['To', 'Subject', 'Status'],
    data: [
      { id: 1, to: 'user@example.com', subject: 'Draft email', status: 'Draft' }
    ]
  },
  inbox: {
    title: 'Inbox',
    columns: ['From', 'Title', 'Received'],
    data: [
      { id: 1, from: 'Estela Gibbs', title: 'Cillum ad ad ut velit.', received: '09/25/2014', favorite: true, attachment: true },
      { id: 2, from: 'Constance Flores', title: 'Consequat officia dolor sit labore aliquip elit enim sunt id magna.', received: '08/16/2014', favorite: false, attachment: false },
      { id: 3, from: 'Tammi Merrill', title: 'Lorem ipsum dolor sit amet consectetur.', received: '09/20/2014', favorite: true, attachment: true }
    ]
  },
  sent: {
    title: 'Sent Mail',
    columns: ['To', 'Subject', 'Sent'],
    data: [
      { id: 1, to: 'client@example.com', subject: 'Proposal for Q1', sent: '01/20/2025', favorite: false, attachment: true },
      { id: 2, to: 'team@example.com', subject: 'Meeting notes', sent: '01/19/2025', favorite: true, attachment: false }
    ]
  },
  spam: {
    title: 'Spam',
    columns: ['From', 'Title', 'Received'],
    data: [
      { id: 1, from: 'spam@example.com', title: 'You won a prize!', received: '01/18/2025', favorite: false, attachment: false }
    ]
  },
  trash: {
    title: 'Trash',
    columns: ['From', 'Title', 'Received'],
    data: [
      { id: 1, from: 'Estela Gibbs', title: 'Cillum ad ad ut velit.', received: '09/25/2014', favorite: true, attachment: true },
      { id: 2, from: 'Constance Flores', title: 'Consequat officia dolor sit labore aliquip elit enim sunt id magna.', received: '08/16/2014', favorite: false, attachment: false },
      { id: 3, from: 'Tammi Merrill', title: 'Lorem ipsum dolor sit amet consectetur.', received: '09/20/2014', favorite: true, attachment: true },
      { id: 4, from: 'Hannah Robertson', title: 'Adipiscing elit sed do eiusmod tempor.', received: '08/15/2014', favorite: false, attachment: false },
      { id: 5, from: 'Rhea Clemons', title: 'Incididunt ut labore et dolore magna.', received: '09/18/2014', favorite: true, attachment: true },
      { id: 6, from: 'Petty Caldwell', title: 'Ut enim ad minim veniam quis nostrud.', received: '09/17/2014', favorite: false, attachment: false },
      { id: 7, from: 'Daniel Lawrence', title: 'Exercitation ullamco laboris nisi ut.', received: '09/16/2014', favorite: true, attachment: true },
      { id: 8, from: 'Newman Atkins', title: 'Aliquip ex ea commodo consequat.', received: '09/15/2014', favorite: false, attachment: false },
      { id: 9, from: 'Marcella Wade', title: 'Duis aute irure dolor in reprehenderit.', received: '09/14/2014', favorite: true, attachment: true },
      { id: 10, from: 'Jessica Warren', title: 'In voluptate velit esse cillum dolore.', received: '09/13/2014', favorite: false, attachment: false },
      { id: 11, from: 'Nanette Gutierrez', title: 'Eu fugiat nulla pariatur excepteur sint.', received: '09/12/2014', favorite: true, attachment: false },
      { id: 12, from: 'Adam Gullner', title: 'Occaecat cupidatat non proident sunt.', received: '09/11/2014', favorite: false, attachment: true },
      { id: 13, from: 'Chakra Gibson', title: 'In culpa qui officia deserunt mollit.', received: '09/10/2014', favorite: true, attachment: false },
      { id: 14, from: 'Jonathan Soul', title: 'Anim id est laborum sed ut perspiciatis.', received: '09/09/2014', favorite: false, attachment: true },
      { id: 15, from: 'Shawn Leon', title: 'Unde omnis iste natus error sit.', received: '09/08/2014', favorite: true, attachment: false },
      { id: 16, from: 'Goff Smith', title: 'Voluptatem accusantium doloremque.', received: '09/07/2014', favorite: false, attachment: true },
      { id: 17, from: 'Mcgowan Berg', title: 'Laudantium totam rem aperiam eaque.', received: '09/06/2014', favorite: true, attachment: false },
      { id: 18, from: 'Luz Mccullough', title: 'Ipsa quae ab illo inventore veritatis.', received: '09/05/2014', favorite: false, attachment: true },
      { id: 19, from: 'Hebert Nielsen', title: 'Et quasi architecto beatae vitae dicta.', received: '09/04/2014', favorite: true, attachment: false },
      { id: 20, from: 'Francisca Clayton', title: 'Sunt explicabo nemo enim ipsam.', received: '09/03/2014', favorite: false, attachment: true }
    ]
  },
  profile: {
    title: 'Profile',
    columns: ['Campo', 'Valor', 'Última Actualización'],
    data: [
      { id: 1, campo: 'Nombre', valor: 'Goff Smith', actualizacion: '01/15/2025' },
      { id: 2, campo: 'Email', valor: 'goff.smith@example.com', actualizacion: '01/15/2025' },
      { id: 3, campo: 'Departamento', valor: 'Desarrollo', actualizacion: '12/20/2024' },
      { id: 4, campo: 'Rol', valor: 'Administrador', actualizacion: '01/10/2025' }
    ]
  },
  search: {
    title: 'Search Results',
    columns: ['Resultado', 'Categoría', 'Relevancia'],
    data: [
      { id: 1, resultado: 'Documento de Proyecto RAIOS', categoria: 'Documentos', relevancia: '95%' },
      { id: 2, resultado: 'Reporte Mensual Enero', categoria: 'Reportes', relevancia: '87%' },
      { id: 3, resultado: 'Reunión de Equipo', categoria: 'Calendario', relevancia: '72%' }
    ]
  },
  faq: {
    title: 'FAQ',
    columns: ['Pregunta', 'Categoría', 'Estado'],
    data: [
      { id: 1, pregunta: '¿Cómo configurar el TreeGrid?', categoria: 'Técnico', estado: 'Activo' },
      { id: 2, pregunta: '¿Dónde encontrar la documentación?', categoria: 'General', estado: 'Activo' },
      { id: 3, pregunta: '¿Cómo exportar datos?', categoria: 'Funcionalidad', estado: 'Pendiente' }
    ]
  },
  pages: {
    title: 'Pages',
    columns: ['Página', 'Ruta', 'Última Modificación'],
    data: [
      { id: 1, pagina: 'Dashboard', ruta: '/dashboard', modificacion: '01/20/2025' },
      { id: 2, pagina: 'TreeGrid', ruta: '/treegrid', modificacion: '01/19/2025' },
      { id: 3, pagina: 'Email', ruta: '/email', modificacion: '01/18/2025' }
    ]
  },
  widgets: {
    title: 'Widgets',
    columns: ['Widget', 'Tipo', 'Estado'],
    data: [
      { id: 1, widget: 'Gráfico de Ventas', tipo: 'Chart', estado: 'Activo' },
      { id: 2, widget: 'Lista de Tareas', tipo: 'List', estado: 'Activo' },
      { id: 3, widget: 'Calendario', tipo: 'Calendar', estado: 'Inactivo' }
    ]
  },
  forms: {
    title: 'Forms',
    columns: ['Formulario', 'Campos', 'Envíos'],
    data: [
      { id: 1, formulario: 'Contacto', campos: 5, envios: 234 },
      { id: 2, formulario: 'Registro', campos: 8, envios: 156 },
      { id: 3, formulario: 'Feedback', campos: 3, envios: 89 }
    ]
  },
  charts: {
    title: 'Charts',
    columns: ['Gráfico', 'Tipo', 'Datos'],
    data: [
      { id: 1, grafico: 'Ventas Mensuales', tipo: 'Línea', datos: '1,234 puntos' },
      { id: 2, grafico: 'Distribución Regional', tipo: 'Torta', datos: '12 regiones' },
      { id: 3, grafico: 'Comparativo Anual', tipo: 'Barras', datos: '24 meses' }
    ]
  }
}

function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const currentData = dashboardData[activeSection] || dashboardData.dashboard

  return (
    <div className="dashboard-container">
      <DashboardHeader 
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      <div className="dashboard-body">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
        />
        <DashboardContent
          data={currentData}
          section={activeSection}
        />
      </div>
    </div>
  )
}

export default Dashboard
