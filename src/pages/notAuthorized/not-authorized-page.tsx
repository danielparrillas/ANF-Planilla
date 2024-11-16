import { Link } from "react-router-dom";

export default function NotAuthorizedPage() {
	return (
		<div className="h-screen flex items-center justify-center">
			<main className="w-96">
				<h2 className="text-center text-2xl font-semibold">
					403 - No autorizado
				</h2>
				<p className="text-center">
					No tienes permisos para acceder a esta página.
				</p>
				<p className="text-center">
					<Link to="/" className="text-blue-500">
						Volver al inicio
					</Link>
				</p>
			</main>
		</div>
	);
}
