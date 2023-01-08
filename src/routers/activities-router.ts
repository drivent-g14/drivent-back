import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addActivities, getSaves, listActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', listActivities)
  .get('/activitiesId', getSaves)
  .post('/:activitiesId', addActivities);

export { activitiesRouter };
