const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
    campusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus' },
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    parentUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rollNumber: { type: String, default: '' },
    gpa: { type: Number, default: 3.8 },
    attendanceRate: { type: Number, default: 94 }, // percentage
    xp: { type: Number, default: 1250 },
    streak: { type: Number, default: 5 }, // daily streak count
    badges: [{ name: String, icon: String, unlockedAt: Date }],
    weeklyGoals: [{ title: String, completed: Boolean }],
    aiScore: { type: Number, default: 88 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
