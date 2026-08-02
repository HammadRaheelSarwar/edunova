const express = require('express');
const router = express.Router();
const { askAiTutor } = require('../services/ai/tutorService');
const { generateQuizDraft } = require('../services/ai/quizGenerationService');
const { generateLessonPlanDraft } = require('../services/ai/lessonPlanService');
const AiGeneration = require('../models/AiGeneration');
const AiConversation = require('../models/AiConversation');
const AiMessage = require('../models/AiMessage');

// POST /api/ai/tutor - 24/7 AI Tutor Q&A
router.post('/tutor', async (req, res) => {
  try {
    const { question, contextText, conversationId, mode } = req.body;
    const result = await askAiTutor({ question, contextText, mode });

    // Store in message log if conversationId provided
    if (conversationId) {
      await AiMessage.create({ conversationId, sender: 'user', text: question });
      await AiMessage.create({ conversationId, sender: 'ai', text: result.answer });
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/generate-quiz - Generate quiz draft for teacher approval
router.post('/generate-quiz', async (req, res) => {
  try {
    const { topic, difficulty, questionCount, documentText } = req.body;
    const quizDraft = await generateQuizDraft({ topic, difficulty, questionCount, documentText });

    const generationRecord = await AiGeneration.create({
      organizationId: req.user ? req.user.organizationId : '60d0fe4f5311236168a109ca',
      requestedBy: req.user ? req.user.id : '60d0fe4f5311236168a109cb',
      type: 'quiz',
      promptContext: topic,
      generatedContent: quizDraft,
      status: 'draft', // Requires teacher review
    });

    return res.json({ draftId: generationRecord._id, quizDraft });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/teacher-assistant - Generate lesson plans & slide outlines
router.post('/teacher-assistant', async (req, res) => {
  try {
    const { subject, topic, gradeLevel } = req.body;
    const lessonDraft = await generateLessonPlanDraft({ subject, topic, gradeLevel });

    const generationRecord = await AiGeneration.create({
      organizationId: req.user ? req.user.organizationId : '60d0fe4f5311236168a109ca',
      requestedBy: req.user ? req.user.id : '60d0fe4f5311236168a109cb',
      type: 'lesson_plan',
      promptContext: `${subject} - ${topic}`,
      generatedContent: lessonDraft,
      status: 'draft',
    });

    return res.json({ draftId: generationRecord._id, lessonDraft });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/approve-draft - Human-in-the-loop teacher approval endpoint
router.post('/approve-draft', async (req, res) => {
  try {
    const { draftId } = req.body;
    const record = await AiGeneration.findByIdAndUpdate(
      draftId,
      { status: 'approved', approvedBy: req.user ? req.user.id : null },
      { new: true }
    );
    return res.json({ success: true, record });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
