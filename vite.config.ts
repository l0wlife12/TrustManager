import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'static-pages',
      apply: 'serve',
      configureServer(server: any) {
        server.middlewares.use((req: any, res: any, next: any) => {
          // Servir directement les fichiers HTML statiques sans passer par React
          if (req.url === '/terms' || req.url === '/terms/') {
            const filePath = path.join(process.cwd(), 'public/terms.html');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(filePath));
              return;
            }
          } else if (req.url === '/privacy' || req.url === '/privacy/') {
            const filePath = path.join(process.cwd(), 'public/privacy.html');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(filePath));
              return;
            }
          } else if (req.url === '/cookies' || req.url === '/cookies/') {
            const filePath = path.join(process.cwd(), 'public/cookies.html');
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(filePath));
              return;
            }
          }
          next();
        });
      }
    },
    react(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 8000,
    host: 'localhost',
    open: true,
  },
});
