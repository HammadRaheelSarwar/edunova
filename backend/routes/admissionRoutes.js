const express = require('express');
const router = express.Router();
const { getAdmissions, createAdmission, updateAdmissionStatus } = require('../controllers/admissionController');

router.get('/', getAdmissions);
router.post('/', createAdmission);
router.put('/:id', updateAdmissionStatus);

module.exports = router;
