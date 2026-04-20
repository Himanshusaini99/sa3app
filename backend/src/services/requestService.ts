import prisma from '../client.ts';

export const getRequests = async (userId: string) => {
  return await prisma.request.findMany({
    where: { userId, isDeleted: false },
    orderBy: { createdAt: 'desc' }
  });
};

export const submitLeave = async (userId: string, data: { reason: string; startDate: string; endDate: string }) => {
  return await prisma.request.create({
    data: {
      userId,
      type: 'LEAVE',
      message: data.reason,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: 'PENDING'
    }
  });
};

export const submitQuery = async (userId: string, data: { subject: string; message: string }) => {
  return await prisma.request.create({
    data: {
      userId,
      type: 'QUERY',
      subject: data.subject,
      message: data.message,
      status: 'PENDING'
    }
  });
};
