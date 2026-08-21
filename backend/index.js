import express from "express";
import cors from "cors";
import correoRoutes from "./correo.routes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", correoRoutes);

app.listen(PORT, () => {
  console.log(`✓ Servidor en http://localhost:${PORT}`);
});