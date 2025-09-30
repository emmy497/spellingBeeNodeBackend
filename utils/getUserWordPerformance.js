// getUserWordPerformance.js
import { UserWordPerformance } from '../models/UserWordPerformance.js';
import Word from '../models/Word.js';


export async function getUserWordPerformance(userId) {
  const wordList = await Word.findAll({ attributes: ['word'], raw: true });
  const performanceList = await UserWordPerformance.findAll({
    where: { user_id: userId },
    attributes: ['word', 'was_correct'],
    raw: true,
  });

  const wordMap = {};
  // Initialize all words as unmastered (0)
  wordList.forEach(({ word }) => {
    wordMap[word] = 0;
  });

  // Mark mastered words as 1
  performanceList.forEach(({ word, was_correct }) => {
    if (was_correct) {
      wordMap[word] = 1;
    }
  });

  return wordMap; // e.g. { "apple": 1, "banana": 0, "cat": 1 }
}
