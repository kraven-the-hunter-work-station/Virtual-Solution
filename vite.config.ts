import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Important for subdomain deployment
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Ensure PHP files are not processed by Vite
    rollupOptions: {
      external: [
        /\.php$/
      ]
    }
  },
  server: {
    proxy: {
      // Proxy API requests to a PHP-capable server
      '/src/config': {
        target: 'http://localhost:8000', // You need to run a PHP server for this
        changeOrigin: true,
        secure: false,
      },
      // Proxy Server requests during development
      '/Server': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // Don't include PHP files in the asset processing
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif']
});
