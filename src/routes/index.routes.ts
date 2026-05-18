import express from 'express';
import healthRoutes from './health.routes.js';
import qrRoutes from './qr.routes.js';
import notificationRoutes from './notification.routes.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/health',
    route: healthRoutes,
  },
  {
    path: '/qr',
    route: qrRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
