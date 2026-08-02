const express = require('express');
const router = express.Router();
const { getExams, createExam } = require('../controllers/examController');

router.get('/', getExams);
router.post('/', createExam);

module.exports = router;
