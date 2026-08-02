const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, default: '' },
  category: { type: String, default: 'General' },
  totalCopies: { type: Number, default: 5 },
  availableCopies: { type: Number, default: 5 },
  issuedRecords: [{
    studentId: { type: String },
    studentName: { type: String },
    issueDate: { type: String },
    returnDate: { type: String },
    status: { type: String, enum: ['Issued', 'Returned'], default: 'Issued' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Library', librarySchema);
