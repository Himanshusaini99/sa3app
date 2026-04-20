import prisma from '../client.ts';

export const getClasses = async (userId: string) => {
  // We assume facultyName in TimetableEntry matches User.name
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  return await prisma.timetableEntry.findMany({
    where: { facultyName: user.name || '', isDeleted: false },
    include: { subject: true }
  });
};

export const markAttendance = async (data: { studentId: string; subjectId: number; status: string }) => {
  return await prisma.attendance.create({
    data: {
      userId: data.studentId,
      subjectId: data.subjectId,
      date: new Date(),
      status: data.status
    }
  });
};

export const updateRequestStatus = async (requestId: number, status: string) => {
  return await prisma.request.update({
    where: { id: requestId },
    data: { status }
  });
};
