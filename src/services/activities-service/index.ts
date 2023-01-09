import { conflictError, notFoundError } from '@/errors';
import { activitiesRepository } from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getActivities() {
  const activities = await activitiesRepository.getActivities();

  if (!activities) throw notFoundError();
  return activities;
}

async function createActivities(userId: number, id: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.TicketType.isRemote || ticket.status === 'RESERVED') {
    throw notFoundError();
  }

  const activities = await activitiesRepository.findActivities(id);
  if (!activities) throw notFoundError();
  if (activities.slots === 0) throw notFoundError();
  const saves = await activitiesRepository.findUserActivities(userId);

  const { startsAt, endsAt } = activities;
  const resultHours = saves.map((value) => {
    return [value.Activities.startsAt, value.Activities.endsAt];
  });
  let arr = 0;
  resultHours.map((value) => {
    if (value[0] === startsAt && value[1] === endsAt) arr = 1;
    if (value[0] <= startsAt && endsAt <= value[1]) arr = 2;
    if (value[0] <= startsAt && startsAt < value[1] && endsAt >= value[1]) arr = 3;
    if (startsAt <= value[0] && endsAt > value[0] && endsAt <= value[1]) arr = 4;
  });

  if (arr !== 0) {
    throw conflictError('ConflictError');
  }

  await activitiesRepository.updateSlotsActivities(id, activities.slots - 1);
  const result = await activitiesRepository.registerUserActivities(userId, id);
  return result;
}

async function getActivitiesById(userId: number) {
  const result = await activitiesRepository.findUserActivities(userId);
  return result;
}

const activitiesServices = {
  getActivities,
  createActivities,
  getActivitiesById,
};

export { activitiesServices };
