const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    timeLimitMinutes: { type: Number, default: 30 },
    questions: [
      {
        questionText: { type: String, required: true },
        questionType: { type: String, enum: ['mcq', 'fill_blank', 'true_false', 'short', 'code'], default: 'mcq' },
        options: [{ type: String }],
        correctAnswer: { type: String, required: true },
        explanation: { type: String, default: '' },
      },
    ],
    isAiGenerated: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    approvedByTeacher: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
