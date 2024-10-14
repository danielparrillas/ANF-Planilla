import express from "express";
import { createNewPlanilla, getAllPlanillas } from "../controllers/planillaController";

const router = express.Router();

router.get("/", getAllPlanillas);
router.post("/", createNewPlanilla);

export default router;
