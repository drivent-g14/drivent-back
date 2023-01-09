import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addActivities, listActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', listActivities).post('/:activitiesId', addActivities);

export { activitiesRouter };
