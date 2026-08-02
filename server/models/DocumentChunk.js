const mongoose = require('mongoose');

const documentChunkSchema = new mongoose.Schema(
  {
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'DocumentAsset', required: true, index: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    chunkIndex: { type: Number, required: true },
    text: { type: String, required: true },
    tokenCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DocumentChunk', documentChunkSchema);
