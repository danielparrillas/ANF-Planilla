// index.d.ts
export interface Employee {
  id: string
  name: string
  baseSalary: number
  startDate: string
  position: string
  department: string
}

export interface Payroll {
  id: string
  employeeId: string
  employeeName: string
  date: string
  grossSalary: number
  firstQuinzena: number
  secondQuinzena: number
  overtimePay: number
  overtimeHours: number
  bonus: number
  vacation: number
  isss: number
  afp: number
  rent: number
  totalDeductions: number
  netSalary: number
  includeVacation: boolean
  employerIsss: number
  employerAfp: number
  insaforp: number
  totalEmployerContributions: number
  includeAguinaldo: boolean
  aguinaldo: number
}

interface FormState {
  selectedEmployee: string
  date: string
  firstQuinzena: number
  secondQuinzena: number
  overtimePay: number
  overtimeHours: number
  bonus: number
  vacation: number
  includeVacation: boolean
  includeAguinaldo: boolean
  aguinaldo: number
}
