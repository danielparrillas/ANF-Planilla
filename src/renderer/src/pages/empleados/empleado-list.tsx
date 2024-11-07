import { MainLayout } from '@renderer/layouts/main-layout'
import { useEmployeeStore } from '@renderer/store/employee-store'
import { formatDisplayDate } from '@renderer/utils/datetimeUtil'
import { formatCurrency } from '@renderer/utils/format'
import { Calendar, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function EmpleadoList() {
  const employees = useEmployeeStore((state) => state.employees)
  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="hidden sm:inline text-2xl font-bold text-gray-800">Empleados</h1>
          <h1 className="inline sm:hidden text-2xl font-bold text-gray-800">Planillas</h1>
          <div className="space-x-4">
            <Link
              to="/"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Volver
            </Link>
            <Link
              to="/empleado/nuevo"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Agregar
            </Link>
          </div>
        </div>

        {employees.length > 0 && (
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salario base
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de inicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Departamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(employee.baseSalary)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDisplayDate(employee.startDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3">
                    <button className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1">
                      <Pencil className="w-4 h-4" />
                      <span className="hidden md:inline">Editar</span>
                    </button>
                    {/* <PrintPayrollModal payroll={payroll} /> */}
                    <button
                      // onClick={() => handleDelete(payroll.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden md:inline">Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {employees.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center space-y-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
              />
              <path fill="currentColor" opacity="0.5" d="M8 14h8v2H8v-2zm0-3h8v2H8v-2z" />
            </svg>
            <div className="text-gray-500 text-lg font-medium">No hay empleados registrados</div>
            <div className="text-gray-400">
              Comienza creando un nuevo empleado usando el botón "Agregar"
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default EmpleadoList
