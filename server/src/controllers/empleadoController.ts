import { Request, Response } from "express";
import { createEmpleado, getEmpleados } from "../models/empleadoModel";

export const getAllEmpleados = async (req: Request, res: Response) => {
  const employees = await getEmpleados();
  res.json(employees);
};

export const createNewEmpleado = async (req: Request, res: Response) => {
  const employee = await createEmpleado(req.body);
  res.json(employee);
};
