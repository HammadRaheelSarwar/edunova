const Admission = require('../models/Admission');

let memoryAdmissions = [
  { _id: '1', applicationNo: 'ADM-2026-901', applicantName: 'Jonathan Vance', email: 'jonathan@gmail.com', phone: '+1 555-0921', appliedCourse: 'Computer Science', prevSchool: 'St. Xavier High School', applicationDate: '2026-07-20', status: 'Pending Review' },
  { _id: '2', applicationNo: 'ADM-2026-902', applicantName: 'Clara Oswald', email: 'clara@gmail.com', phone: '+1 555-0922', appliedCourse: 'Software Engineering', prevSchool: 'Lincoln Academy', applicationDate: '2026-07-22', status: 'Approved' },
  { _id: '3', applicationNo: 'ADM-2026-903', applicantName: 'David Tennant', email: 'david@gmail.com', phone: '+1 555-0923', appliedCourse: 'Business Administration', prevSchool: 'Oakridge High', applicationDate: '2026-07-25', status: 'Enrolled' }
];

const getAdmissions = async (req, res) => {
  try {
    const list = await Admission.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryAdmissions);
};

const createAdmission = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    applicationNo: 'ADM-2026-' + Math.floor(100 + Math.random() * 900),
    applicationDate: new Date().toISOString().split('T')[0],
    ...req.body,
    status: req.body.status || 'Pending Review'
  };

  try {
    const created = await Admission.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryAdmissions.unshift(item);
  res.status(201).json(item);
};

const updateAdmissionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await Admission.findByIdAndUpdate(id, { status }, { new: true });
    if (updated) return res.json(updated);
  } catch (err) {}

  const index = memoryAdmissions.findIndex(a => a._id === id);
  if (index !== -1) {
    memoryAdmissions[index].status = status;
    return res.json(memoryAdmissions[index]);
  }
  res.status(404).json({ message: 'Application not found' });
};

module.exports = { getAdmissions, createAdmission, updateAdmissionStatus };
