import { toast } from "sonner";
import { login } from "../../store/authStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const username = String(formData.get("username")).trim();
		const password = String(formData.get("password")).trim();
		try {
			login({ username, password });
			const from = location.state?.from?.pathname || "/";
			navigate(from, { replace: true });
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			return;
		}
		toast.success("Inicio de sesión exitoso");
		form.reset();
	};
	return (
		<div className="h-screen flex items-center justify-center bg-cyan-500">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center min-h-60 gap-4 p-4 rounded-md max-w-md w-full shadow-md bg-white"
			>
				<h1 className="text-2xl text-center font-bold mb-4">Iniciar sesión</h1>
				<label htmlFor="username">
					Usuario
					<input
						type="text"
						name="username"
						id="username"
						className="mt-1 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2"
						required
					/>
				</label>

				<label htmlFor="password">
					Contraseña
					<input
						type="password"
						name="password"
						id="password"
						className="mt-1 block w-full rounded-md border-gray-300 border focus:border-blue-500 focus:ring-blue-500 p-2"
						required
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white rounded-md p-2 mt-8 uppercase"
				>
					Iniciar sesión
				</button>
			</form>
		</div>
	);
}
