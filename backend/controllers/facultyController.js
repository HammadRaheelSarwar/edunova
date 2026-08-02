const Faculty = require('../models/Faculty');

let memoryFaculty = [
  { _id: '1', facultyId: 'FAC-2026-101', name: 'William D Mitchell', email: 'williammitchell@example.com', phone: '+358 9-555-0215', department: 'Computer Science', designation: 'Professor', qualification: 'Ph.D in Computer Systems', subjectsAssigned: ['Data Structures', 'Algorithms'], joiningDate: '2018-02-01', status: 'Active' },
  { _id: '2', facultyId: 'FAC-2026-102', name: 'John C White', email: 'johnwhite@example.com', phone: '+33 1-555-0200', department: 'Software Engineering', designation: 'Associate Professor', qualification: 'Ph.D in Software Engineering', subjectsAssigned: ['Software Architecture', 'Compiler Design'], joiningDate: '2019-02-05', status: 'Active' },
  { _id: '3', facultyId: 'FAC-2026-103', name: 'Dr. Alan Turing', email: 'alan.turing@edunova.edu', phone: '+1 555-4011', department: 'Computer Science', designation: 'Professor', qualification: 'Ph.D in AI & Computing', subjectsAssigned: ['Artificial Intelligence', 'Machine Learning'], joiningDate: '2019-08-15', status: 'Active' },
  { _id: '4', facultyId: 'FAC-2026-104', name: 'Prof. Grace Hopper', email: 'grace.h@edunova.edu', phone: '+1 555-4012', department: 'Software Engineering', designation: 'Associate Professor', qualification: 'Ph.D in Systems', subjectsAssigned: ['Compiler Design', 'Operating Systems'], joiningDate: '2020-01-10', status: 'Active' }
];

const getFaculty = async (req, res) => {
  try {
    const list = await Faculty.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryFaculty);
};

const createFaculty = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    facultyId: 'FAC-2026-' + Math.floor(100 + Math.random() * 900),
    ...req.body,
    status: req.body.status || 'Active'
  };

  try {
    const created = await Faculty.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryFaculty.unshift(item);
  res.status(201).json(item);
};

const updateFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Faculty.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) return res.json(updated);
  } catch (err) {}

  const index = memoryFaculty.findIndex(f => f._id === id);
  if (index !== -1) {
    memoryFaculty[index] = { ...memoryFaculty[index], ...req.body };
    return res.json(memoryFaculty[index]);
  }
  res.status(404).json({ message: 'Faculty not found' });
};

const deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    await Faculty.findByIdAndDelete(id);
  } catch (err) {}

  memoryFaculty = memoryFaculty.filter(f => f._id !== id);
  res.json({ message: 'Faculty deleted successfully' });
};

module.exports = { getFaculty, createFaculty, updateFaculty, deleteFaculty };
