const Timetable = require('../models/Timetable');

let memoryTimetable = [
  { _id: '1', day: 'Monday', course: 'Computer Science', batch: '2023-2027', subject: 'Data Structures', facultyName: 'Dr. Alan Turing', classroom: 'Lab 302', startTime: '09:00 AM', endTime: '10:30 AM' },
  { _id: '2', day: 'Monday', course: 'Software Engineering', batch: '2024-2028', subject: 'Compiler Design', facultyName: 'Prof. Grace Hopper', classroom: 'Room 101', startTime: '11:00 AM', endTime: '12:30 PM' },
  { _id: '3', day: 'Tuesday', course: 'Computer Science', batch: '2023-2027', subject: 'Artificial Intelligence', facultyName: 'Dr. Alan Turing', classroom: 'Auditorium A', startTime: '02:00 PM', endTime: '03:30 PM' }
];

const getTimetable = async (req, res) => {
  try {
    const list = await Timetable.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryTimetable);
};

const createSchedule = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    ...req.body
  };

  try {
    const created = await Timetable.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryTimetable.unshift(item);
  res.status(201).json(item);
};

module.exports = { getTimetable, createSchedule };
