import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5001, // Forzamos el puerto 5001
    strictPort: true, // Si el 5001 está ocupado, Vite fallará en lugar de saltar a otro puerto
  },
});