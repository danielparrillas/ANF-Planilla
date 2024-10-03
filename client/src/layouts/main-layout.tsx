import { Link } from "react-router-dom";
import { Toaster } from "sonner";

interface Props {
	children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
	return (
		<div className="bg-purple-50 h-screen">
			<nav className="bg-cyan-500 px-4 shadow-lg sticky top-0">
				<ul>
					<li>
						<Link to={"/"}>
							<h2 className="text-white">Planilla</h2>
						</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to={"#"} className="text-white/80 hover:text-white">
							Ejemplo
						</Link>
					</li>
					<li>
						<a href="#" className="text-white/80 hover:text-white">
							Ejemplo 2
						</a>
					</li>
				</ul>
			</nav>
			{children}
			<Toaster richColors />
		</div>
	);
}
