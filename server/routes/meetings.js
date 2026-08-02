const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// GET /api/meetings — get all meetings (supports ?filter=soon|imp|att)
router.get('/', async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};
    if (filter && filter !== 'all') {
      query = { categories: filter };
    }
    const meetings = await Meeting.find(query).sort({ date: 1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/meetings/:id — get single meeting
router.get('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/meetings — create a new meeting (admin use)
router.post('/', async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    const saved = await meeting.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
