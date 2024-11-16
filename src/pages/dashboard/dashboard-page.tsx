// not-found-page.tsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";
import { MainLayout } from "../../layouts/main-layout";
import { mockSalaryRecords } from "../../mocks/mock-salary-records";

// Registrar componentes de Chart.js
ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);

type Metric = "totalSalary" | "totalDeductions" | "totalNet";

export default function DashboardPage() {
	// Estado para manejar la selección del usuario
	const [selectedMetric, setSelectedMetric] = useState<Metric>("totalSalary");

	// Configuración del gráfico de pastel
	const pieData = {
		labels: mockSalaryRecords.map((record) => record.month),
		datasets: [
			{
				label: "Salarios Netos por Mes",
				data: mockSalaryRecords.map((record) => record.totalNet),
				backgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#9966FF",
					"#FF9F40",
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#9966FF",
					"#FF9F40",
				],
				borderWidth: 1,
			},
		],
	};

	// Configuración del gráfico de barras
	const barData = {
		labels: mockSalaryRecords.map((record) => record.month),
		datasets: [
			{
				label:
					selectedMetric === "totalSalary"
						? "Salario Total"
						: selectedMetric === "totalDeductions"
						? "Deducciones"
						: "Salario Neto",
				data: mockSalaryRecords.map((record) => record[selectedMetric]),
				backgroundColor: "#36A2EB",
				borderColor: "#004c99",
				borderWidth: 1,
			},
		],
	};

	return (
		<MainLayout>
			<div className="p-8">
				<header className="mb-6 text-center">
					<h1 className="text-3xl font-bold">
						Panel de Control - Resumen Salarial
					</h1>
					<p className="text-center mt-2">
						<Link to="/" className="text-blue-500 font-semibold">
							Volver al menú principal
						</Link>
					</p>
				</header>
				<main className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Tabla */}
					<section className="overflow-x-auto">
						<table className="table-auto border-collapse border border-gray-300 w-full text-sm">
							<thead>
								<tr>
									<th className="border border-gray-300 p-2">Mes</th>
									<th className="border border-gray-300 p-2">Salario Total</th>
									<th className="border border-gray-300 p-2">Deducciones</th>
									<th className="border border-gray-300 p-2">Salario Neto</th>
								</tr>
							</thead>
							<tbody>
								{mockSalaryRecords.map((record) => (
									<tr key={record.month}>
										<td className="border border-gray-300 p-2">
											{record.month}
										</td>
										<td className="border border-gray-300 p-2">
											{record.totalSalary.toLocaleString("es-ES")}
										</td>
										<td className="border border-gray-300 p-2">
											{record.totalDeductions.toLocaleString("es-ES")}
										</td>
										<td className="border border-gray-300 p-2">
											{record.totalNet.toLocaleString("es-ES")}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>

					{/* Gráfico de pastel */}
					<section className="flex justify-center items-center">
						<Pie data={pieData} />
					</section>

					{/* Selector y gráfico de barras */}
					<section className="col-span-2">
						<div className="mb-4 text-center">
							<label htmlFor="metric" className="block mb-2 font-semibold">
								Selecciona la métrica para el gráfico de barras:
							</label>
							<select
								id="metric"
								value={selectedMetric}
								onChange={(e) => setSelectedMetric(e.target.value as Metric)}
								className="p-2 border border-gray-300 rounded"
							>
								<option value="totalSalary">Salario Total</option>
								<option value="totalDeductions">Deducciones</option>
								<option value="totalNet">Salario Neto</option>
							</select>
						</div>
						<Bar data={barData} />
					</section>
				</main>
				<footer className="mt-6 text-center">
					<Link to="/" className="text-blue-500 font-semibold">
						Volver al menú principal
					</Link>
				</footer>
			</div>
		</MainLayout>
	);
}
