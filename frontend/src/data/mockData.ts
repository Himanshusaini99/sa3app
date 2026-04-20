export const USERS = {
  student: {
    id: 'STU001',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    role: 'student',
    semester: 4,
    branch: 'Computer Science',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    points: 450,
    attendanceGoal: 75
  },
  faculty: {
    id: 'FAC001',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@university.edu',
    role: 'faculty',
    department: 'Computer Science',
    designation: 'Associate Professor',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  }
};

export const SUBJECTS = [
  { id: 'CS401', name: 'Database Management Systems', faculty: 'Dr. Smith', credits: 4 },
  { id: 'CS402', name: 'Operating Systems', faculty: 'Prof. Miller', credits: 4 },
  { id: 'CS403', name: 'Computer Networks', faculty: 'Dr. Brown', credits: 3 },
  { id: 'CS404', name: 'Software Engineering', faculty: 'Prof. Wilson', credits: 3 },
  { id: 'HU401', name: 'Professional Ethics', faculty: 'Dr. Lee', credits: 2 }
];

export const ATTENDANCE = [
  { subjectId: 'CS401', totalClasses: 40, attended: 35, percentage: 87.5 },
  { subjectId: 'CS402', totalClasses: 38, attended: 22, percentage: 57.8 }, // Low attendance
  { subjectId: 'CS403', totalClasses: 35, attended: 30, percentage: 85.7 },
  { subjectId: 'CS404', totalClasses: 32, attended: 28, percentage: 87.5 },
  { subjectId: 'HU401', totalClasses: 20, attended: 18, percentage: 90.0 }
];

export const ACTIVITIES = [
  {
    id: 'ACT001',
    title: 'Web Dev Hackathon',
    category: 'Technical',
    date: '2024-05-15',
    points: 100,
    status: 'Upcoming',
    description: '24-hour coding challenge to build innovative web solutions.'
  },
  {
    id: 'ACT002',
    title: 'Eco-Drive Plantation',
    category: 'Social Service',
    date: '2024-04-20',
    points: 50,
    status: 'Completed',
    description: 'Tree plantation drive at the university campus.'
  },
  {
    id: 'ACT003',
    title: 'Public Speaking Workshop',
    category: 'Soft Skills',
    date: '2024-05-02',
    points: 30,
    status: 'Upcoming',
    description: 'Master the art of effective communication and presentation.'
  }
];

export const MARKS = [
  {
    subjectId: 'CS401',
    ca: 18, // out of 20
    midTerm: 25, // out of 30
    endTerm: 42, // out of 50
    total: 85
  },
  {
    subjectId: 'CS402',
    ca: 15,
    midTerm: 20,
    endTerm: 35,
    total: 70
  },
  {
    subjectId: 'CS403',
    ca: 19,
    midTerm: 28,
    endTerm: 45,
    total: 92
  }
];

export const TIMETABLE = {
  Monday: [
    { time: '09:00 - 10:00', subject: 'Database Systems', room: 'B-101' },
    { time: '10:00 - 11:00', subject: 'Operating Systems', room: 'B-102' },
    { time: '11:15 - 12:15', subject: 'Professional Ethics', room: 'A-201' }
  ],
  Tuesday: [
    { time: '09:00 - 10:00', subject: 'Computer Networks', room: 'C-301' },
    { time: '10:00 - 11:00', subject: 'Software Engineering', room: 'C-302' }
  ],
  Wednesday: [
    { time: '09:00 - 11:00', subject: 'DBMS Lab', room: 'Lab-1' },
    { time: '11:15 - 12:15', subject: 'Operating Systems', room: 'B-102' }
  ],
  Thursday: [
    { time: '09:00 - 10:00', subject: 'Software Engineering', room: 'C-302' },
    { time: '10:00 - 11:00', subject: 'Database Systems', room: 'B-101' }
  ],
  Friday: [
    { time: '09:00 - 11:00', subject: 'Networks Lab', room: 'Lab-2' },
    { time: '11:15 - 12:15', subject: 'Computer Networks', room: 'C-301' }
  ]
};

export const FEES = {
  tuition: 45000,
  hostel: 15000,
  library: 2000,
  exam: 1500,
  total: 63500,
  paid: 50000,
  pending: 13500,
  history: [
    { date: '2024-01-10', amount: 30000, type: 'Tuition Fee' },
    { date: '2024-01-15', amount: 20000, type: 'Hostel Fee' }
  ]
};

export const QUERIES = [
  { id: 'Q001', subject: 'Attendance Correction', status: 'Pending', date: '2024-03-25' },
  { id: 'Q002', subject: 'Fee Payment Issue', status: 'Resolved', date: '2024-03-10' }
];

export const LEAVES = [
  { id: 'L001', reason: 'Medical Checkup', status: 'Approved', startDate: '2024-03-20', endDate: '2024-03-20' }
];
