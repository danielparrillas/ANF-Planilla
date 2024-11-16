import { User } from "../types";
import { Role } from "../types/roleEnum";

export const mockUsers: User[] = [
	{
		id: 1,
		username: "AA12031@ues.edu.sv",
		password: "anf01",
		role: Role.admin,
	},
	{
		id: 2,
		username: "PS19005@ues.edu.sv",
		password: "anf02",
		role: Role.user,
	},
	{
		id: 3,
		username: "RD17009@ues.edu.sv",
		password: "anf03",
		role: Role.general,
	},
];
