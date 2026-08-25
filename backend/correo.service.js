// correo.service.js
// Validaciones y procesamiento de datos del formulario de contacto.

import nodemailer from "nodemailer";

// transportador para mandar los correos
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_REMITENTE,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify()
  .then(() => {
    console.log("✓ Gmail configurado correctamente");
  })
  .catch((error) => {
    console.error("✗ Error de configuración de Gmail:", error);
  });

function validarDatos(datos) {
  const errores = {};

  // Validar nombre
  if (!datos.nombre || !datos.nombre.trim()) {
    errores.nombre = "Por favor escribe tu nombre.";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(datos.nombre.trim())) {
    errores.nombre = "El nombre solo puede contener letras y espacios.";
  } else if (datos.nombre.trim().length < 5) {
    errores.nombre = "El nombre es demasiado corto.";
  }

  // Validar correo
  if (!datos.email || !datos.email.trim()) {
    errores.email = "Por favor escribe tu correo.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
    errores.email = "Ese correo no parece válido.";
  }

  // Validar mensaje
  if (!datos.mensaje || !datos.mensaje.trim()) {
    errores.mensaje = "Por favor escribe tu mensaje o reserva.";
  } else if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9]/.test(datos.mensaje)) {
    errores.mensaje = "El mensaje debe contener letras o números.";
  } else if (datos.mensaje.trim().length < 20) {
    errores.mensaje = "El mensaje es demasiado corto.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}

async function procesarMensaje(datos) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_REMITENTE,
      to: process.env.EMAIL_DESTINO,
      replyTo: datos.email,
      subject: "Nuevo mensaje desde La Placita",
      text: `
Nombre: ${datos.nombre}
Correo: ${datos.email}

Mensaje:
${datos.mensaje}
      `,
    });

    return {
      exitoso: true,
      mensaje: "Mensaje enviado correctamente.",
    };
  } catch (error) {
    console.error("Error al enviar correo:", error);

    return {
      exitoso: false,
      mensaje: "No se pudo enviar el mensaje.",
    };
  }
}


export default {
  validarDatos,
  procesarMensaje,
};