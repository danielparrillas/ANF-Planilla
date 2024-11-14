import { Save, X } from "lucide-react";
import { FormEvent } from "react";
import { Employee } from "../../../types";
import { useEmployeeStore } from "../../../store/employee-store";

interface Props {
	onClose: () => void;
	employee: Employee;
}

export default function DeleteEmpleadoForm({ onClose, employee }: Props) {
	const deleteEmployee = useEmployeeStore((state) => state.deleteEmployee);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		deleteEmployee(employee.id);
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
							<h2 className="text-xl font-bold">Eliminar empleado</h2>
							<p className="text-sm text-gray-600">
								¿Éstas seguro de eliminar al empleado {employee.name} con el
								cargo de {employee.position}?
							</p>
						</div>
					</div>
					<div className="flex justify-end space-x-4 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-flex items-center gap-2"
						>
							<Save className="w-4 h-4" />
							Confirmar
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
