import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // Forzamos el puerto 5000
    strictPort: true, // Si el 5000 está ocupado, Vite fallará en lugar de saltar a otro puerto
  },
});