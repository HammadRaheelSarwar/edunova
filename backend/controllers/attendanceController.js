const Attendance = require('../models/Attendance');

let memoryAttendance = [
  {
    _id: '1',
    date: '2026-08-01',
    course: 'Computer Science',
    batch: '2023-2027',
    subject: 'Data Structures',
    records: [
      { studentId: 'STU-2026-001', studentName: 'Alex Johnson', rollNo: 'CS-01', status: 'Present' },
      { studentId: 'STU-2026-002', studentName: 'Sophia Chen', rollNo: 'SE-04', status: 'Present' },
      { studentId: 'STU-2026-003', studentName: 'Marcus Vance', rollNo: 'BA-12', status: 'Absent' }
    ]
  }
];

const getAttendance = async (req, res) => {
  try {
    const list = await Attendance.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryAttendance);
};

const recordAttendance = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    ...req.body
  };

  try {
    const created = await Attendance.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryAttendance.unshift(item);
  res.status(201).json(item);
};

module.exports = { getAttendance, recordAttendance };
