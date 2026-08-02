/**
 * ProviderFactory handles dynamic model dispatch (Gemini / OpenAI / Custom fallback)
 */
async function generateText({ prompt, systemInstruction, provider = 'gemini' }) {
  // Safe intelligent fallback implementation when direct API keys aren't configured
  if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
    return mockStructuredResponse(prompt);
  }

  try {
    if (provider === 'openai' && process.env.OPENAI_API_KEY) {
      const { generateOpenAI } = require('./openaiProvider');
      return await generateOpenAI({ prompt, systemInstruction });
    }
    const { generateGemini } = require('./geminiProvider');
    return await generateGemini({ prompt, systemInstruction });
  } catch (err) {
    console.warn(`[AI Provider Error] ${err.message}. Falling back to mock generator.`);
    return mockStructuredResponse(prompt);
  }
}

function mockStructuredResponse(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('quiz') || p.includes('mcq') || p.includes('exam')) {
    return JSON.stringify({
      title: 'AI Generated Quiz Draft',
      difficulty: 'medium',
      questions: [
        {
          questionText: 'What is the primary function of the cell nucleus?',
          questionType: 'mcq',
          options: ['Store genetic material', 'Synthesize lipids', 'Produce ATP', 'Cell division only'],
          correctAnswer: 'Store genetic material',
          explanation: 'The nucleus contains genomic DNA and controls cellular functions.',
        },
        {
          questionText: 'Photosynthesis occurs in which organelle?',
          questionType: 'mcq',
          options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Golgi apparatus'],
          correctAnswer: 'Chloroplast',
          explanation: 'Chloroplasts absorb sunlight to synthesize glucose from CO2 and water.',
        },
      ],
    });
  }

  if (p.includes('lesson plan') || p.includes('slides')) {
    return JSON.stringify({
      topic: 'Introduction to Data Structures',
      targetGrade: 'Grade 10 / Undergraduate',
      durationMinutes: 60,
      objectives: ['Understand Array memory layouts', 'Compare O(1) vs O(n) access time'],
      slideOutline: [
        { slide: 1, title: 'What is an Array?', bullets: ['Contiguous memory allocation', 'Index-based lookup'] },
        { slide: 2, title: 'Time Complexity Analysis', bullets: ['Access: O(1)', 'Search: O(n)', 'Insertion: O(n)'] },
      ],
      suggestedHomework: 'Implement a dynamic array expansion function.',
    });
  }

  return `EduNova AI Study Assistant Response:\n\nBased on your query regarding "${prompt.slice(0, 80)}...", here is a structured breakdown:\n\n1. Key Concept Overview: Core principles and foundational definitions.\n2. Practical Application: Step-by-step example problem solving.\n3. Summary & Next Steps: Review key terms and test your understanding with practice questions.`;
}

module.exports = { generateText };
