import { notFoundError } from '@/errors';
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
  const resultStartsAt = saves.map((value) => value.Activities.startsAt);
  const resultEndsAt = saves.map((value) => value.Activities.endsAt);

  const finalStartsAt = resultStartsAt.filter((value) => value === startsAt);
  const finalEndsAt = resultEndsAt.filter((value) => value === endsAt);
  const intervalStartsAt = resultEndsAt.filter((value) => value === startsAt);
  const intervalEndsAt = resultStartsAt.filter((value) => value === endsAt);

  if (
    finalStartsAt.length !== 0 ||
    finalEndsAt.length !== 0 ||
    intervalStartsAt.length !== 0 ||
    intervalEndsAt.length !== 0
  ) {
    throw notFoundError();
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
