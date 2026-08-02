const express = require('express');
const router = express.Router();

// GET /api/dashboard/student
router.get('/student', (req, res) => {
  res.json({
    gpa: 3.8,
    attendanceRate: 94,
    xp: 1250,
    streak: 5,
    aiScore: 88,
    upcomingExams: [
      { id: 'ex-1', title: 'Data Structures Midterm', date: '2026-08-10', room: 'Lab 4' },
      { id: 'ex-2', title: 'Calculus Quiz', date: '2026-08-14', room: 'Hall B' },
    ],
    weeklyGoals: [
      { id: 1, title: 'Complete 3 AI Tutor Sessions', completed: true },
      { id: 2, title: 'Solve 20 Coding Challenges', completed: false },
      { id: 3, title: 'Score 90%+ on Physics Practice Quiz', completed: true },
    ],
    badges: [
      { name: 'AI Scholar', icon: 'fa-graduation-cap' },
      { name: '5-Day Streak', icon: 'fa-fire' },
      { name: 'Quiz Master', icon: 'fa-trophy' },
    ],
  });
});

// GET /api/dashboard/teacher
router.get('/teacher', (req, res) => {
  res.json({
    totalClasses: 4,
    totalStudents: 142,
    pendingGrades: 12,
    aiDraftsCount: 3,
    myClasses: [
      { id: 'c1', name: 'Computer Science 101', studentsCount: 45, schedule: 'Mon/Wed 10:00 AM' },
      { id: 'c2', name: 'Data Structures & Algorithms', studentsCount: 38, schedule: 'Tue/Thu 2:00 PM' },
      { id: 'c3', name: 'Web Development MERN', studentsCount: 59, schedule: 'Fri 11:00 AM' },
    ],
  });
});

// GET /api/dashboard/parent
router.get('/parent', (req, res) => {
  res.json({
    childName: 'Alex Sarwar',
    attendance: '96%',
    gpa: '3.9',
    feesStatus: 'Paid (Installment 2/4 due Aug 30)',
    teacherComments: [
      { teacher: 'Dr. Smith', comment: 'Alex shows exceptional problem-solving skills in AI Tutor practice sessions.' },
    ],
    examResults: [
      { subject: 'Mathematics', score: '92%', grade: 'A' },
      { subject: 'Computer Science', score: '98%', grade: 'A+' },
    ],
  });
});

// GET /api/dashboard/admin
router.get('/admin', (req, res) => {
  res.json({
    totalStudents: 1420,
    totalTeachers: 86,
    activeCourses: 34,
    monthlyRevenue: '$48,500',
    attendanceAverage: '93.5%',
    erpModulesActive: ['Admissions', 'Fees', 'Attendance', 'Timetable', 'Library'],
  });
});

module.exports = router;
