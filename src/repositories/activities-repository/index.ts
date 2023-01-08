import { prisma } from '@/config';

async function getActivities() {
  return prisma.activities.findMany({
    include: {
      Location: true,
    },
  });
}

async function findActivity(id: number) {
  return prisma.activities.findFirst({
    where: { id },
    include: {
      Location: true,
    },
  });
}

async function registerUserActivity(userId: number, id: number) {
  return prisma.userActivities.create({
    data: {
      userId,
      activitiesId: id,
    },
  });
}

async function updateSlots(id: number, slots: number) {
  return prisma.activities.update({
    where: {
      id,
    },
    data: {
      slots,
    },
  });
}

const activitiesRepository = {
  getActivities,
  findActivity,
  registerUserActivity,
  updateSlots,
};

export { activitiesRepository };
