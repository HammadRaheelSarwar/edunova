const { generateText } = require('./providerFactory');

async function askAiTutor({ question, contextText = '', mode = 'tutor' }) {
  const systemInstruction = `You are EduNova 24/7 AI Tutor, an empathetic, highly structured academic assistant.
Provide clear explanations, bullet points, and step-by-step guidance.
Mode: ${mode}.`;

  const prompt = contextText
    ? `Reference Document Context:\n${contextText}\n\nStudent Question:\n${question}`
    : question;

  const responseText = await generateText({ prompt, systemInstruction });
  return {
    answer: responseText,
    citations: contextText ? [{ sourceText: 'Uploaded Document Reference' }] : [],
  };
}

module.exports = { askAiTutor };
