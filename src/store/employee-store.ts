import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Employee } from "../types";
import { mockEmployees } from "../pages/mock-data";

interface EmployeeState {
	employees: Employee[];
	addEmployee: (employee: Employee) => void;
	updateEmployee: (employee: Employee) => void;
	deleteEmployee: (id: string) => void;
	getEmployeeById: (id: string) => Employee | undefined;
}

export const useEmployeeStore = create<EmployeeState>()(
	persist(
		(set, get) => ({
			employees: mockEmployees,
			addEmployee: (employee) =>
				set((state) => ({
					employees: [...state.employees, employee],
				})),
			updateEmployee: (employee) =>
				set((state) => ({
					employees: state.employees.map((e) =>
						e.id === employee.id ? employee : e
					),
				})),
			deleteEmployee: (id) =>
				set((state) => ({
					employees: state.employees.filter((e) => e.id !== id),
				})),
			getEmployeeById: (id) => {
				const state = get();
				return state.employees.find((e) => e.id === id);
			},
		}),
		{
			name: "employee-storage",
		}
	)
);

export const genereateEmployeeId = () => {
	const employees = useEmployeeStore.getState().employees;
	const largestId = employees.reduce((acc, curr) => {
		const id = parseInt(curr.id);
		return id > acc ? id : acc;
	}, 0);
	return (largestId + 1).toString();
};

export const getPositions = () => {
	const positions = useEmployeeStore
		.getState()
		.employees.map((e) => e.position);
	return Array.from(new Set(positions));
};

export const getDepartments = () => {
	const departments = useEmployeeStore
		.getState()
		.employees.map((e) => e.department);
	return Array.from(new Set(departments));
};
