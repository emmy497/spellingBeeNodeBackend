// controllers/performanceController.js



import { UserWordPerformance } from '../models/UserWordPerformance.js';


export async function getUserPerformance(userId) {
  try {
    const records = await UserWordPerformance.findAll({
      where: { user_id: userId },
      attributes: ['word', 'was_correct'],
    });

    const performanceMap = {};

    for (const record of records) {
      const word = record.word;
      const wasCorrect = record.was_correct;

      if (!performanceMap[word]) {
        performanceMap[word] = { correct: 0, incorrect: 0 };
      }

      if (wasCorrect) {
        performanceMap[word].correct += 1;
      } else {
        performanceMap[word].incorrect += 1;
      }
    }

    return performanceMap;

  } catch (error) {
    console.error("Error fetching user performance map:", error);
    throw error;
  }
}


