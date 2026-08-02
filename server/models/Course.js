const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus' },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'General' },
    image: { type: String, default: '/assets/images/courses-01.jpg' },
    price: { type: String, default: '$160' },
    rating: { type: Number, default: 5 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
