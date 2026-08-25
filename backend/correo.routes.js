// correo.routes.js
// Define las rutas HTTP (endpoints) para el footer y contacto.
// Conecta cada ruta con su correspondiente función en el controlador.
import express from "express";
import correoController from "./correo.controller.js";

const router = express.Router();

// POST /api/contacto — recibe y procesa un formulario de contacto con validación
router.post("/contacto", correoController.enviarContacto);

export default router;