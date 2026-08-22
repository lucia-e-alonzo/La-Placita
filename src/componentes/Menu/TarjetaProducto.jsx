// src/components/Menu/TarjetaProducto.jsx
import React from 'react'; // React necesario para el soporte de JSX

/**
 * COMPONENTE: TarjetaProducto
 * Recibe: 
 * - 'comida': Un objeto que contiene las propiedades del platillo (nombre, precio, img, etc.)
 * 
 * Este componente encapsula cómo se ve un platillo. Si mañana quieren cambiar 
 * el diseño de todas las tarjetas del menú, solo tocan este archivo.
 */
export default function TarjetaProducto({ comida }) {
  return (
    // 'article' es semánticamente correcto para representar una unidad de contenido independiente
    <article className="tarjeta-platillo">
      
      {/* Contenedor para control de estilo de imagen (aspect ratio, etc.) */}
      <div className="platillo-contenedor-img">
        <img
          src={comida.imagen}
          alt={comida.alt || comida.nombre} // Accesibilidad: usa texto descriptivo si existe
          className="platillo-imagen"
          loading="lazy" // Optimización: solo carga la imagen cuando está cerca del viewport
        />
      </div>

      <div className="platillo-detalles">
        <header className="platillo-encabezado">
          <h3 className="platillo-titulo">{comida.nombre}</h3>
          
          {/* aria-label mejora la accesibilidad para que lectores de pantalla entiendan el valor */}
          <span className="platillo-precio" aria-label={`Precio: ${comida.precio} quetzales`}>
            {/* toFixed(2) asegura que el precio siempre tenga formato monetario, ej: 35.00 */}
            Q{Number(comida.precio).toFixed(2)}
          </span>
        </header>

        <p className="platillo-descripcion">{comida.descripcion}</p>

        {/* Lógica condicional: solo renderiza el aviso si el platillo NO está disponible */}
        {!comida.disponible && (
          <span className="platillo-agotado" role="status">
            Agotado por hoy
          </span>
        )}
      </div>
    </article>
  );
}