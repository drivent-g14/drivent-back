import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addActivities, listActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.get('/', listActivities).post('/:activitiesId', addActivities);

export { activitiesRouter };
