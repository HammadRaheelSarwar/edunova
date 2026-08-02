const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Club', 'Sports', 'Cultural', 'Workshop', 'Competition'], default: 'Club' },
  organizer: { type: String, required: true },
  eventDate: { type: String, required: true },
  venue: { type: String, required: true },
  participantsCount: { type: Number, default: 0 },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
