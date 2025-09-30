// services/userPerformanceService.js
import { UserWordPerformance } from '../models/UserWordPerformance';

export async function getMasteredStatus(userId, word) {
  try {
    const record = await UserWordPerformance.findOne({
      where: {
        user_id: userId,
        word: word,
      },
    });

    if (!record) return false;
    return record.mastered === true;
  } catch (error) {
    console.error("Error checking mastered status:", error);
    return false;
  }
}

module.exports = { getMasteredStatus };
