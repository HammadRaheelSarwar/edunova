const Activity = require('../models/Activity');

let memoryActivities = [
  { _id: '1', title: 'Global Hackathon 2026', category: 'Competition', organizer: 'Tech Club', eventDate: '2026-09-05', venue: 'Main Auditorium', participantsCount: 140, description: '48-hour competitive coding and AI prototype building challenge.' },
  { _id: '2', title: 'Annual Robotics Symposium', category: 'Workshop', organizer: 'Robotics Society', eventDate: '2026-09-12', venue: 'Engineering Hall', participantsCount: 95, description: 'Keynote talks and autonomous drone demonstrations.' }
];

const getActivities = async (req, res) => {
  try {
    const list = await Activity.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryActivities);
};

const createActivity = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    ...req.body,
    participantsCount: req.body.participantsCount || 0
  };

  try {
    const created = await Activity.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryActivities.unshift(item);
  res.status(201).json(item);
};

module.exports = { getActivities, createActivity };
