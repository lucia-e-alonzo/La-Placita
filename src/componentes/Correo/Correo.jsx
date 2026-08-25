// Correo.jsx
// Contenedor de estado para el formulario de contacto.
// Maneja el envío de datos, estados de carga, y respuestas del servidor.
// Delega la UI al componente FormularioCorreo.

import { useState } from "react";
import FormularioCorreo from "./FormularioCorreo";

const API_URL = "http://localhost:5001/api";

function Correo() {
  const [enviando, setEnviando] = useState(false); // Indica si se está enviando la solicitud
  const [respuesta, setRespuesta] = useState(null); // Almacena la respuesta del servidor (éxito o error)

  // Envía el formulario al backend y maneja la respuesta
  async function manejarEnvio(datos) {
    setEnviando(true);
    setRespuesta(null);

    try {
      // Realiza solicitud POST al endpoint /api/contacto con los datos del formulario
      const res = await fetch(`${API_URL}/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await res.json();

      // Si el servidor responde con éxito, guarda el mensaje de confirmación
      if (resultado.exitoso) {
        setRespuesta({
          tipo: "exito",
          mensaje: resultado.mensaje,
        });
      } else {
        // Si hay errores de validación en el servidor, los guarda para mostrarlos en el formulario
        setRespuesta({
          tipo: "error",
          errores: resultado.errores,
        });
      }
    } catch (error) {
      // Si falla la conexión con el servidor (backend no disponible)
      setRespuesta({
        tipo: "error",
        mensaje: "Error de conexión con el servidor.",
      });
    } finally {
      setEnviando(false);
    }
  }

  // Pasa el manejador de envío al FormularioCorreo como prop
  return (
    <div className="correo-contenedor">
      <h3>Reservas y consultas</h3>
      <FormularioCorreo
        onEnvio={manejarEnvio}
        enviando={enviando}
        respuesta={respuesta}
      />
    </div>
  );
}

export default Correo;