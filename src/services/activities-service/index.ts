import { notFoundError } from '@/errors';
import { activitiesRepository } from '@/repositories/activities-repository';

async function getActivities() {
  const activities = await activitiesRepository.getActivities();

  if (!activities) throw notFoundError();
  return activities;
}

const activitiesServices = {
  getActivities,
};

export { activitiesServices };
