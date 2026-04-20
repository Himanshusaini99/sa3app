import { PrismaClient } from './generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Subjects
  const subjects = [
    { name: 'Operating Systems', code: 'CS301', semester: 5 },
    { name: 'Database Management Systems', code: 'CS302', semester: 5 },
    { name: 'Computer Networks', code: 'CS303', semester: 5 },
    { name: 'Software Engineering', code: 'CS304', semester: 5 },
    { name: 'Design and Analysis of Algorithms', code: 'CS305', semester: 5 },
  ];

  for (const s of subjects) {
    await prisma.subject.upsert({
      where: { id: subjects.indexOf(s) + 1 },
      update: {},
      create: s,
    });
  }

  // Create Activities
  const activities = [
    { title: 'Cloud Computing Workshop', description: 'Learn AWS and Azure basics', date: new Date(), location: 'Lab 4', points: 20, type: 'WORKSHOP' },
    { title: 'Annual Sports Meet', description: 'Participate in various sports events', date: new Date(), location: 'Ground', points: 15, type: 'SPORT' },
    { title: 'Coding Contest', description: 'Algorithmic problem solving', date: new Date(), location: 'Online', points: 30, type: 'COMPETITION' },
  ];

  for (const a of activities) {
    await prisma.activity.create({ data: a });
  }

  // Create Student User
  const passwordHash = await bcrypt.hash('password123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@edusmart.com' },
    update: {},
    create: {
      email: 'student@edusmart.com',
      name: 'John Doe',
      role: 'STUDENT',
      identities: {
        create: {
          provider: 'EmailPassword',
          providerId: 'student@edusmart.com',
          metadata: { passwordHash }
        }
      }
    }
  });

  // Create Faculty User
  await prisma.user.upsert({
    where: { email: 'faculty@edusmart.com' },
    update: {},
    create: {
      email: 'faculty@edusmart.com',
      name: 'Dr. Jane Smith',
      role: 'FACULTY',
      identities: {
        create: {
          provider: 'EmailPassword',
          providerId: 'faculty@edusmart.com',
          metadata: { passwordHash }
        }
      }
    }
  });

  // Create some attendance for student
  const dbSubjects = await prisma.subject.findMany();
  for (const sub of dbSubjects) {
    // 10 classes, 8 present
    for (let i = 0; i < 10; i++) {
      await prisma.attendance.create({
        data: {
          userId: student.id,
          subjectId: sub.id,
          date: new Date(),
          status: i < 8 ? 'PRESENT' : 'ABSENT'
        }
      });
    }

    // Add some marks
    await prisma.mark.create({
      data: {
        userId: student.id,
        subjectId: sub.id,
        type: 'CA',
        score: 18,
        maxScore: 20
      }
    });
    await prisma.mark.create({
      data: {
        userId: student.id,
        subjectId: sub.id,
        type: 'MID_TERM',
        score: 25,
        maxScore: 30
      }
    });
  }

  // Create timetable
  for (let i = 0; i < dbSubjects.length; i++) {
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
    await prisma.timetableEntry.create({
      data: {
        subjectId: dbSubjects[i].id,
        day: days[i],
        startTime: '09:00',
        endTime: '10:00',
        room: `Room ${100 + i}`,
        facultyName: 'Dr. Smith'
      }
    });
  }

  // Create fees
  await prisma.fee.create({
    data: {
      userId: student.id,
      title: 'Tuition Fee - Semester 5',
      amount: 45000,
      dueDate: new Date('2026-05-01'),
      status: 'PAID'
    }
  });
  await prisma.fee.create({
    data: {
      userId: student.id,
      title: 'Exam Fee - Semester 5',
      amount: 2500,
      dueDate: new Date('2026-06-15'),
      status: 'PENDING'
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
