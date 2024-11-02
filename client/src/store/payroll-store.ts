// payroll-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Payroll } from '../types'

interface PayrollState {
  payrolls: Payroll[]
  addPayroll: (payroll: Payroll) => void
  updatePayroll: (payroll: Payroll) => void
  deletePayroll: (id: string) => void
  getPayrollById: (id: string) => Payroll | undefined
}

export const usePayrollStore = create<PayrollState>()(
  persist(
    (set, get) => ({
      payrolls: [],
      addPayroll: (payroll) => 
        set((state) => ({
          payrolls: [...state.payrolls, payroll]
        })),
      updatePayroll: (payroll) =>
        set((state) => ({
          payrolls: state.payrolls.map((p) => 
            p.id === payroll.id ? payroll : p
          )
        })),
      deletePayroll: (id) =>
        set((state) => ({
          payrolls: state.payrolls.filter((p) => p.id !== id)
        })),
      getPayrollById: (id) => {
        const state = get()
        return state.payrolls.find((p) => p.id === id)
      },
    }),
    {
      name: 'payroll-storage',
    }
  )
)