const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Classroom', 'Laboratory', 'Auditorium', 'Sports Ground', 'Hostel Block'], default: 'Classroom' },
  capacity: { type: Number, default: 40 },
  building: { type: String, default: 'Main Academic Block' },
  status: { type: String, enum: ['Available', 'Booked', 'Under Maintenance'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('Facility', facilitySchema);
