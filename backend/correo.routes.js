import express from "express";
import correoController from "./correo.controller.js";

const router = express.Router();

router.get("/footer", correoController.obtenerFooter);
router.post("/contacto", correoController.enviarContacto);

export default router;