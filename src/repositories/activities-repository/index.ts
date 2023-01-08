import { prisma } from '@/config';

async function getActivities() {
  return prisma.activities.findMany({
    include: {
      Location: true,
    },
  });
}

const activitiesRepository = {
  getActivities,
};

export { activitiesRepository };
