// src/components/Menu/CategoriaFiltro.jsx

/**
 * COMPONENTE: CategoriaFiltro
 * Recibe:
 * - 'listaCategorias': Arreglo de strings con los nombres de categorías (ej: ['Todos', 'Desayunos']).
 * - 'categoriaActual': String con la categoría seleccionada actualmente.
 * - 'onCambiarCategoria': Función callback que el padre ejecuta para actualizar su estado.
 */
export default function CategoriaFiltro({ listaCategorias, categoriaActual, onCambiarCategoria }) {
  return (
    // 'nav' es semánticamente correcto para una navegación (en este caso, de filtros)
    <nav className="menu-filtros" aria-label="Categorías de comida">
      {listaCategorias.map((nombreCategoria) => {
        // Determinamos si este botón es el que está activo para aplicar estilos CSS
        const estaActivo = categoriaActual.toLowerCase() === nombreCategoria.toLowerCase();

        return (
          <button
            key={nombreCategoria}
            type="button"
            // Aplicamos clase dinámica 'activo' si coincide con el estado actual
            className={`boton-categoria ${estaActivo ? 'activo' : ''}`}
            // Elevamos el estado: avisamos al padre que el usuario hizo clic
            onClick={() => onCambiarCategoria(nombreCategoria)}
            // Accesibilidad: notifica al lector de pantalla si el botón está "presionado"
            aria-pressed={estaActivo}
          >
            {nombreCategoria}
          </button>
        );
      })}
    </nav>
  );
}