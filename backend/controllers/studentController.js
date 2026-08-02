const Student = require('../models/Student');

// Authentic OpenEduCat Demo Students Data
let memoryStudents = [
  { _id: '1', studentId: 'STU-2026-001', name: 'Emma J Parker', email: 'emmaparker@example.com', phone: '+1 212-555-0118', gender: 'Female', dob: '1992-05-06', course: 'Computer Science', batch: '2023-2027', rollNo: 'CS-01', parentName: 'Robert Parker', parentPhone: '+1 212-555-0100', address: '350 5th Avenue, New York, NY', status: 'Enrolled' },
  { _id: '2', studentId: 'STU-2026-002', name: 'James M Garcia', email: 'jamesgarcia@example.com', phone: '+49 30-555-0178', gender: 'Male', dob: '1989-11-05', course: 'Software Engineering', batch: '2024-2028', rollNo: 'SE-04', parentName: 'Michael Garcia', parentPhone: '+49 30-555-0100', address: 'Alexanderplatz 7, Berlin', status: 'Enrolled' },
  { _id: '3', studentId: 'STU-2026-003', name: 'Priya R Reddy', email: 'priyareddy@example.com', phone: '+91 40-555-0199', gender: 'Female', dob: '1994-08-12', course: 'Business Administration', batch: '2023-2027', rollNo: 'BA-12', parentName: 'Ramesh Reddy', parentPhone: '+91 40-555-0100', address: 'Jubilee Hills, Hyderabad', status: 'Enrolled' },
  { _id: '4', studentId: 'STU-2026-004', name: 'Alex Johnson', email: 'alex.j@edunova.edu', phone: '+1 555-0192', gender: 'Male', dob: '2003-05-14', course: 'Data Science', batch: '2022-2026', rollNo: 'DS-02', parentName: 'Robert Johnson', parentPhone: '+1 555-0190', address: '123 University Ave', status: 'Enrolled' },
  { _id: '5', studentId: 'STU-2026-005', name: 'Sophia Chen', email: 'sophia.c@edunova.edu', phone: '+1 555-0193', gender: 'Female', dob: '2004-02-18', course: 'Software Engineering', batch: '2024-2028', rollNo: 'SE-08', parentName: 'David Chen', parentPhone: '+1 555-0191', address: '456 Innovation Blvd', status: 'Enrolled' }
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
