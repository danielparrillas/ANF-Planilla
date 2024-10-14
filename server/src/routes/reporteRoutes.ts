import express from "express";
import { createNewReporte, getAllReportes } from "../controllers/reporteController";

const router = express.Router();

router.get("/", getAllReportes);
router.post("/", createNewReporte);

export default router;