// planilla-form.tsx
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PayrollService } from './services/planilla-service'
import { formatCurrency } from '../../utils/format'
import { FormState } from '../../types'
import { MainLayout } from '../../layouts/main-layout'
import { usePayrollStore } from '../../store/payroll-store'
import { useEmployeeStore } from '@renderer/store/employee-store'

function PlanillaForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const employees = useEmployeeStore((state) => state.employees)
  const addPayroll = usePayrollStore((state) => state.addPayroll)
  const updatePayroll = usePayrollStore((state) => state.updatePayroll)
  const getPayrollById = usePayrollStore((state) => state.getPayrollById)

  const initialFormState: FormState = {
    selectedEmployee: '',
    date: new Date().toISOString().split('T')[0],
    firstQuinzena: 0,
    secondQuinzena: 0,
    overtimePay: 0,
    overtimeHours: 0,
    bonus: 0,
    vacation: 0,
    includeVacation: false,
    includeAguinaldo: false,
    aguinaldo: 0
  }

  const [formData, setFormData] = React.useState<FormState>(initialFormState)

  // Check if a payroll already exists for the selected month and employee
  const isPayrollExistsForMonth = (employeeId: string, date: string): boolean => {
    const selectedDate = new Date(date)
    const existingPayrolls = usePayrollStore.getState().payrolls

    return existingPayrolls.some((payroll) => {
      const payrollDate = new Date(payroll.date)
      return (
        payroll.employeeId === employeeId &&
        payrollDate.getMonth() === selectedDate.getMonth() &&
        payrollDate.getFullYear() === selectedDate.getFullYear()
      )
    })
  }

  // Función para calcular aguinaldo
  const calcularAguinaldo = (salarioMensual: number, fechaIngreso: string): number => {
    const salarioDiario = salarioMensual / 30
    let diasAguinaldo = 0

    const fechaBase = new Date(new Date().getFullYear(), 11, 12)
    const fechaIngresoDate = new Date(fechaIngreso)

    const aniosAntiguedad = fechaBase.getFullYear() - fechaIngresoDate.getFullYear()

    if (aniosAntiguedad >= 1 && aniosAntiguedad < 3) {
      diasAguinaldo = 15
    } else if (aniosAntiguedad >= 3 && aniosAntiguedad < 10) {
      diasAguinaldo = 19
    } else if (aniosAntiguedad >= 10) {
      diasAguinaldo = 21
    } else {
      diasAguinaldo = 15 // Base para cálculo proporcional
    }

    if (aniosAntiguedad < 1) {
      const diferenciaMilisegundos = fechaBase.getTime() - fechaIngresoDate.getTime()
      const diasTrabajados = diferenciaMilisegundos / (1000 * 60 * 60 * 24)
      return (salarioDiario * diasAguinaldo * diasTrabajados) / 365
    }

    return salarioDiario * diasAguinaldo
  }

  // Función para verificar si es diciembre
  const isDecember = (date: string): boolean => {
    return new Date(date).getMonth() === 11 // 11 es diciembre en JavaScript
  }

  // Manejador para el cambio del checkbox de aguinaldo
  const handleAguinaldoChange = (checked: boolean) => {
    const employee = employees.find((emp) => emp.id === formData.selectedEmployee)
    if (!employee) return

    const aguinaldoAmount = checked ? calcularAguinaldo(employee.baseSalary, employee.startDate) : 0
    setFormData((prev) => ({
      ...prev,
      includeAguinaldo: checked,
      aguinaldo: aguinaldoAmount
    }))
  }

  // Calcular pago de horas extra basado en el salario base
  const calculateOvertimePay = (hours: number, baseSalary: number) => {
    // Salario base mensual dividido por 30 días y 8 horas = valor hora normal
    const hourlyRate = baseSalary / 30 / 8
    // Las horas extra se pagan al 200% según ley salvadoreña
    return hours * (hourlyRate * 2)
  }

  // Update base salary when employee is selected
  const updateBaseSalary = (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    if (employee) {
      const baseSalaryPerQuinzena = employee.baseSalary / 2
      const overtimePay = calculateOvertimePay(formData.overtimeHours, employee.baseSalary)
      setFormData((prev) => ({
        ...prev,
        firstQuinzena: baseSalaryPerQuinzena,
        secondQuinzena: baseSalaryPerQuinzena,
        overtimePay
      }))
    }
  }

  // Handle employee selection
  const handleEmployeeChange = (employeeId: string) => {
    if (!employeeId) {
      setFormData(initialFormState)
      return
    }

    setFormData((prev) => ({
      ...initialFormState,
      selectedEmployee: employeeId,
      date: prev.date,
      includeAguinaldo: false,
      aguinaldo: 0
    }))
    updateBaseSalary(employeeId)
  }

  // Handle overtime hours change
  const handleOvertimeChange = (hours: number) => {
    const employee = employees.find((emp) => emp.id === formData.selectedEmployee)
    if (employee) {
      const overtimePay = calculateOvertimePay(hours, employee.baseSalary)
      setFormData((prev) => ({
        ...prev,
        overtimeHours: hours,
        overtimePay
      }))
    }
  }

  // Cargar datos existentes al editar
  useEffect(() => {
    if (id && id !== 'add') {
      const payroll = getPayrollById(id)
      if (payroll) {
        setFormData({
          selectedEmployee: payroll.employeeId,
          date: payroll.date,
          firstQuinzena: payroll.firstQuinzena,
          secondQuinzena: payroll.secondQuinzena,
          overtimePay: payroll.overtimePay,
          overtimeHours: payroll.overtimeHours || 0,
          bonus: payroll.bonus,
          vacation: payroll.vacation,
          includeVacation: payroll.includeVacation,
          includeAguinaldo: payroll.includeAguinaldo || false,
          aguinaldo: payroll.aguinaldo || 0
        })
      }
    }
  }, [id, getPayrollById])

  // Función para calcular ISR mensual
  const calcularISR = (salarioImponible: number): number => {
    let isr = 0
    // Tramos según tabla de retención mensual de El Salvador
    if (salarioImponible > 0.01 && salarioImponible <= 472.0) {
      isr = 0
    } else if (salarioImponible > 472.0 && salarioImponible <= 895.24) {
      isr = (salarioImponible - 472.0) * 0.1 + 17.67
    } else if (salarioImponible > 895.24 && salarioImponible <= 2038.1) {
      isr = (salarioImponible - 895.24) * 0.2 + 60.0
    } else if (salarioImponible > 2038.1) {
      isr = (salarioImponible - 2038.1) * 0.3 + 288.57
    }
    return isr
  }

  // Calcular deducciones y totales
  const calculations = React.useMemo(() => {
    const grossSalary =
      formData.firstQuinzena +
      formData.secondQuinzena +
      formData.overtimePay +
      formData.bonus +
      formData.vacation +
      formData.aguinaldo

    // Deducciones del empleado
    const isss = Math.min(30, grossSalary * 0.03) // Tope máximo de $30
    const afp = grossSalary * 0.0725
    const rent = calcularISR(grossSalary - isss - afp)
    const totalDeductions = isss + afp + rent
    const netSalary = grossSalary - totalDeductions

    // Aportaciones del patrono
    const employerIsss = grossSalary * 0.075 // 7.5%
    const employerAfp = grossSalary * 0.0875 // 8.75%
    // INSAFORP solo si hay más de 10 empleados
    const hasInsaforp = employees.length > 10
    const insaforp = hasInsaforp ? grossSalary * 0.01 : 0
    const totalEmployerContributions = employerIsss + employerAfp + insaforp

    return {
      grossSalary,
      isss,
      afp,
      rent,
      totalDeductions,
      netSalary,
      employerIsss,
      employerAfp,
      insaforp,
      totalEmployerContributions,
      aguinaldo: formData.aguinaldo
    }
  }, [formData])

  // Estado de vacaciones del empleado
  const getVacationStatus = () => {
    if (!formData.selectedEmployee || !formData.date) {
      return { eligible: false, hasUsed: false, message: '' }
    }

    const employee = employees.find((emp) => emp.id === formData.selectedEmployee)
    if (!employee) {
      return {
        eligible: false,
        hasUsed: false,
        message: 'Empleado no encontrado'
      }
    }

    const startDate = new Date(employee.startDate)
    const selectedDate = new Date(formData.date)
    const yearsSinceStart =
      (selectedDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)

    // Si no ha pasado un año desde la contratación
    if (yearsSinceStart < 1) {
      return {
        eligible: false,
        hasUsed: false,
        message: 'Debe cumplir un año de trabajo para ser elegible'
      }
    }

    // Verificar si ya tomó vacaciones en el año seleccionado
    const hasVacationInSelectedYear = PayrollService.getPayrolls().some((p) => {
      const payrollDate = new Date(p.date)
      return (
        p.employeeId === employee.id &&
        p.includeVacation &&
        payrollDate.getFullYear() === selectedDate.getFullYear()
      )
    })

    if (hasVacationInSelectedYear) {
      return {
        eligible: false,
        hasUsed: true,
        message: `Ya utilizó sus vacaciones en el año ${selectedDate.getFullYear()}`
      }
    }

    return {
      eligible: true,
      hasUsed: false,
      message: 'Elegible para vacaciones'
    }
  }

  const vacationStatus = getVacationStatus()

  // Manejar cambio en el checkbox de vacaciones
  const handleVacationChange = (checked: boolean) => {
    const employee = employees.find((emp) => emp.id === formData.selectedEmployee)
    if (!employee) return

    const vacationAmount = checked ? calculateVacation(employee.baseSalary) : 0
    setFormData((prev) => ({
      ...prev,
      includeVacation: checked,
      vacation: vacationAmount
    }))
  }

  // Función auxiliar para calcular el monto de vacaciones
  const calculateVacation = (baseSalary: number): number => {
    // 15 días de salario + 30% de los 15 días
    const fifteenDaysSalary = (baseSalary / 30) * 15
    return fifteenDaysSalary + fifteenDaysSalary * 0.3
  }

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const employeeData = employees.find((emp) => emp.id === formData.selectedEmployee)
    if (!employeeData) return

    // Verificar si ya existe una planilla para este mes
    if (id === 'add' && isPayrollExistsForMonth(formData.selectedEmployee, formData.date)) {
      alert('Ya existe una planilla para este empleado en el mes seleccionado.')
      return
    }

    const payroll = {
      id: id !== 'add' ? id! : Date.now().toString(),
      employeeId: employeeData.id,
      employeeName: employeeData.name,
      ...formData,
      ...calculations,
      employerIsss: calculations.employerIsss,
      employerAfp: calculations.employerAfp,
      insaforp: calculations.insaforp,
      totalEmployerContributions: calculations.totalEmployerContributions
    }

    try {
      if (id !== 'add') {
        updatePayroll(payroll)
      } else {
        addPayroll(payroll)
      }
      navigate('/planillas')
    } catch (error) {
      alert('Error al guardar la planilla. Por favor, intente nuevamente.')
      console.error('Error saving payroll:', error)
    }
  }

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {id !== 'add' ? 'Editar Planilla' : 'Crear Planilla'}
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/planillas')}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Volver
            </button>
            <button
              type="submit"
              form="payrollForm"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow p-6">
            <form id="payrollForm" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empleado</label>
                  <select
                    value={formData.selectedEmployee}
                    onChange={(e) => handleEmployeeChange(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar empleado</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horas Extra
                  </label>
                  <input
                    type="number"
                    value={formData.overtimeHours}
                    onChange={(e) => handleOvertimeChange(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bonificación
                  </label>
                  <input
                    type="number"
                    value={formData.bonus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bonus: Number(e.target.value)
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeVacation"
                    checked={formData.includeVacation}
                    disabled={!vacationStatus.eligible || vacationStatus.hasUsed}
                    onChange={(e) => handleVacationChange(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  />
                  <label
                    htmlFor="includeVacation"
                    className={`ml-2 block text-sm ${
                      !vacationStatus.eligible || vacationStatus.hasUsed
                        ? 'text-gray-500'
                        : 'text-gray-900'
                    }`}
                  >
                    Incluir Vacaciones
                    {vacationStatus.hasUsed && (
                      <span className="ml-2 text-xs text-red-500">(Ya utilizadas este año)</span>
                    )}
                    {!vacationStatus.eligible && !vacationStatus.hasUsed && (
                      <span className="ml-2 text-xs text-gray-500">(No elegible aún)</span>
                    )}
                  </label>
                </div>
                {isDecember(formData.date) && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeAguinaldo"
                      checked={formData.includeAguinaldo}
                      onChange={(e) => handleAguinaldoChange(e.target.checked)}
                      disabled={!formData.selectedEmployee}
                      className={`h-4 w-4 focus:ring-blue-500 border-gray-300 rounded ${
                        !formData.selectedEmployee
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-blue-600 cursor-pointer'
                      }`}
                    />
                    <label
                      htmlFor="includeAguinaldo"
                      className={`ml-2 block text-sm ${
                        !formData.selectedEmployee
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-900 cursor-pointer'
                      }`}
                    >
                      Incluir Aguinaldo
                      {!formData.selectedEmployee && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Seleccione un empleado primero)
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Resumen de Deducciones */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Resumen de Deducciones</h2>
            <div className="space-y-3">
              {/* Ingresos */}
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Ingresos</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Salario Quincena 1</span>
                    <span className="font-semibold">{formatCurrency(formData.firstQuinzena)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Salario Quincena 2</span>
                    <span className="font-semibold">{formatCurrency(formData.secondQuinzena)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horas Extras ({formData.overtimeHours} horas)</span>
                    <span className="font-semibold">{formatCurrency(formData.overtimePay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bonificación</span>
                    <span className="font-semibold">{formatCurrency(formData.bonus)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vacaciones</span>
                    <span className="font-semibold">{formatCurrency(formData.vacation)}</span>
                  </div>
                  {formData.includeAguinaldo && (
                    <div className="flex justify-between">
                      <span>Aguinaldo</span>
                      <span className="font-semibold">{formatCurrency(formData.aguinaldo)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Salario Bruto</span>
                    <span>{formatCurrency(calculations.grossSalary)}</span>
                  </div>
                </div>
              </div>

              {/* Deducciones del Empleado */}
              <div className="border-t pt-3">
                <h3 className="text-md font-medium text-gray-700 mb-2">Deducciones del Empleado</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ISSS (3%)</span>
                    <span className="font-semibold">{formatCurrency(calculations.isss)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AFP (7.25%)</span>
                    <span className="font-semibold">{formatCurrency(calculations.afp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retención Renta</span>
                    <span className="font-semibold">{formatCurrency(calculations.rent)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total Deducciones</span>
                    <span>{formatCurrency(calculations.totalDeductions)}</span>
                  </div>
                </div>
              </div>

              {/* Aportaciones del Patrono */}
              <div className="border-t pt-3">
                <h3 className="text-md font-medium text-gray-700 mb-2">Aportaciones del Patrono</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ISSS Patronal (7.5%)</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.employerIsss)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>AFP Patronal (8.75%)</span>
                    <span className="font-semibold">
                      {formatCurrency(calculations.employerAfp)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>INSAFORP (1%)</span>
                    <span className="font-semibold">{formatCurrency(calculations.insaforp)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t text-blue-600">
                    <span>Total Aportaciones Patronales</span>
                    <span>{formatCurrency(calculations.totalEmployerContributions)}</span>
                  </div>
                </div>
              </div>

              {/* Totales Finales */}
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Salario Neto Empleado</span>
                  <span>{formatCurrency(calculations.netSalary)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 text-blue-600">
                  <span>Costo Total Empresa</span>
                  <span>
                    {formatCurrency(
                      calculations.grossSalary + calculations.totalEmployerContributions
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PlanillaForm
