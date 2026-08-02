const mongoose = require('mongoose');

const documentAssetSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, enum: ['pdf', 'docx', 'ppt', 'txt'], default: 'pdf' },
    fileSizeBytes: { type: Number, default: 0 },
    chunkCount: { type: Number, default: 0 },
    status: { type: String, enum: ['processing', 'indexed', 'failed'], default: 'processing' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DocumentAsset', documentAssetSchema);
