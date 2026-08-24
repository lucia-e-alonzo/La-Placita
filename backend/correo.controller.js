import correoService from "./correo.service.js";

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
  enviarContacto,
};