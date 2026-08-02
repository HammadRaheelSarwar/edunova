const Exam = require('../models/Exam');

let memoryExams = [
  {
    _id: '1',
    title: 'Mid-Term Examinations Fall 2026',
    course: 'Computer Science',
    batch: '2023-2027',
    subject: 'Algorithms & Complexity',
    examDate: '2026-08-15',
    totalMarks: 100,
    passingMarks: 40,
    results: [
      { studentId: 'STU-2026-001', studentName: 'Alex Johnson', marksObtained: 88, grade: 'A', status: 'Pass' },
      { studentId: 'STU-2026-002', studentName: 'Sophia Chen', marksObtained: 94, grade: 'A+', status: 'Pass' },
      { studentId: 'STU-2026-003', studentName: 'Marcus Vance', marksObtained: 65, grade: 'B', status: 'Pass' }
    ]
  }
];

const getExams = async (req, res) => {
  try {
    const list = await Exam.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryExams);
};

const createExam = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    ...req.body
  };

  try {
    const created = await Exam.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryExams.unshift(item);
  res.status(201).json(item);
};

module.exports = { getExams, createExam };
