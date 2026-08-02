const Assignment = require('../models/Assignment');

let memoryAssignments = [
  { _id: '1', title: 'Data Structures Graph Implementation', course: 'Computer Science', subject: 'Data Structures', facultyName: 'Dr. Alan Turing', dueDate: '2026-08-18', maxMarks: 100, description: 'Implement Dijkstra & BFS/DFS algorithms in Python/Java with time complexity report.', submissionsCount: 24 },
  { _id: '2', title: 'Software Architecture Case Study', course: 'Software Engineering', subject: 'Software Architecture', facultyName: 'Prof. Grace Hopper', dueDate: '2026-08-22', maxMarks: 50, description: 'Analyze Microservices vs Monolith trade-offs for an e-commerce platform.', submissionsCount: 18 }
];

const getAssignments = async (req, res) => {
  try {
    const list = await Assignment.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryAssignments);
};

const createAssignment = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    ...req.body,
    submissionsCount: 0
  };

  try {
    const created = await Assignment.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryAssignments.unshift(item);
  res.status(201).json(item);
};

module.exports = { getAssignments, createAssignment };
