const { generateText } = require('./providerFactory');

async function generateLessonPlanDraft({ subject, topic, gradeLevel = 'High School' }) {
  const systemInstruction = `You are EduNova AI Teacher Assistant.
Generate a structured JSON lesson plan draft with objectives, slideOutline, homework, and evaluation rubrics.`;

  const prompt = `Subject: ${subject}\nTopic: ${topic}\nGrade Level: ${gradeLevel}`;

  const responseText = await generateText({ prompt, systemInstruction });

  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.warn('Fallback to default lesson draft structure');
  }

  return {
    topic,
    gradeLevel,
    durationMinutes: 45,
    objectives: [`Understand fundamental principles of ${topic}`],
    slideOutline: [
      { slide: 1, title: `Overview of ${topic}`, bullets: ['Key concepts', 'Real-world impact'] },
    ],
    homework: `Complete practice problem set for ${topic}.`,
  };
}

module.exports = { generateLessonPlanDraft };
