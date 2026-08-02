const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    title: { type: String, default: 'Administrator' },
    accessScope: { type: String, enum: ['full', 'department', 'campus'], default: 'full' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminProfile', adminProfileSchema);
