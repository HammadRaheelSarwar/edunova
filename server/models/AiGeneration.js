const mongoose = require('mongoose');

const aiGenerationSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['quiz', 'lesson_plan', 'slides', 'rubric', 'flashcards', 'mindmap', 'essay_eval', 'career_roadmap'],
      required: true,
    },
    promptContext: { type: String, default: '' },
    generatedContent: { type: Object, required: true },
    status: { type: String, enum: ['draft', 'approved', 'rejected'], default: 'draft' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AiGeneration', aiGenerationSchema);
