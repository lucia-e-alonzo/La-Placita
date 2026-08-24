// Footer.jsx
// Componente principal del footer. Carga datos desde la API backend.
// Distribuye datos a sub-componentes Correo.

import { useState, useEffect } from "react";
import Correo from "./Correo/Correo";

// URL base de la API backend
const API_URL = "http://localhost:5001/api";

function Footer() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Carga los datos del footer desde el backend al montar el componente
  useEffect(() => {
    fetch(`${API_URL}/footer`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el footer");
        return res.json();
      })
      .then((data) => {
        setDatos(data.datos);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <footer aria-busy="true">
        <p>Cargando información...</p>
      </footer>
    );
  }

  if (error) {
    return (
      <footer role="alert">
        <p>No se pudo cargar el footer: {error}</p>
      </footer>
    );
  }

  return (
    <footer aria-label="Pie de página de La Placita">
      {/* Información del restaurante */}
      <div className="footer-info">
        <h2>{datos.nombre}</h2>
        <p>{datos.slogan}</p>

        <ul>
          <li>📍 {datos.direccion}</li>
          <li>
            <a href={`tel:${datos.telefono}`}>📞 {datos.telefono}</a>
          </li>
          <li>
            <a href={`mailto:${datos.email}`}>✉️ {datos.email}</a>
          </li>
          <li>🕐 {datos.horario}</li>
        </ul>

        <nav>
          <ul className="footer-redes">
            {datos.redesSociales.map((red) => (
              <li key={red.id}>
                <a
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${red.nombre}`}
                >
                  {red.nombre}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Formulario de contacto */}
      <Correo />

      {/* Copyright con año dinámico */}
      <div className="footer-barra-inferior">
        <p>
          © {new Date().getFullYear()} {datos.nombre}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;