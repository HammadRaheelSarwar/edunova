const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true, index: true },
    name: { type: String, required: true, trim: true }, // e.g. Section A, Section B
    classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    capacity: { type: Number, default: 35 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Section', sectionSchema);
