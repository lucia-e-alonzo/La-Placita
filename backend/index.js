// index.js
// Servidor principal de Express.
// Configura middleware de CORS y JSON, importa las rutas, y pone el servidor a escuchar.

import express from "express";
import cors from "cors";
import correoRoutes from "./correo.routes.js";

const app = express();
const PORT = 5001;

// Middleware CORS: permite que el frontend (localhost:5173) haga solicitudes al backend (localhost:5001)
app.use(cors());

// Middleware para parsear JSON: convierte el body de las solicitudes en objetos JavaScript
app.use(express.json());

// Registra todas las rutas bajo /api (GET /api/footer, POST /api/contacto, etc.)
app.use("/api", correoRoutes);

// Pone el servidor a escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`✓ Servidor en http://localhost:${PORT}`);
});