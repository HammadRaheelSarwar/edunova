const Facility = require('../models/Facility');

let memoryFacilities = [
  { _id: '1', name: 'Computer Systems Lab 302', code: 'LAB-302', type: 'Laboratory', capacity: 60, building: 'Computing Block B', status: 'Available' },
  { _id: '2', name: 'Lecture Hall 101', code: 'LH-101', type: 'Classroom', capacity: 120, building: 'Main Academic Block', status: 'Available' },
  { _id: '3', name: 'Main Campus Auditorium', code: 'AUD-01', type: 'Auditorium', capacity: 500, building: 'Central Block', status: 'Booked' }
];

const getFacilities = async (req, res) => {
  try {
    const list = await Facility.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryFacilities);
};

const createFacility = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    code: 'FAC-' + Math.floor(100 + Math.random() * 900),
    ...req.body,
    status: req.body.status || 'Available'
  };

  try {
    const created = await Facility.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryFacilities.unshift(item);
  res.status(201).json(item);
};

module.exports = { getFacilities, createFacility };
