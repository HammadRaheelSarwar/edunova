const Fee = require('../models/Fee');

let memoryFees = [
  { _id: '1', invoiceNo: 'INV-2026-8801', studentId: 'STU-2026-001', studentName: 'Alex Johnson', course: 'Computer Science', feeType: 'Tuition Fee (Fall 2026)', amount: 2400, dueDate: '2026-08-30', paymentStatus: 'Paid', paymentDate: '2026-07-28', paymentMethod: 'Credit Card' },
  { _id: '2', invoiceNo: 'INV-2026-8802', studentId: 'STU-2026-002', studentName: 'Sophia Chen', course: 'Software Engineering', feeType: 'Tuition Fee (Fall 2026)', amount: 2550, dueDate: '2026-08-30', paymentStatus: 'Pending', paymentDate: '', paymentMethod: '' },
  { _id: '3', invoiceNo: 'INV-2026-8803', studentId: 'STU-2026-003', studentName: 'Marcus Vance', course: 'Business Administration', feeType: 'Lab & Facility Fee', amount: 450, dueDate: '2026-08-15', paymentStatus: 'Overdue', paymentDate: '', paymentMethod: '' }
];

const getFees = async (req, res) => {
  try {
    const list = await Fee.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryFees);
};

const createFee = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    invoiceNo: 'INV-2026-' + Math.floor(1000 + Math.random() * 9000),
    ...req.body,
    paymentStatus: req.body.paymentStatus || 'Pending'
  };

  try {
    const created = await Fee.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryFees.unshift(item);
  res.status(201).json(item);
};

const updateFeeStatus = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus, paymentMethod } = req.body;
  const paymentDate = paymentStatus === 'Paid' ? new Date().toISOString().split('T')[0] : '';

  try {
    const updated = await Fee.findByIdAndUpdate(id, { paymentStatus, paymentMethod, paymentDate }, { new: true });
    if (updated) return res.json(updated);
  } catch (err) {}

  const index = memoryFees.findIndex(f => f._id === id);
  if (index !== -1) {
    memoryFees[index] = { ...memoryFees[index], paymentStatus, paymentMethod, paymentDate };
    return res.json(memoryFees[index]);
  }
  res.status(404).json({ message: 'Fee invoice not found' });
};

module.exports = { getFees, createFee, updateFeeStatus };
