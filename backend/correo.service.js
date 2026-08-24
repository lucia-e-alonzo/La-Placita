// correo.service.js
// Validaciones y procesamiento de datos del formulario de contacto.

function validarDatos(datos) {
  const errores = {};

  if (!datos.nombre || !datos.nombre.trim()) {
    errores.nombre = "Por favor escribe tu nombre.";
  }

  if (!datos.email || !datos.email.trim()) {
    errores.email = "Por favor escribe tu correo.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
    errores.email = "Ese correo no parece válido.";
  }

  if (!datos.mensaje || !datos.mensaje.trim()) {
    errores.mensaje = "Por favor escribe tu mensaje o reserva.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}

async function procesarMensaje(datos) {
  try {
    console.log("Mensaje recibido:", datos);

    return {
      exitoso: true,
      mensaje: "Mensaje recibido. Don Chente se contactará pronto.",
    };
  } catch (error) {
    return {
      exitoso: false,
      mensaje: "Error al procesar el mensaje.",
    };
  }
}

export default {
  validarDatos,
  procesarMensaje,
};