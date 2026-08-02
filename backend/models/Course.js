const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  credits: { type: Number, default: 3 },
  durationYears: { type: Number, default: 4 },
  batchesCount: { type: Number, default: 1 },
  description: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Archived'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
