const { generateText } = require('./providerFactory');

async function generateQuizDraft({ topic, difficulty = 'medium', questionCount = 5, documentText = '' }) {
  const systemInstruction = `You are EduNova AI Exam & Quiz Generator.
Generate a JSON draft object with fields: title, difficulty, questions (array of object with questionText, questionType, options, correctAnswer, explanation).
Ensure JSON format only.`;

  const prompt = `Topic: ${topic}
Difficulty: ${difficulty}
Count: ${questionCount}
${documentText ? `Source Text:\n${documentText.slice(0, 3000)}` : ''}`;

  const responseText = await generateText({ prompt, systemInstruction });

  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.warn('Could not parse raw AI JSON output, returning mock draft format');
  }

  return {
    title: `${topic} Quiz Draft (${difficulty.toUpperCase()})`,
    difficulty,
    questions: [
      {
        questionText: `Sample Question regarding ${topic}?`,
        questionType: 'mcq',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: 'Option A is correct based on core syllabus definition.',
      },
    ],
  };
}

module.exports = { generateQuizDraft };
