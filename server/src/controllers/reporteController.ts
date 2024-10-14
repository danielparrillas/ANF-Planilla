import { Request, Response } from "express";
import { createPlanilla, getPlanillas } from "../models/planillaModel";
import { createReporte, getReportes } from "../models/reporteModel";

export const getAllReportes= async (req: Request, res: Response) => {
  const reportes = await getReportes();
  res.json(reportes);
};

export const createNewReporte = async (req: Request, res: Response) => {
  const reporte = await createReporte(req.body);
  res.json(reporte);
};
