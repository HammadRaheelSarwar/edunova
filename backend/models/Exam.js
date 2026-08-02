const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  subject: { type: String, required: true },
  examDate: { type: String, required: true },
  totalMarks: { type: Number, default: 100 },
  passingMarks: { type: Number, default: 40 },
  results: [{
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    marksObtained: { type: Number, default: 0 },
    grade: { type: String, default: 'A' },
    status: { type: String, enum: ['Pass', 'Fail'], default: 'Pass' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
