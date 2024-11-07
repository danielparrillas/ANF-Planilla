import { MainLayout } from '@renderer/layouts/main-layout'
import { useEmployeeStore } from '@renderer/store/employee-store'
import { formatDisplayDate } from '@renderer/utils/datetimeUtil'
import { formatCurrency } from '@renderer/utils/format'
import { Calendar, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import NewEmpleadoForm from './components/new-empelado-form'
import DeleteEmpleadoForm from './components/delete-empelado-form'
import { useEffect, useState } from 'react'
import { Employee } from '@renderer/types'
import EditEmpleadoForm from './components/edit-empelado-form'
import { normalizeForSearch } from '@renderer/utils/normalizeForSearch'

function EmpleadoList() {
  const [empleadoToDelete, setEmpleadoToDelete] = useState<Employee | null>(null)
  const [empleadoToEdit, setEmpleadoToEdit] = useState<Employee | null>(null)
  const employees = useEmployeeStore((state) => state.employees)
  const [search, setSearch] = useState('')
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees)

  useEffect(() => {
    if (search === '') {
      setFilteredEmployees(employees)
      return
    }
    const filtered = employees.filter((employee) =>
      normalizeForSearch(employee.name).includes(normalizeForSearch(search))
    )
    setFilteredEmployees(filtered)
  }, [search, employees])

  return (
    <MainLayout>
      <div className="p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="hidden sm:inline text-2xl font-bold text-gray-800">Empleados</h1>
        </div>
        <div className="mb-3 flex justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar empleado"
            type="text"
            className="rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2 mr-4 min-w-52"
            required
          />
          <div className="space-x-4">
            <Link
              to="/"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Volver
            </Link>
            <NewEmpleadoForm />
          </div>
        </div>

        {employees.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
              <table className="w-full">
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.length > 0 && filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center">
                        No se encontraron empleados
                      </td>
                    </tr>
                  )}
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
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
                        <button
                          onClick={() => setEmpleadoToEdit(employee)}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="hidden md:inline">Editar</span>
                        </button>
                        <button
                          onClick={() => setEmpleadoToDelete(employee)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden md:inline">Eliminar</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Departamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
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
        {empleadoToDelete && (
          <DeleteEmpleadoForm
            employee={empleadoToDelete}
            onClose={() => setEmpleadoToDelete(null)}
          />
        )}
        {empleadoToEdit && (
          <EditEmpleadoForm employee={empleadoToEdit} onClose={() => setEmpleadoToEdit(null)} />
        )}
      </div>
    </MainLayout>
  )
}

export default EmpleadoList
