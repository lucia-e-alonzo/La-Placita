import { useState } from "react";

const ESTADO_INICIAL = {
  nombre: "",
  email: "",
  mensaje: "",
};

function FormularioCorreo({ onEnvio, enviando, respuesta }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [erroresLocales, setErroresLocales] = useState({});

  function manejarCambio(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (erroresLocales[name]) {
      setErroresLocales((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function manejarEnvio(e) {
    e.preventDefault();
    onEnvio(form);
  }

  const errores = respuesta?.errores || erroresLocales;

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={manejarCambio}
          placeholder="Tu nombre"
          disabled={enviando}
          aria-invalid={!!errores.nombre}
        />
        {errores.nombre && (
          <span className="error" role="alert">
            {errores.nombre}
          </span>
        )}
      </div>

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

      {respuesta?.tipo === "exito" && (
        <p className="exito" role="alert">
          {respuesta.mensaje}
        </p>
      )}

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

export default FormularioCorreo;