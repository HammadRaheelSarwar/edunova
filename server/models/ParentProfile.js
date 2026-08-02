const mongoose = require('mongoose');

const parentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    childrenUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    occupation: { type: String, default: '' },
    relationship: { type: String, enum: ['father', 'mother', 'guardian'], default: 'guardian' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ParentProfile', parentProfileSchema);
