import { Hono } from 'hono';
import * as requestController from '../controllers/requestController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const requestRoutes = new Hono();

requestRoutes.use('/*', authMiddleware);

requestRoutes.get('/', requestController.getRequests);
requestRoutes.post('/leave', requestController.submitLeave);
requestRoutes.post('/query', requestController.submitQuery);

export default requestRoutes;
