/**
 * RuralCare AI — Full-Stack Server Entry Point
 * Mounts modular REST API routes under /api and integrates Vite SPA middlewares.
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import apiRouter from './server/routes/api.ts';
import { errorHandler } from './server/middleware/auth.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(distPath) && fs.existsSync(path.resolve(distPath, 'index.html'));
  const isProduction = process.env.NODE_ENV === 'production' || hasDist;

  // In AI Studio containers (both dev and Cloud Run preview/published), Nginx reverse proxy
  // binds to 8080 and routes app traffic to port 3000. Express must bind to 3000.
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Mount API Routes
  app.use('/api', apiRouter);

  // Global Error Handler
  app.use(errorHandler);

  // Frontend Serving: In production or when dist folder exists, serve static assets. In dev, mount Vite middleware.
  if (isProduction && hasDist) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[RuralCare AI Server] Active on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('[RuralCare AI Server] Fatal error during server startup:', err);
  process.exit(1);
});
