import { AuthenticatedRequest } from '@/middlewares';
import { activitiesServices } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesServices.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function addActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activitiesId } = req.params;
    const activities = await activitiesServices.createActivities(userId, Number(activitiesId));
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getSaves(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activitiesId } = req.params;
    const activities = await activitiesServices.getSaves(userId, Number(activitiesId));
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
