const express = require('express');
const router = express.Router();
const { getTimetable, createSchedule } = require('../controllers/timetableController');

router.get('/', getTimetable);
router.post('/', createSchedule);

module.exports = router;
