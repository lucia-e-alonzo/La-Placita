import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');

const pool = new Pool({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL
});

async function migrateData() {
  try {
    console.log('🔄 Iniciando migración de datos...\n');

    const jsonFiles = ['desayunos.json', 'almuerzos.json', 'antojitos.json', 'bebidas.json'];
    let totalInserted = 0;

    for (const file of jsonFiles) {
      const filePath = path.join(dataDir, file);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  Archivo no encontrado: ${file}`);
        continue;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);

      for (const platillo of data.platillos) {
        const query = `
          INSERT INTO platillos (id, nombre, categoria, precio, descripcion, imagen, alt, disponible)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO NOTHING
        `;
        
        await pool.query(query, [
          platillo.id,
          platillo.nombre,
          platillo.categoria,
          parseFloat(platillo.precio),
          platillo.descripcion,
          platillo.imagen,
          platillo.alt,
          platillo.disponible
        ]);
        
        totalInserted++;
        console.log(`✅ Insertado: ${platillo.nombre}`);
      }
    }

    console.log(`\n🎉 Migración completada! ${totalInserted} platillos insertados.`);
  } catch (error) {
    console.error('❌ Error en migración:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrateData();