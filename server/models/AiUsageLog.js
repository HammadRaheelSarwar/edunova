const mongoose = require('mongoose');

const aiUsageLogSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    feature: { type: String, required: true },
    provider: { type: String, enum: ['gemini', 'openai', 'fallback'], default: 'gemini' },
    tokensUsed: { type: Number, default: 0 },
    estimatedCostUsd: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AiUsageLog', aiUsageLogSchema);
