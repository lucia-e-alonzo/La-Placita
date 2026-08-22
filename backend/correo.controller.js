import correoService from "./correo.service.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function obtenerFooter(req, res) {
  try {
    const rutaJSON = path.join(__dirname, "../data/footer.json");
    const datos = JSON.parse(fs.readFileSync(rutaJSON, "utf-8"));

    res.json({
      exitoso: true,
      datos,
    });
  } catch (error) {
    res.status(500).json({
      exitoso: false,
      mensaje: "Error al cargar la información del footer.",
      error: error.message,
    });
  }
}

async function enviarContacto(req, res) {
  const { nombre, email, mensaje } = req.body;

  const validacion = correoService.validarDatos({
    nombre,
    email,
    mensaje,
  });

  if (!validacion.valido) {
    return res.status(400).json({
      exitoso: false,
      errores: validacion.errores,
    });
  }

  const resultado = await correoService.procesarMensaje({
    nombre,
    email,
    mensaje,
  });

  if (resultado.exitoso) {
    return res.status(200).json({
      exitoso: true,
      mensaje: resultado.mensaje,
    });
  }

  return res.status(500).json({
    exitoso: false,
    mensaje: resultado.mensaje,
  });
}

export default {
  obtenerFooter,
  enviarContacto,
};