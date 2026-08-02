const mongoose = require('mongoose');

const courseModuleSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    title: { type: String, required: true, trim: true },
    order: { type: Number, default: 1 },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CourseModule', courseModuleSchema);
