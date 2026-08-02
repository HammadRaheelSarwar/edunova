const express = require('express');
const router = express.Router();
const { getBooks, addBook, issueBook } = require('../controllers/libraryController');

router.get('/', getBooks);
router.post('/', addBook);
router.post('/:id/issue', issueBook);

module.exports = router;
