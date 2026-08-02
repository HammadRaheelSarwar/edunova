const express = require('express');
const router = express.Router();
const { getParents, createParent } = require('../controllers/parentController');

router.get('/', getParents);
router.post('/', createParent);

module.exports = router;
