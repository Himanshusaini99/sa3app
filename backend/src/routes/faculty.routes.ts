import { Hono } from 'hono';
import * as facultyController from '../controllers/facultyController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const facultyRoutes = new Hono();

facultyRoutes.use('/*', authMiddleware);

facultyRoutes.get('/classes', facultyController.getClasses);
facultyRoutes.post('/attendance', facultyController.markAttendance);
facultyRoutes.patch('/requests/:id', facultyController.updateRequestStatus);

export default facultyRoutes;
