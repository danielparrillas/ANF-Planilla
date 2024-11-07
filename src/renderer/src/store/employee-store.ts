import { mockEmployees } from '@renderer/pages/mock-data'
import { Employee } from '@renderer/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EmployeeState {
  employees: Employee[]
  addEmployee: (employee: Employee) => void
  updateEmployee: (employee: Employee) => void
  deleteEmployee: (id: string) => void
  getEmployeeById: (id: string) => Employee | undefined
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: mockEmployees,
      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee]
        })),
      updateEmployee: (employee) =>
        set((state) => ({
          employees: state.employees.map((e) => (e.id === employee.id ? employee : e))
        })),
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((e) => e.id !== id)
        })),
      getEmployeeById: (id) => {
        const state = get()
        return state.employees.find((e) => e.id === id)
      }
    }),
    {
      name: 'employee-storage'
    }
  )
)
