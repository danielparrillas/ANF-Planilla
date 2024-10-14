import { Request, Response } from "express";
import { createPlanilla, getPlanillas } from "../models/planillaModel";

export const getAllPlanillas= async (req: Request, res: Response) => {
  const planillas = await getPlanillas();
  res.json(planillas);
};

export const createNewPlanilla = async (req: Request, res: Response) => {
  const planilla = await createPlanilla(req.body);
  res.json(planilla);
};
