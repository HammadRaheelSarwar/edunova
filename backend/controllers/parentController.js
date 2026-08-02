const Parent = require('../models/Parent');

let memoryParents = [
  { _id: '1', parentName: 'Robert Johnson', email: 'robert.j@gmail.com', phone: '+1 555-0190', occupation: 'Senior Software Engineer', studentName: 'Alex Johnson', studentId: 'STU-2026-001', relationship: 'Father' },
  { _id: '2', parentName: 'David Chen', email: 'david.c@gmail.com', phone: '+1 555-0191', occupation: 'Architect', studentName: 'Sophia Chen', studentId: 'STU-2026-002', relationship: 'Father' }
];

const getParents = async (req, res) => {
  try {
    const list = await Parent.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryParents);
};

const createParent = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    ...req.body
  };

  try {
    const created = await Parent.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryParents.unshift(item);
  res.status(201).json(item);
};

module.exports = { getParents, createParent };
