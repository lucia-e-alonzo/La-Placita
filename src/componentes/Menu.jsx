// Traemos las herramientas de React para guardar datos en memoria (useState)
// y para hacer cosas automáticas al cargar la página (useEffect)
import { useState, useEffect } from 'react';

function Menu() {
  // 1. MEMORIA DEL COMPONENTE (ESTADOS)
  
  // Guarda qué categoría tiene seleccionada el cliente (empieza mostrando 'Todos')
  const [categoriaActual, setCategoriaActual] = useState('Todos');

  // Guarda la lista de botones de categorías que nos entrega el servidor
  const [listaCategorias, setListaCategorias] = useState([]);

  // Guarda los platillos de comida que se van a mostrar en pantalla
  const [platillos, setPlatillos] = useState([]);

  // Nos avisa si la página está ocupada trayendo la información (true / false)
  const [cargando, setCargando] = useState(true);

  // Guarda un mensaje de error por si se apaga el servidor o falla la conexión
  const [mensajeError, setMensajeError] = useState(null);


  // 2. PRIMERA TAREA: PEDIR LA LISTA DE CATEGORÍAS
  // Esto se ejecuta una sola vez cuando la página se abre por primera vez
  useEffect(() => {
    fetch('http://localhost:5000/api/menu/categorias')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo obtener la lista de categorías.');
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (datos.success) {
          setListaCategorias(datos.categorias);
        }
      })
      .catch((error) => {
        console.error('Error al cargar categorías:', error.message);
        // Si falla la ruta dinámica, dejamos al menos las opciones básicas de respaldo
        setListaCategorias(['Todos', 'Desayunos', 'Almuerzos', 'Bebidas', 'Antojitos']);
      });
  }, []);


  // 3. SEGUNDA TAREA: PEDIR LA COMIDA AL SERVIDOR
  // Esto se vuelve a ejecutar cada vez que el usuario hace clic en una categoría distinta
  useEffect(() => {
    // Avisamos que empieza la carga
    setCargando(true);
    setMensajeError(null);

    // Si la categoría es 'Todos', pedimos la ruta general (/api/menu)
    // Si es una específica, pedimos esa categoría (/api/menu/desayunos)
    const direccionServidor =
      categoriaActual.toLowerCase() === 'todos'
        ? 'http://localhost:5000/api/menu'
        : `http://localhost:5000/api/menu/${categoriaActual.toLowerCase()}`;

    fetch(direccionServidor)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo conectar con el comedor. Revisa tu conexión.');
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (datos.success) {
          setPlatillos(datos.platillos);
        } else {
          setPlatillos([]);
        }
        // Terminó de cargar exitosamente
        setCargando(false);
      })
      .catch((error) => {
        // Guardamos el mensaje de error y vaciamos la comida
        setMensajeError(error.message);
        setPlatillos([]);
        // Terminó la carga (con error)
        setCargando(false);
      });
  }, [categoriaActual]);


  // 4. LO QUE SE DIBUJA EN PANTALLA (ESTRUCTURA HTML SEMÁNTICA)
  return (
    <section className="seccion-menu" aria-label="Menú del Comedor">
      
      {/* Encabezado del menú */}
      <header className="menu-cabecera">
        <h2 tabIndex="0">Nuestro Menú</h2>
        <p>Comida casera, fresca y preparada con el auténtico sazón de Don Chente.</p>
      </header>

      {/* Botones para filtrar por tipo de comida */}
      <nav className="menu-filtros" aria-label="Categorías de comida">
        {listaCategorias.map((nombreCategoria) => {
          const estaActivo = categoriaActual.toLowerCase() === nombreCategoria.toLowerCase();

          return (
            <button
              key={nombreCategoria}
              type="button"
              className={`boton-categoria ${estaActivo ? 'activo' : ''}`}
              onClick={() => setCategoriaActual(nombreCategoria)}
              // Ayuda para Wendy: el lector avisa si el botón está seleccionado o no
              aria-pressed={estaActivo}
            >
              {nombreCategoria}
            </button>
          );
        })}
      </nav>

      {/* Área de mensajes para el lector de pantalla (Wendy) */}
      <div aria-live="polite" className="menu-estado">
        {/* Aviso mientras descarga datos */}
        {cargando && (
          <div className="mensaje-cargando" role="status">
            <p>Preparando los platillos...</p>
          </div>
        )}

        {/* Aviso si ocurrió un error */}
        {mensajeError && !cargando && (
          <div className="mensaje-error" role="alert">
            <p>⚠️ Ocurrió un problema: {mensajeError}</p>
          </div>
        )}

        {/* Aviso si la categoría está vacía */}
        {!cargando && !mensajeError && platillos.length === 0 && (
          <p className="menu-vacio">Por el momento no hay platillos disponibles en esta sección.</p>
        )}
      </div>

      {/* Cuadrícula donde aparecen las tarjetas de comida */}
      {!cargando && !mensajeError && platillos.length > 0 && (
        <div className="menu-rejilla">
          {platillos.map((comida) => (
            <article key={comida.id} className="tarjeta-platillo">
              
              {/* Imagen con su descripción en texto (alt) obligatoria para accesibilidad */}
              <div className="platillo-contenedor-img">
                <img
                  src={comida.imagen}
                  alt={comida.alt || comida.nombre}
                  className="platillo-imagen"
                  loading="lazy"
                />
              </div>

              {/* Información del platillo */}
              <div className="platillo-detalles">
                <header className="platillo-encabezado">
                  <h3 className="platillo-titulo">{comida.nombre}</h3>
                  <span className="platillo-precio" aria-label={`Precio: ${comida.precio} quetzales`}>
                    Q{Number(comida.precio).toFixed(2)}
                  </span>
                </header>

                <p className="platillo-descripcion">{comida.descripcion}</p>

                {/* Si el platillo no está disponible, se muestra un aviso */}
                {!comida.disponible && (
                  <span className="platillo-agotado" role="status">
                    Agotado por hoy
                  </span>
                )}
              </div>

            </article>
          ))}
        </div>
      )}

    </section>
  );
}

export default Menu;