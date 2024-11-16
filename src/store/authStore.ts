import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";
import { mockUsers } from "../mocks/auth-mock-data";

interface AuthState {
	user: User | null;
	logout: () => void;
}

export const useAuth = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			logout: () => set(() => ({ user: null })),
		}),
		{
			name: "auth-storage",
		}
	)
);

export const login = (user: Pick<User, "password" | "username">) => {
	const userFound = mockUsers.find(
		(u) => u.username.toUpperCase() === user.username.toUpperCase()
	);

	// Busca el usuario en el mock data
	if (!userFound) {
		throw new Error("Usuario no encontrado");
	}

	// Verifica la contraseña
	const passwordMatch = user.password === userFound.password;
	if (!passwordMatch) {
		throw new Error("Contraseña incorrecta");
	}

	useAuth.setState({ user: userFound });
};
