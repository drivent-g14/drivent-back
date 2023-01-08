import { notFoundError } from '@/errors';
import { activitiesRepository } from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getActivities() {
  const activities = await activitiesRepository.getActivities();

  if (!activities) throw notFoundError();
  return activities;
}

async function getSaves(userId: number, id: number) {
  const result = await activitiesRepository.findUserActivities(userId, id);
  return result;
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

  await activitiesRepository.updateSlotsActivities(id, activities.slots - 1);
  const result = await activitiesRepository.registerUserActivities(userId, id);

  return result;
}

const activitiesServices = {
  getActivities,
  createActivities,
  getSaves,
};

export { activitiesServices };
