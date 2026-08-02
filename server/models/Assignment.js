const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    instructions: { type: String, default: '' },
    dueDate: { type: Date, required: true },
    maxPoints: { type: Number, default: 100 },
    rubric: { type: String, default: '' },
    isAiGenerated: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
