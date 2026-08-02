const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true }, // e.g. "12"
    month: { type: String, required: true }, // e.g. "Nov"
    price: { type: String, required: true }, // e.g. "$14.00"
    image: { type: String, required: true },
    description: { type: String, default: 'Morbi in libero blandit lectus cursus ullamcorper.' },
    fullDescription: { type: String, default: '' },
    categories: { type: [String], default: ['all'] }, // e.g. ['all', 'soon']
    location: { type: String, default: 'Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22795-008, Brazil' },
    hours: { type: String, default: 'Monday - Friday: 07:00 AM - 13:00 PM\nSaturday - Sunday: 09:00 AM - 15:00 PM' },
    phone: { type: String, default: '010-020-0340\n090-080-0760' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meeting', meetingSchema);
