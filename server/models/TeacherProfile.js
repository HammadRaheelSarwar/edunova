const mongoose = require('mongoose');

const teacherProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    employeeId: { type: String, default: '' },
    designation: { type: String, default: 'Senior Lecturer' },
    specialization: [{ type: String }],
    assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
    bio: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);
