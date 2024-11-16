import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { Role } from "../types/roleEnum";

interface ProtectedRouteProps {
	children: React.ReactNode;
	role?: string;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	const authorized = user.role === role || user.role === Role.admin;

	if (role && !authorized) {
		return <Navigate to="/not-authorized" replace />;
	}

	return <>{children}</>;
}

export default ProtectedRoute;
