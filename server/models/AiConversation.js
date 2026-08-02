const mongoose = require('mongoose');

const aiConversationSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, default: 'AI Learning Session' },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'DocumentAsset' },
    mode: { type: String, enum: ['tutor', 'pdf_qa', 'code_assistant', 'voice_tutor'], default: 'tutor' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AiConversation', aiConversationSchema);
