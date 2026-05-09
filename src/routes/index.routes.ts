import express from 'express';
import healthRoutes from './health.routes.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/health',
    route: healthRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
