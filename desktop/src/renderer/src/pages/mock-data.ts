// mock-data.ts
import { Employee, Payroll } from '../types'

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    baseSalary: 800.0,
    startDate: '2023-01-15',
    position: 'Desarrollador Senior',
    department: 'Tecnología'
  },
  {
    id: '2',
    name: 'María García',
    baseSalary: 1200.0,
    startDate: '2022-06-20',
    position: 'Gerente de Proyecto',
    department: 'Administración'
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    baseSalary: 600.0,
    startDate: '2023-03-10',
    position: 'Analista Junior',
    department: 'Tecnología'
  },
  {
    id: '4',
    name: 'Ana Martínez',
    baseSalary: 900.0,
    startDate: '2022-12-01',
    position: 'Diseñadora UX',
    department: 'Diseño'
  },
  {
    id: '5',
    name: 'Roberto Sánchez',
    baseSalary: 750.0,
    startDate: '2023-08-15',
    position: 'Desarrollador Frontend',
    department: 'Tecnología'
  }
]

// Ejemplo de datos de planilla para referencia
export const mockPayrolls: Payroll[] = []
