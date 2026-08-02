const Student = require('../models/Student');

// In-memory data store for quick fallback
let memoryStudents = [
  { _id: '1', studentId: 'STU-2026-001', name: 'Alex Johnson', email: 'alex.j@edunova.edu', phone: '+1 555-0192', gender: 'Male', dob: '2003-05-14', course: 'Computer Science', batch: '2023-2027', rollNo: 'CS-01', parentName: 'Robert Johnson', parentPhone: '+1 555-0190', address: '123 University Ave', status: 'Enrolled' },
  { _id: '2', studentId: 'STU-2026-002', name: 'Sophia Chen', email: 'sophia.c@edunova.edu', phone: '+1 555-0193', gender: 'Female', dob: '2004-02-18', course: 'Software Engineering', batch: '2024-2028', rollNo: 'SE-04', parentName: 'David Chen', parentPhone: '+1 555-0191', address: '456 Innovation Blvd', status: 'Enrolled' },
  { _id: '3', studentId: 'STU-2026-003', name: 'Marcus Vance', email: 'marcus.v@edunova.edu', phone: '+1 555-0194', gender: 'Male', dob: '2003-09-22', course: 'Business Administration', batch: '2023-2027', rollNo: 'BA-12', parentName: 'Sarah Vance', parentPhone: '+1 555-0195', address: '789 Academy Rd', status: 'Enrolled' },
  { _id: '4', studentId: 'STU-2026-004', name: 'Emily Davis', email: 'emily.d@edunova.edu', phone: '+1 555-0196', gender: 'Female', dob: '2002-11-05', course: 'Data Science', batch: '2022-2026', rollNo: 'DS-02', parentName: 'Michael Davis', parentPhone: '+1 555-0197', address: '321 Scholar Way', status: 'Graduated' }
];

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length > 0) return res.json(students);
  } catch (err) {}
  res.json(memoryStudents);
};

const createStudent = async (req, res) => {
  const newStudent = {
    _id: String(Date.now()),
    studentId: 'STU-2026-' + Math.floor(100 + Math.random() * 900),
    ...req.body,
    status: req.body.status || 'Enrolled'
  };

  try {
    const dbStudent = await Student.create(newStudent);
    return res.status(201).json(dbStudent);
  } catch (err) {}

  memoryStudents.unshift(newStudent);
  res.status(201).json(newStudent);
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) return res.json(updated);
  } catch (err) {}

  const index = memoryStudents.findIndex(s => s._id === id);
  if (index !== -1) {
    memoryStudents[index] = { ...memoryStudents[index], ...req.body };
    return res.json(memoryStudents[index]);
  }
  res.status(404).json({ message: 'Student not found' });
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
  } catch (err) {}

  memoryStudents = memoryStudents.filter(s => s._id !== id);
  res.json({ message: 'Student deleted successfully' });
};

module.exports = { getStudents, createStudent, updateStudent, deleteStudent };
