const express = require('express');
const router = express.Router();
const { getAssignments, createAssignment } = require('../controllers/assignmentController');

router.get('/', getAssignments);
router.post('/', createAssignment);

module.exports = router;
