const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus', required: true, index: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    name: { type: String, required: true, trim: true }, // e.g., Grade 10, Computer Science Year 1
    gradeLevel: { type: String, default: '' },
    capacity: { type: Number, default: 40 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Classroom', classroomSchema);
