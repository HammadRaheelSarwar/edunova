const express = require('express');
const router = express.Router();
const { getFees, createFee, updateFeeStatus } = require('../controllers/feeController');

router.get('/', getFees);
router.post('/', createFee);
router.put('/:id', updateFeeStatus);

module.exports = router;
