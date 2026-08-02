const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  dob: { type: String, default: '' },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  rollNo: { type: String, required: true },
  parentName: { type: String, default: '' },
  parentPhone: { type: String, default: '' },
  address: { type: String, default: '' },
  status: { type: String, enum: ['Enrolled', 'Graduated', 'Suspended'], default: 'Enrolled' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
