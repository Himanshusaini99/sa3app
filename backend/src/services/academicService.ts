import prisma from '../client.ts';

export const getSubjects = async (userId: string) => {
  // For simplicity, we return all subjects. In a real app, we'd filter by user's semester
  return await prisma.subject.findMany({
    where: { isDeleted: false }
  });
};

export const getAttendance = async (userId: string) => {
  const attendances = await prisma.attendance.findMany({
    where: { userId, isDeleted: false },
    include: { subject: true }
  });

  // Group by subject to calculate percentage
  const subjects = await prisma.subject.findMany({ where: { isDeleted: false } });
  
  return subjects.map(subject => {
    const subjectAttendances = attendances.filter(a => a.subjectId === subject.id);
    const total = subjectAttendances.length;
    const present = subjectAttendances.filter(a => a.status === 'PRESENT').length;
    const percentage = total > 0 ? (present / total) * 100 : 0;

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      total,
      present,
      absent: total - present,
      percentage
    };
  });
};

export const getMarks = async (userId: string) => {
  return await prisma.mark.findMany({
    where: { userId, isDeleted: false },
    include: { subject: true }
  });
};

export const getTimetable = async (userId: string) => {
  // In a real app, we'd filter by user's section/semester
  return await prisma.timetableEntry.findMany({
    where: { isDeleted: false },
    include: { subject: true }
  });
};

export const getFees = async (userId: string) => {
  return await prisma.fee.findMany({
    where: { userId, isDeleted: false }
  });
};
