import { Link } from "react-router-dom";
import { MainLayout } from "../../layouts/main-layout";

export default function HomePage() {
	return (
		<MainLayout>
			<main className="p-4 gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<div className="flex flex-col gap-6 w-5/6 m-auto" >
				<Link to="/empleados">Link al Modulo de Empleados</Link>
				<Link to="/planillas">Link al Modulo de Planillas</Link>
				<Link to="/reportes">Link al Modulo de Reportes</Link>
				</div>
			</main>
		</MainLayout>
	);
}
