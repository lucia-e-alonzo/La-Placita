// FormularioCorreo.jsx
// Componente de UI del formulario de contacto.
// Maneja el estado del formulario, valida en cliente, y delega el envío al componente padre (Correo).

import { useState } from "react";

// Estado inicial del formulario — usado para reset después de envío exitoso
const ESTADO_INICIAL = {
  nombre: "",
  email: "",
  mensaje: "",
};

function FormularioCorreo({ onEnvio, enviando, respuesta }) {
  const [form, setForm] = useState(ESTADO_INICIAL); // Estado del formulario (nombre, email, mensaje)
  const [erroresLocales, setErroresLocales] = useState({}); // Errores de validación en cliente

  // Actualiza el campo del formulario mientras el usuario escribe
  function manejarCambio(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpia el error del campo en cuanto el usuario empieza a corregirlo
    if (erroresLocales[name]) {
      setErroresLocales((prev) => ({ ...prev, [name]: "" }));
    }
  }

  // Valida y envía el formulario al componente padre
  function manejarEnvio(e) {
    e.preventDefault();
    onEnvio(form);
  }

  // Usa errores del servidor si existen, sino los locales
  const errores = respuesta?.errores || erroresLocales;

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {/* Campo de nombre */}
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={manejarCambio}
          placeholder="Tu nombre"
          disabled={enviando} // Desactiva inputs mientras se envía
          aria-invalid={!!errores.nombre} // Marca para accesibilidad
        />
        {errores.nombre && (
          <span className="error" role="alert">
            {errores.nombre}
          </span>
        )}
      </div>

      {/* Campo de email */}
      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={manejarCambio}
          placeholder="tucorreo@ejemplo.com"
          disabled={enviando}
          aria-invalid={!!errores.email}
        />
        {errores.email && (
          <span className="error" role="alert">
            {errores.email}
          </span>
        )}
      </div>

      {/* Campo de mensaje */}
      <div>
        <label htmlFor="mensaje">Mensaje o reserva</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={form.mensaje}
          onChange={manejarCambio}
          placeholder="Escribe tu consulta o reserva aquí..."
          rows={4}
          disabled={enviando}
          aria-invalid={!!errores.mensaje}
        />
        {errores.mensaje && (
          <span className="error" role="alert">
            {errores.mensaje}
          </span>
        )}
      </div>

      {/* Mensaje de éxito: aparece si el servidor confirma que el mensaje fue recibido */}
      {respuesta?.tipo === "exito" && (
        <p className="exito" role="alert">
          {respuesta.mensaje}
        </p>
      )}

      {/* Botón de envío: cambia de texto mientras se envía y se desactiva durante el proceso */}
      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

export default FormularioCorreo;