import { Hono } from 'hono';
import * as activityController from '../controllers/activityController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const activityRoutes = new Hono();

activityRoutes.use('/*', authMiddleware);

activityRoutes.get('/', activityController.getActivities);
activityRoutes.post('/register', activityController.registerForActivity);
activityRoutes.get('/points', activityController.getPoints);

export default activityRoutes;
