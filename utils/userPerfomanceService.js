import { UserWordPerformance } from "../models/UserWordPerformance.js";

export async function updateMasteredStatus(userId, word, wasCorrect, retries, responseTime) {
  try {
    const mastered = wasCorrect && retries <= 1 && responseTime <= 100;

    const [record, created] = await UserWordPerformance.findOrCreate({
      where: {
        user_id: userId,
        word: word,
      },
      defaults: {
        mastered: mastered,
        was_correct: wasCorrect,
        retries: retries,
        response_time: responseTime,
      },
    });

    if (!created) {
      // update if already exists
      await record.update({
        was_correct: wasCorrect,
        retries: retries,
        response_time: responseTime,
        mastered: mastered,
      });
    }

    return { success: true, mastered };
  } catch (error) {
    console.error("Error updating mastered status:", error);
    return { success: false, error };
  }
}


//do  getMasteredStatus