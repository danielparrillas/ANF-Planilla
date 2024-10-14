import express from "express";
import { createNewEmpleado, getAllEmpleados } from "../controllers/empleadoController";

const router = express.Router();

router.get("/", getAllEmpleados);
router.post("/", createNewEmpleado);

export default router;
