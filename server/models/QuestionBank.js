const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    subject: { type: String, required: true },
    questionText: { type: String, required: true },
    questionType: { type: String, enum: ['mcq', 'fill_blank', 'true_false', 'short', 'long', 'code'], default: 'mcq' },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    isAiGenerated: { type: Boolean, default: false },
    approvedByTeacher: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuestionBank', questionBankSchema);
