import { useState } from "react";
import FormularioCorreo from "./FormularioCorreo";
import './Correo.css';

const API_URL = "http://localhost:5001/api";

function Correo() {
  const [enviando, setEnviando] = useState(false);
  const [respuesta, setRespuesta] = useState(null);

  async function manejarEnvio(datos) {
    setEnviando(true);
    setRespuesta(null);

    try {
      const res = await fetch(`${API_URL}/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await res.json();

      if (resultado.exitoso) {
        setRespuesta({
          tipo: "exito",
          mensaje: resultado.mensaje,
        });
      } else {
        setRespuesta({
          tipo: "error",
          errores: resultado.errores,
        });
      }
    } catch (error) {
      setRespuesta({
        tipo: "error",
        mensaje: "Error de conexión con el servidor.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="correo-contenedor">
      <h3>Contáctanos</h3>
      <FormularioCorreo
        onEnvio={manejarEnvio}
        enviando={enviando}
        respuesta={respuesta}
      />
    </div>
  );
}

export default Correo;