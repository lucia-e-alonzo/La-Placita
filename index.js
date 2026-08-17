// ====================================================================
// HERRAMIENTAS QUE NECESITAMOS (IMPORTACIONES)
// ====================================================================

// Express: Es la herramienta que nos permite crear el servidor web
import express from 'express';

// Cors: Es un permiso de seguridad para que la página web (React) 
// pueda pedirle datos a este servidor sin que el navegador la bloquee
import cors from 'cors';

// fs/promises: Nos permite abrir, leer y revisar los archivos en la computadora
import fs from 'fs/promises';

// path y url: Nos ayudan a saber exactamente en qué carpeta estamos parados
import path from 'path';
import { fileURLToPath } from 'url';

// Configuramos la ruta de la carpeta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creamos nuestra aplicación de servidor
const app = express();

// Puerto donde va a funcionar el servidor (el 5000)
const PORT = process.env.PORT || 5000;

// Ruta directa a la carpeta "data" donde Don Chente guarda los archivos de comida
const DATA_DIR = path.join(__dirname, 'data');


// ====================================================================
// PERMISOS Y CONFIGURACIONES (MIDDLEWARES)
// ====================================================================

// Damos permiso para que cualquier pantalla pueda pedir información
app.use(cors());

// Le enseñamos al servidor a entender información en formato JSON
app.use(express.json());


// ====================================================================
// FUNCIÓN AUXILIAR (EL AYUDANTE)
// ====================================================================

// Esta función busca un archivo (ej: "desayunos.json"), lo abre,
// lee lo que tiene adentro y lo convierte en texto entendible para JavaScript
const leerArchivoCategoria = async (nombreArchivo) => {
  const filePath = path.join(DATA_DIR, nombreArchivo);
  const rawData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(rawData);
};


// ====================================================================
// RUTAS DEL SERVIDOR (LO QUE LA GENTE O REACT PUEDE PEDIR)
// ====================================================================

// 1. RUTA PARA OBTENER LOS BOTONES DE CATEGORÍAS
// Dirección: http://localhost:5000/api/menu/categorias
app.get('/api/menu/categorias', async (req, res) => {
  try {
    // Revisa qué archivos existen dentro de la carpeta "data"
    const archivos = await fs.readdir(DATA_DIR);

    // Se queda únicamente con los que terminen en ".json"
    const jsonFiles = archivos.filter((file) => file.endsWith('.json'));

    // Le quita el ".json" al nombre y pone la primera letra en Mayúscula
    // Ejemplo: "desayunos.json" lo convierte en "Desayunos"
    const categorias = jsonFiles.map((file) => {
      const nombre = file.replace('.json', '');
      return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    });

    // Devuelve la lista agregando la opción "Todos" al principio
    return res.status(200).json({
      success: true,
      categorias: ['Todos', ...categorias]
    });
  } catch (error) {
    // Si algo sale mal leyendo la carpeta, avisa con este mensaje
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un problema al buscar las categorías de comida.',
      error: error.message
    });
  }
});


// 2. RUTA PARA OBTENER TODO EL MENÚ JUNTO
// Dirección: http://localhost:5000/api/menu
app.get('/api/menu', async (req, res) => {
  try {
    // Busca todos los archivos en la carpeta "data"
    const archivos = await fs.readdir(DATA_DIR);
    const jsonFiles = archivos.filter((file) => file.endsWith('.json'));

    let todosLosPlatillos = [];

    // Abre archivo por archivo (desayunos, almuerzos, etc.) y va juntando
    // todos los platillos en una sola lista grande
    for (const file of jsonFiles) {
      const data = await leerArchivoCategoria(file);
      const items = data.platillos || data;
      todosLosPlatillos = todosLosPlatillos.concat(items);
    }

    // Entrega toda la comida junta para la pantalla principal
    return res.status(200).json({
      success: true,
      categoria: 'Todos',
      total: todosLosPlatillos.length,
      platillos: todosLosPlatillos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mensaje: 'Hubo un error al juntar todos los platillos.',
      error: error.message
    });
  }
});


// 3. RUTA PARA PEDIR UNA SOLA CATEGORÍA
// Dirección: http://localhost:5000/api/menu/desayunos (o bebidas, almuerzos, etc.)
app.get('/api/menu/:categoria', async (req, res) => {
  try {
    // Captura la palabra que escribieron al final de la URL
    const { categoria } = req.params;

    // Si el usuario pide "todos", juntamos todo como en la ruta anterior
    if (categoria.toLowerCase() === 'todos') {
      const archivos = await fs.readdir(DATA_DIR);
      const jsonFiles = archivos.filter((file) => file.endsWith('.json'));
      let todosLosPlatillos = [];

      for (const file of jsonFiles) {
        const data = await leerArchivoCategoria(file);
        const items = data.platillos || data;
        todosLosPlatillos = todosLosPlatillos.concat(items);
      }

      return res.status(200).json({
        success: true,
        categoria: 'Todos',
        total: todosLosPlatillos.length,
        platillos: todosLosPlatillos
      });
    }

    // Si pidieron algo específico (ej. "bebidas"), arma el nombre del archivo: "bebidas.json"
    const fileName = `${categoria.toLowerCase()}.json`;

    // Abre únicamente ese archivo y saca los platillos
    const data = await leerArchivoCategoria(fileName);

    return res.status(200).json({
      success: true,
      categoria: categoria,
      platillos: data.platillos || data
    });
  } catch (error) {
    // Si el archivo no existe (por ejemplo si buscan /api/menu/pizzas que no vendemos)
    return res.status(404).json({
      success: false,
      mensaje: `No encontramos ningún menú para la categoría: ${req.params.categoria}`,
      error: error.message
    });
  }
});


// ====================================================================
// MENSAJE DE RUTA NO ENCONTRADA (POR SI SE ESCRIBE MAL LA DIRECCIÓN)
// ====================================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: 'La dirección que intentas abrir no existe en el servidor.'
  });
});


// ====================================================================
// ENCENDER EL SERVIDOR
// ====================================================================
// Ponemos a trabajar al servidor para que escuche llamadas en el puerto 5000
app.listen(PORT, () => {
  console.log(`✅ Servidor de La Placita listo y trabajando en http://localhost:${PORT}`);
});