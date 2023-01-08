import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken);

export { activitiesRouter };
