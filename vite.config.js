import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173, // forzar puerto 5173
    strictPort: true, // si esta ocupado, Vite va a fallar
  },
});