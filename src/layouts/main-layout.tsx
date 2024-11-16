import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ProtectedRoute from "../components/protected-route";

interface Props {
	children: React.ReactNode;
}

export function MainLayout({ children }: Props): ReactNode {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<ProtectedRoute>
			<div className="flex flex-col bg-gray-50 min-h-screen">
				<nav className="bg-cyan-500 px-10 md:px-10 py-4 shadow-lg sticky top-0">
					<div className="container">
						<div className="flex justify-between items-center">
							{/* Logo y nombre del negocio */}
							<div className="flex items-center">
								<Link
									to="/"
									className="hidden lg:inline text-white font-bold text-sm md:text-xl hover:text-white/90 truncate max-w-[200px] md:max-w-none"
								>
									Taller Mecánico "Rodriguez y Asociados"
								</Link>
								<Link
									to="/"
									className="inline lg:hidden text-white font-bold text-sm md:text-xl hover:text-white/90 truncate max-w-[200px] md:max-w-none"
								>
									Rodriguez y Asociados
								</Link>
							</div>

							{/* Botón del menú móvil */}
							<button
								className="md:hidden text-white p-2 hover:bg-cyan-600 rounded-lg"
								onClick={toggleMenu}
							>
								{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
							</button>

							{/* Menú de navegación para desktop */}
							<ul className="hidden md:flex space-x-6">
								<li>
									<Link
										to="/dashboard"
										className="text-white/90 hover:text-white hover:font-medium transition-colors flex items-center gap-2"
									>
										Panel de Control
									</Link>
								</li>
								<li>
									<Link
										to="/empleados"
										className="text-white/90 hover:text-white hover:font-medium transition-colors flex items-center gap-2"
									>
										Empleados
									</Link>
								</li>
								<li>
									<Link
										to="/planillas"
										className="text-white/90 hover:text-white hover:font-medium transition-colors flex items-center gap-2"
									>
										Planillas
									</Link>
								</li>
								<li>
									<Link
										to="/reportes"
										className="text-white/90 hover:text-white hover:font-medium transition-colors flex items-center gap-2"
									>
										Reportes
									</Link>
								</li>
							</ul>
						</div>

						{/* Menú móvil */}
						{isMenuOpen && (
							<div className="md:hidden mt-4 pb-4">
								<ul className="flex flex-col space-y-4">
									<li>
										<Link
											to="/dashboard"
											className="text-white/90 hover:text-white hover:font-medium transition-colors block py-2"
											onClick={() => setIsMenuOpen(false)}
										>
											Panel de Control
										</Link>
									</li>
									<li>
										<Link
											to="/empleados"
											className="text-white/90 hover:text-white hover:font-medium transition-colors block py-2"
											onClick={() => setIsMenuOpen(false)}
										>
											Empleados
										</Link>
									</li>
									<li>
										<Link
											to="/planillas"
											className="text-white/90 hover:text-white hover:font-medium transition-colors block py-2"
											onClick={() => setIsMenuOpen(false)}
										>
											Planillas
										</Link>
									</li>
									<li>
										<Link
											to="/reportes"
											className="text-white/90 hover:text-white hover:font-medium transition-colors block py-2"
											onClick={() => setIsMenuOpen(false)}
										>
											Reportes
										</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</nav>
				{children}
			</div>
		</ProtectedRoute>
	);
}
