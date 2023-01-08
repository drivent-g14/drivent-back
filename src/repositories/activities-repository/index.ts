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
  return prisma.userActivities.create({
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

async function findUserActivities(userId: number, id: number) {
  return prisma.userActivities.findFirst({
    where: {
      userId,
      activitiesId: id,
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
