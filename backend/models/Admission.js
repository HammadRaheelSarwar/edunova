const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  applicationNo: { type: String, required: true, unique: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  appliedCourse: { type: String, required: true },
  prevSchool: { type: String, default: '' },
  applicationDate: { type: String, required: true },
  status: { type: String, enum: ['Draft', 'Pending Review', 'Approved', 'Rejected', 'Enrolled'], default: 'Pending Review' }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
