// src/services/api.js

// 1. IMPORTACIONES ESTÁTICAS
// Al no tener backend, importamos los archivos .json directamente como módulos de JavaScript.
// Esto permite que Vite los empaquete y los sirva desde el cliente.
import desayunosData from '../../data/desayunos.json';
import almuerzosData from '../../data/almuerzos.json';
import bebidasData from '../../data/bebidas.json';
import antojitosData from '../../data/antojitos.json';

// 2. MAPA DE DATOS (Centralización)
// Creamos un diccionario 'menuMap' que actúa como nuestro "servidor en memoria".
// Normalizamos el acceso: si el JSON tiene una propiedad "platillos", la usamos;
// de lo contrario, asumimos que el JSON es el arreglo directamente.
const menuMap = {
  desayunos: desayunosData.platillos || desayunosData,
  almuerzos: almuerzosData.platillos || almuerzosData,
  bebidas: bebidasData.platillos || bebidasData,
  antojitos: antojitosData.platillos || antojitosData
};

// 3. FUNCIÓN: obtenerCategorias
// Esta función extrae las llaves de nuestro mapa (desayunos, almuerzos, etc.)
// y las formatea para los botones del filtro (Mayúscula inicial).
// Siempre añade 'Todos' al inicio para tener una vista global.
export async function obtenerCategorias() {
  const categorias = Object.keys(menuMap);
  const categoriasFormateadas = categorias.map(
    cat => cat.charAt(0).toUpperCase() + cat.slice(1)
  );
  
  return {
    success: true,
    categorias: ['Todos', ...categoriasFormateadas]
  };
}

// 4. FUNCIÓN: obtenerPlatillosPorCategoria
// El motor de búsqueda del menú. 
// - Si es 'Todos', recorre todas las categorías y concatena los platillos en un solo arreglo.
// - Si es una categoría específica, busca en el mapa.
// - Maneja el error si la categoría no existe, cumpliendo con la robustez que exigía tu líder.
export async function obtenerPlatillosPorCategoria(categoria) {
  const catLower = categoria.toLowerCase();

  // Caso: Solicitar la vista general
  if (catLower === 'todos') {
    let todosLosPlatillos = [];
    Object.values(menuMap).forEach(lista => {
      todosLosPlatillos = todosLosPlatillos.concat(lista);
    });

    return {
      success: true,
      categoria: 'Todos',
      total: todosLosPlatillos.length,
      platillos: todosLosPlatillos
    };
  }

  // Caso: Solicitar una categoría específica
  const platillos = menuMap[catLower];

  // Validación defensiva: lanza un error si la categoría no es reconocida
  if (!platillos) {
    throw new Error(`No encontramos ningún menú para la categoría: ${categoria}`);
  }

  return {
    success: true,
    categoria: categoria,
    platillos: platillos
  };
}