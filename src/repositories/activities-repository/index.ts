import { prisma } from '@/config';

async function getActivities() {
  return prisma.activities.findMany({
    include: {
      Location: true,
    },
  });
}

async function findActivities(id: number) {
  return prisma.activities.findFirst({
    where: { id },
    include: {
      Location: true,
    },
  });
}

async function registerUserActivities(userId: number, id: number) {
  return prisma.userActivities.createMany({
    data: {
      userId,
      activitiesId: id,
    },
  });
}

async function updateSlotsActivities(id: number, slots: number) {
  return prisma.activities.update({
    where: {
      id,
    },
    data: {
      slots,
    },
  });
}

async function findUserActivities(userId: number) {
  return prisma.userActivities.findMany({
    where: {
      userId,
    },
    include: {
      Activities: true,
    },
  });
}

const activitiesRepository = {
  getActivities,
  findActivities,
  registerUserActivities,
  updateSlotsActivities,
  findUserActivities,
};

export { activitiesRepository };
