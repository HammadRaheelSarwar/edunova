const Library = require('../models/Library');

let memoryLibrary = [
  { _id: '1', bookId: 'BK-101', title: 'Introduction to Algorithms (CLRS)', author: 'Cormen, Leiserson, Rivest, Stein', isbn: '978-0262033848', category: 'Computer Science', totalCopies: 10, availableCopies: 7, issuedRecords: [] },
  { _id: '2', bookId: 'BK-102', title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Software Engineering', totalCopies: 8, availableCopies: 5, issuedRecords: [] },
  { _id: '3', bookId: 'BK-103', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', isbn: '978-0134610993', category: 'AI & Data Science', totalCopies: 6, availableCopies: 4, issuedRecords: [] }
];

const getBooks = async (req, res) => {
  try {
    const list = await Library.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryLibrary);
};

const addBook = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    bookId: 'BK-' + Math.floor(100 + Math.random() * 900),
    ...req.body,
    availableCopies: req.body.totalCopies || 5,
    issuedRecords: []
  };

  try {
    const created = await Library.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryLibrary.unshift(item);
  res.status(201).json(item);
};

const issueBook = async (req, res) => {
  const { id } = req.params;
  const { studentId, studentName } = req.body;

  const index = memoryLibrary.findIndex(b => b._id === id);
  if (index !== -1 && memoryLibrary[index].availableCopies > 0) {
    memoryLibrary[index].availableCopies -= 1;
    memoryLibrary[index].issuedRecords.push({
      studentId,
      studentName,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Issued'
    });
    return res.json(memoryLibrary[index]);
  }
  res.status(400).json({ message: 'Book unavailable or not found' });
};

module.exports = { getBooks, addBook, issueBook };
