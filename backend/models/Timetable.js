const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  subject: { type: String, required: true },
  facultyName: { type: String, required: true },
  classroom: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
