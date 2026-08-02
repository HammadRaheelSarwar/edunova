const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    answers: [{ questionIndex: Number, selectedAnswer: String, isCorrect: Boolean }],
    scorePercentage: { type: Number, required: true },
    xpEarned: { type: Number, default: 50 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
