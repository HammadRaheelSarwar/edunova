const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  occupation: { type: String, default: '' },
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  relationship: { type: String, enum: ['Father', 'Mother', 'Guardian'], default: 'Father' }
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);
