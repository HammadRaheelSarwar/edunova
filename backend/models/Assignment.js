const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  subject: { type: String, required: true },
  facultyName: { type: String, required: true },
  dueDate: { type: String, required: true },
  maxMarks: { type: Number, default: 100 },
  description: { type: String, default: '' },
  submissionsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
