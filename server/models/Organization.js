const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, lowercase: true, trim: true },
    domain: { type: String, trim: true },
    logo: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, required: true, lowercase: true, trim: true },
    tier: {
      type: String,
      enum: ['standard', 'premium', 'enterprise'],
      default: 'standard',
    },
    settings: {
      aiEnabled: { type: Boolean, default: true },
      erpEnabled: { type: Boolean, default: true },
      gamificationEnabled: { type: Boolean, default: true },
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Organization', organizationSchema);
