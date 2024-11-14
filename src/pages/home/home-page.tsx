import React from 'react'
import { Link } from 'react-router-dom'
import { Users, FileSpreadsheet, LayoutDashboard, FileBarChart, LucideIcon } from 'lucide-react'
import { MainLayout } from '../../layouts/main-layout'

interface ModuleCardProps {
  title: string
  description: string
  icon: LucideIcon
  to: string
  color: string
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon: Icon, to, color }) => (
  <Link
    to={to}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
  >
    <div className={`w-14 h-14 ${color} rounded-lg flex items-center justify-center mb-4`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </Link>
)

interface Module {
  title: string
  description: string
  icon: LucideIcon
  to: string
  color: string
}

const HomePage: React.FC = () => {
  const modules: Module[] = [
    {
      title: 'Panel de Control',
      description: 'Visualiza estadísticas y métricas importantes del sistema',
      icon: LayoutDashboard,
      to: '/dashboard',
      color: 'bg-blue-500'
    },
    {
      title: 'Empleados',
      description: 'Gestiona la información de tu personal',
      icon: Users,
      to: '/empleados',
      color: 'bg-green-500'
    },
    {
      title: 'Planillas',
      description: 'Administra los pagos y planillas del personal',
      icon: FileSpreadsheet,
      to: '/planillas',
      color: 'bg-purple-500'
    },
    {
      title: 'Reportes',
      description: 'Genera informes y análisis detallados',
      icon: FileBarChart,
      to: '/reportes',
      color: 'bg-orange-500'
    }
  ]

  return (
    <MainLayout>
      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sistema de Gestión</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} />
          ))}
        </div>
      </main>
    </MainLayout>
  )
}

export default HomePage
