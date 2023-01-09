import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addActivities, getActivitiesById, listActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/list', getActivitiesById)
  .get('/', listActivities)
  .post('/:activitiesId', addActivities);

export { activitiesRouter };
