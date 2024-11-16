// mock-salary-records.ts
import { SalaryRecord } from './SalaryRecord'

export const mockSalaryRecords: SalaryRecord[] = [
  {
    month: 'Enero',
    totalSalary: 45000,      // Total de salarios desembolsados en enero
    totalDeductions: 5000,   // Total de deducciones (impuestos, seguridad social, etc.)
    totalNet: 40000          // Total neto recibido por los empleados después de las deduccione
},

  {
    month: 'Febrero',
    totalSalary: 46000,
    totalDeductions: 5100,
    totalNet: 40900
  },
  {
    month: 'Marzo',
    totalSalary: 47000,
    totalDeductions: 5200,
    totalNet: 41800
  },
  {
    month: 'Abril',
    totalSalary: 48000,
    totalDeductions: 5300,
    totalNet: 42700
  },
  {
    month: 'Mayo',
    totalSalary: 49000,
    totalDeductions: 5400,
    totalNet: 43600
  },
  {
    month: 'Junio',
    totalSalary: 50000,
    totalDeductions: 5500,
    totalNet: 44500
  },
  {
    month: 'Julio',
    totalSalary: 51000,
    totalDeductions: 5600,
    totalNet: 45400
  },
  {
    month: 'Agosto',
    totalSalary: 52000,
    totalDeductions: 5700,
    totalNet: 46300
  },
  {
    month: 'Septiembre',
    totalSalary: 53000,
    totalDeductions: 5800,
    totalNet: 47200
  },
  {
    month: 'Octubre',
    totalSalary: 54000,
    totalDeductions: 5900,
    totalNet: 48100
  },
  {
    month: 'Noviembre',
    totalSalary: 55000,
    totalDeductions: 6000,
    totalNet: 49000
  },
  {
    month: 'Diciembre',
    totalSalary: 56000,
    totalDeductions: 6100,
    totalNet: 49900
  }
]
