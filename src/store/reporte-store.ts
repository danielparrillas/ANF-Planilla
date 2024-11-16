import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SalaryRecord } from '../pages/SalaryRecord'

// Definir la estructura del estado para los registros salariales
export interface SalaryState {
  salaryRecords: SalaryRecord[];                          // Array de registros salariales
  addSalaryRecord: (salaryRecord: SalaryRecord) => void;   // Función para agregar un nuevo registro
  updateSalaryRecord: (salaryRecord: SalaryRecord) => void; // Función para actualizar un registro de salario
  deleteSalaryRecord: (month: string) => void;             // Función para eliminar un registro por mes
  getSalaryRecordByMonth: (month: string) => SalaryRecord | undefined; // Obtener un registro por mes
}

// Crear el store
export const useSalaryStore = create<SalaryState>()(
  persist(
    (set, get) => ({
      salaryRecords: [], // Inicialmente, no hay registros de salario

      // Agregar un nuevo registro de salario
      addSalaryRecord: (salaryRecord) =>
        set((state) => ({
          salaryRecords: [...state.salaryRecords, salaryRecord],
        })),

      // Actualizar un registro de salario
      updateSalaryRecord: (salaryRecord) =>
        set((state) => ({
          salaryRecords: state.salaryRecords.map((s) =>
            s.month === salaryRecord.month ? salaryRecord : s
          ),
        })),

      // Eliminar un registro de salario por mes
      deleteSalaryRecord: (month) =>
        set((state) => ({
          salaryRecords: state.salaryRecords.filter((s) => s.month !== month),
        })),

      // Obtener un registro de salario por mes
      getSalaryRecordByMonth: (month) => {
        const state = get();
        return state.salaryRecords.find((s) => s.month === month);
      },
    }),
    {
      name: "salary-storage", // Persistencia en localStorage
    }
  )
);
