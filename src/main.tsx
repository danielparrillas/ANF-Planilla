import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/home-page";
import LoginPage from "./pages/login/login-page";
import EmpleadoList from "./pages/empleados/empleado-list";
import EmpleadoForm from "./pages/empleados/empleado-form";
import PlanillaList from "./pages/planillas/planilla-list";
import PlanillaForm from "./pages/planillas/planilla-form";
import ReporteList from "./pages/reportes/reporte-list";
import ReporteForm from "./pages/reportes/reporte-form";
import { Toaster } from "sonner";
import NotFoundPage from "./pages/notFoundPage/not-found-page";
import DashboardPage from "./pages/dashboard/dashboard-page";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/empleados",
			element: <EmpleadoList />,
		},
		{
			path: "/empleado/:id", // Para crear o editar empleados
			element: <EmpleadoForm />,
		},
		{
			path: "/planillas",
			element: <PlanillaList />,
		},
		{
			path: "/planilla/:id", // Para crear o editar planillas
			element: <PlanillaForm />,
		},
		{
			path: "/reportes",
			element: <ReporteList />,
		},
		{
			path: "/reporte/:id", // Para crear o editar reportes
			element: <ReporteForm />,
		},
		{
			path: "*", // Ruta de error 404
			element: <NotFoundPage />,
		},
		{
			path: "/dashboard",
			element: <DashboardPage />,
		},
	],
	{
		basename: "/ANF-Planilla",
	}
);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster richColors />
	</StrictMode>
);
