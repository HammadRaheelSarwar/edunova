const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'teacher', 'parent', 'admin', 'superadmin'],
      default: 'student',
      required: true,
    },
    permissions: [{ type: String }],
    avatar: { type: String, default: '' },
    phone: { type: String, default: '' },
    emailVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ organizationId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
