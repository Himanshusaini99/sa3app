import { Hono } from 'hono';
import * as academicController from '../controllers/academicController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const academicRoutes = new Hono();

academicRoutes.use('/*', authMiddleware);

academicRoutes.get('/subjects', academicController.getSubjects);
academicRoutes.get('/attendance', academicController.getAttendance);
academicRoutes.get('/marks', academicController.getMarks);
academicRoutes.get('/timetable', academicController.getTimetable);
academicRoutes.get('/fees', academicController.getFees);

export default academicRoutes;
