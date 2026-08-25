// correo.controller.js
// Controlador que maneja las solicitudes HTTP del footer y contacto.
// Recibe peticiones, las valida usando correoService, y retorna respuestas estructuradas.
import correoService from "./correo.service.js";


// POST /api/contacto
// Recibe un formulario de contacto, lo valida y lo procesa.
// Retorna errores si falta información o si el email no es válido.
async function enviarContacto(req, res) {
  const { nombre, email, mensaje } = req.body;

  // Valida que los campos cumplan con los requisitos (no vacíos, email válido)
  const validacion = correoService.validarDatos({
    nombre,
    email,
    mensaje,
  });

  // Si hay errores de validación, devuelve estado 400 con los errores específicos
  if (!validacion.valido) {
    return res.status(400).json({
      exitoso: false,
      errores: validacion.errores,
    });
  }

  // Si los datos son válidos, procesa el mensaje (próximamente envío de correo real)
  const resultado = await correoService.procesarMensaje({
    nombre,
    email,
    mensaje,
  });

  // Retorna respuesta de éxito o error después de procesar
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
  enviarContacto,
};