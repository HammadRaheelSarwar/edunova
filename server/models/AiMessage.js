const mongoose = require('mongoose');

const aiMessageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'AiConversation', required: true, index: true },
    sender: { type: String, enum: ['user', 'ai', 'system'], required: true },
    text: { type: String, required: true },
    citations: [{ chunkId: mongoose.Schema.Types.ObjectId, sourceText: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('AiMessage', aiMessageSchema);
