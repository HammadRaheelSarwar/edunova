const Course = require('../models/Course');

let memoryCourses = [
  { _id: '1', code: 'CS101', name: 'Computer Science & Engineering', department: 'School of Computing', credits: 160, durationYears: 4, batchesCount: 4, description: 'Comprehensive program covering Algorithms, Systems, AI, and Cloud Architecture.', status: 'Active' },
  { _id: '2', code: 'SE202', name: 'Software Engineering', department: 'School of Computing', credits: 156, durationYears: 4, batchesCount: 3, description: 'Focuses on agile methodologies, DevOps, software quality assurance, and architecture.', status: 'Active' },
  { _id: '3', code: 'BA301', name: 'Business Administration', department: 'School of Business', credits: 120, durationYears: 3, batchesCount: 3, description: 'Core business management, corporate finance, marketing strategies, and leadership.', status: 'Active' },
  { _id: '4', code: 'DS404', name: 'Data Science & Analytics', department: 'School of Computing', credits: 140, durationYears: 4, batchesCount: 2, description: 'Big data processing, predictive analytics, statistical modelling, and machine learning.', status: 'Active' }
];

const getCourses = async (req, res) => {
  try {
    const list = await Course.find();
    if (list.length > 0) return res.json(list);
  } catch (err) {}
  res.json(memoryCourses);
};

const createCourse = async (req, res) => {
  const item = {
    _id: String(Date.now()),
    ...req.body,
    status: req.body.status || 'Active'
  };

  try {
    const created = await Course.create(item);
    return res.status(201).json(created);
  } catch (err) {}

  memoryCourses.unshift(item);
  res.status(201).json(item);
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) return res.json(updated);
  } catch (err) {}

  const index = memoryCourses.findIndex(c => c._id === id);
  if (index !== -1) {
    memoryCourses[index] = { ...memoryCourses[index], ...req.body };
    return res.json(memoryCourses[index]);
  }
  res.status(404).json({ message: 'Course not found' });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await Course.findByIdAndDelete(id);
  } catch (err) {}

  memoryCourses = memoryCourses.filter(c => c._id !== id);
  res.json({ message: 'Course deleted successfully' });
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
