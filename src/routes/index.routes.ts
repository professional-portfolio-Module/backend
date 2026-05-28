import express from 'express';
import healthRoutes from './health.routes.js';
import qrRoutes from './qr.routes.js';
import notificationRoutes from './notification.routes.js';
import categoryRoutes from './category.routes.js';
import equipmentRoutes from './equipment.routes.js';
import hotelRoutes from './hotel.routes.js';
import userRoutes from './user.routes.js';
import roleRoutes from './role.routes.js';
import messageRoutes from './message.routes.js';
import manualTaskRoutes from './manualTask.routes.js';
import maintenanceScheduleRoutes from './maintenanceSchedule.routes.js';
import scheduledTaskRoutes from './scheduledTask.routes.js';

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
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/equipment',
    route: equipmentRoutes,
  },
  {
    path: '/hotels',
    route: hotelRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/roles',
    route: roleRoutes,
  },
  {
    path: '/messages',
    route: messageRoutes,
  },
  {
    path: '/manual-tasks',
    route: manualTaskRoutes,
  },
  {
    path: '/maintenance-schedules',
    route: maintenanceScheduleRoutes,
  },
  {
    path: '/scheduled-tasks',
    route: scheduledTaskRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

