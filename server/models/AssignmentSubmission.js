const mongoose = require('mongoose');

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, default: '' },
    attachmentUrl: { type: String, default: '' },
    score: { type: Number },
    teacherFeedback: { type: String, default: '' },
    aiEvaluationDraft: { type: String, default: '' },
    status: { type: String, enum: ['submitted', 'graded', 'resubmitted'], default: 'submitted' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
