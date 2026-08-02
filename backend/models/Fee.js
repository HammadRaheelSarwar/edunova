const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  feeType: { type: String, default: 'Tuition Fee' },
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
  paymentDate: { type: String, default: '' },
  paymentMethod: { type: String, default: 'Cash' }
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
