const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModule', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    pdfAttachment: { type: String, default: '' },
    durationMinutes: { type: Number, default: 45 },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
