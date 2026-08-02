const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  department: { type: String, required: true },
  designation: { type: String, default: 'Lecturer' },
  qualification: { type: String, default: '' },
  subjectsAssigned: [{ type: String }],
  joiningDate: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'On Leave', 'Resigned'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
