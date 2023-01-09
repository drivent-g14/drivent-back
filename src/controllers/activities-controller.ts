import { AuthenticatedRequest } from '@/middlewares';
import { activitiesServices } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await activitiesServices.getActivities();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function addActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activitiesId } = req.params;
    const result = await activitiesServices.createActivities(Number(userId), Number(activitiesId));
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getActivitiesById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const result = await activitiesServices.getActivitiesById(Number(userId));
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
