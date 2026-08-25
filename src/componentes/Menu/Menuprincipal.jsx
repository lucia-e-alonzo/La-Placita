// src/components/Menu/Menu.jsx
import { useState, useEffect } from 'react';
import CategoriaFiltro from './CategoriaFiltro';
import TarjetaProducto from './TarjetaProducto';
import { obtenerCategorias, obtenerPlatillosPorCategoria } from '../../services/api';

export default function Menu() {
  // 1. ESTADOS LOCALES
  // Manejan la categoría activa, la lista de botones, la comida a mostrar, y los estados de UI (carga/error).
  const [categoriaActual, setCategoriaActual] = useState('Todos');
  const [listaCategorias, setListaCategorias] = useState([]);
  const [platillos, setPlatillos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState(null);

  // 2. EFECTO INICIAL: Carga de Categorías
  // Se ejecuta una sola vez al montar el componente para poblar los botones de filtro.
  useEffect(() => {
    obtenerCategorias()
      .then((datos) => {
        if (datos.success) {
          setListaCategorias(datos.categorias);
        }
      })
      .catch((error) => {
        console.error('Error al cargar categorías:', error);
        // Respaldo de seguridad en caso de fallo crítico
        setListaCategorias(['Todos', 'Desayunos', 'Almuerzos', 'Bebidas', 'Antojitos']);
      });
  }, []);

  // 3. EFECTO REACTIVO: Carga de Platillos por Categoría
  // Se vuelve a disparar cada vez que el usuario cambia la categoría activa.
  useEffect(() => {
    setCargando(true);
    setMensajeError(null);

    obtenerPlatillosPorCategoria(categoriaActual)
      .then((datos) => {
        if (datos.success) {
          setPlatillos(datos.platillos);
        } else {
          setPlatillos([]);
        }
        setCargando(false);
      })
      .catch((error) => {
        setMensajeError(error.message);
        setPlatillos([]);
        setCargando(false);
      });
  }, [categoriaActual]);

  // 4. RENDERIZADO DE LA INTERFAZ
  return (
    <section className="seccion-menu" aria-label="Menú del Comedor">
      <header className="menu-cabecera">
        <h2 tabIndex="0">Nuestro Menú</h2>
        <p>Comida casera, fresca y preparada con el auténtico sazón de Don Chente.</p>
      </header>

      {/* Componente de Control: Envía el estado y la función para modificarlo */}
      <CategoriaFiltro 
        listaCategorias={listaCategorias} 
        categoriaActual={categoriaActual} 
        onCambiarCategoria={setCategoriaActual} 
      />

      {/* Manejo de Estados de UI (Carga, Errores y Vacíos con soporte de accesibilidad) */}
      <div aria-live="polite" className="menu-estado">
        {cargando && (
          <div className="mensaje-cargando" role="status">
            <p>Preparando los platillos...</p>
          </div>
        )}

        {mensajeError && !cargando && (
          <div className="mensaje-error" role="alert">
            <p>⚠️ Ocurrió un problema: {mensajeError}</p>
          </div>
        )}

        {!cargando && !mensajeError && platillos.length === 0 && (
          <p className="menu-vacio">Por el momento no hay platillos disponibles en esta sección.</p>
        )}
      </div>

      {/* Renderizado Dinámico y Reutilizable de las Tarjetas */}
      {!cargando && !mensajeError && platillos.length > 0 && (
        <div className="menu-rejilla">
          {platillos.map((comida) => (
            <TarjetaProducto key={comida.id} comida={comida} />
          ))}
        </div>
      )}
    </section>
  );
}