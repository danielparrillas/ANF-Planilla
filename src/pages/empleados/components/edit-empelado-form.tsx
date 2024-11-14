import { Save, X } from "lucide-react";
import { FormEvent } from "react";
import {
	getDepartments,
	getPositions,
	useEmployeeStore,
} from "../../../store/employee-store";
import { Employee } from "../../../types";

interface Props {
	onClose: () => void;
	employee: Employee;
}

export default function EditEmpleadoForm({ onClose, employee }: Props) {
	const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
	const positions = getPositions();
	const departments = getDepartments();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const employeeObj = Object.fromEntries(formData.entries());

		const newEmployee: Employee = {
			id: employee.id,
			baseSalary: parseFloat(employeeObj.baseSalary as string),
			department: employeeObj.department as string,
			name: employeeObj.name as string,
			position: employeeObj.position as string,
			startDate: employeeObj.startDate as string,
		};

		updateEmployee(newEmployee);
		form.reset();
		onClose();
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
				<div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
					<button
						onClick={onClose}
						className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
					>
						<X className="w-6 h-6" />
					</button>

					<div>
						<div className="header pb-4">
							<h2 className="text-xl font-bold">Actualizar empleado</h2>
							<p className="text-sm text-gray-600">{employee.name}</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Nombre
								<input
									defaultValue={employee.name}
									type="text"
									name="name"
									className="mt-1 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2"
									required
								/>
							</label>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Fecha de inicio
								<input
									defaultValue={employee.startDate}
									type="date"
									name="startDate"
									className="mt-1 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2"
									required
								/>
							</label>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Salario base
								<input
									defaultValue={employee.baseSalary}
									type="number"
									step={0.01}
									min={0}
									name="baseSalary"
									className="mt-1 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2"
									required
								/>
							</label>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Cargo
								<input
									defaultValue={employee.position}
									type="text"
									name="position"
									className="mt-1 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2"
									list="positions"
									required
								/>
								<datalist id="positions">
									{positions.map((position) => (
										<option key={position} value={position} />
									))}
								</datalist>
							</label>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Departamento
								<input
									defaultValue={employee.department}
									type="text"
									name="department"
									className="mt-1 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2"
									list="departments"
									required
								/>
								<datalist id="departments">
									{departments.map((department) => (
										<option key={department} value={department} />
									))}
								</datalist>
							</label>
						</div>
					</div>

					<div className="flex justify-end space-x-4 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
						>
							Cerrar
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-flex items-center gap-2"
						>
							<Save className="w-4 h-4" />
							Guardar
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}