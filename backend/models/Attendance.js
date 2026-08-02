const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  subject: { type: String, default: '' },
  records: [{
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    rollNo: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Present' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
