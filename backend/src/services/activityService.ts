import prisma from '../client.ts';

export const getActivities = async () => {
  return await prisma.activity.findMany({
    where: { isDeleted: false }
  });
};

export const registerForActivity = async (userId: string, activityId: number) => {
  // Check if already registered
  const existing = await prisma.activityRegistration.findFirst({
    where: { userId, activityId, isDeleted: false }
  });

  if (existing) {
    throw new Error('Already registered for this activity');
  }

  return await prisma.activityRegistration.create({
    data: {
      userId,
      activityId,
      status: 'REGISTERED'
    }
  });
};

export const getPoints = async (userId: string) => {
  const registrations = await prisma.activityRegistration.findMany({
    where: { userId, status: 'COMPLETED', isDeleted: false },
    include: { activity: true }
  });

  const totalPoints = registrations.reduce((sum, reg) => sum + reg.activity.points, 0);
  return { totalPoints };
};
