// // routes/stateRoute.js

// import express from 'express';

// import Word from '../models/Word.js';
// import { UserWordPerformance } from '../models/UserWordPerformance.js';

// const router = express.Router();

// router.get('/getStateVector', async (req, res) => {
//  const userId = req.query.user_Id;  

//   try {
//     // Step 1: Fetch all words
//     const allWords = await Word.findAll({ attributes: ['word'] });
//     const wordList = allWords.map(wordObj => wordObj.word);

//     // Step 2: Fetch user performances
//     const performances = await UserWordPerformance.findAll({
//       where: { user_id: userId },
//       attributes: ['word', 'was_correct'],
//     });

//     // Step 3: Group performances by word
//     const performanceMap = {};

//     for (const record of performances) {
//       const word = record.word;
//       const wasCorrect = record.was_correct;

//       if (!performanceMap[word]) {
//         performanceMap[word] = { correct: 0, total: 0 };
//       }

//       performanceMap[word].total += 1;
//       if (wasCorrect) performanceMap[word].correct += 1;
//     }

//     console.log(performanceMap)

//     // Step 4: Determine mastery for each word
//     const masteredThreshold = 1; // for example, at least 3 correct
//     const stateVector = wordList.map(word => {
//       const perf = performanceMap[word];
//       if (!perf) return 0; // never attempted

//       return perf.correct >= masteredThreshold ? 1 : 0;
//     });

//     res.json({
//       wordList,
//       stateVector,
//     });

//   } catch (error) {
//     console.error("Error generating state vector:", error);
//     res.status(500).json({ error: "Failed to generate state vector" });
//   }
// });

// export default router;


// routes/stateRoute.js

// import express from 'express';
// import Word from '../models/Word.js';
// import { UserWordPerformance } from '../models/UserWordPerformance.js';

// const router = express.Router();

// router.get('/getStateVector', async (req, res) => {
//   const userId = req.query.user_Id;

//   try {
//     // Step 1: Fetch all words
//     const allWords = await Word.findAll({ attributes: ['word'] });
//     const wordList = allWords.map(wordObj => wordObj.word);

//     // Step 2: Fetch user's performances only for words in the word table
//     const performances = await UserWordPerformance.findAll({
//       where: { user_id: userId },
//       attributes: ['word', 'was_correct'],
//     });

//     console.log("User performances:", performances.map(p => p.dataValues));

//     // Step 3: Aggregate performance per word
//     const performanceMap = {};

//     performances.forEach(({ word, was_correct }) => {
//       if (!performanceMap[word]) {
//         performanceMap[word] = { correct: 0, total: 0 };
//       }
//       performanceMap[word].total += 1;
//       if (was_correct) performanceMap[word].correct += 1;
//     });

//     // Step 4: Map to state vector
//     const masteredThreshold = 3;
//     const stateVector = wordList.map(word => {
//       const perf = performanceMap[word];
//       if (!perf) return 0;
//       return perf.correct >= masteredThreshold ? 1 : 0;
//     });

//     res.json({ wordList, stateVector });

//   } catch (error) {
//     console.error("Error generating state vector:", error);
//     res.status(500).json({ error: "Failed to generate state vector" });
//   }
// });

// export default router;


// routes/stateRoute.js

import express from 'express';
import { UserWordPerformance } from '../models/UserWordPerformance.js';

const  router = express.Router();

router.get('/getStateVector', async (req, res) => {
  const userId = req.query.user_Id;

  try {
    // Step 1: Get user performances
    const performances = await UserWordPerformance.findAll({
      where: { user_id: userId },
      attributes: ['word', 'was_correct'],
    });

    console.log(performances, userId)

    // Step 2: Group performances by word
    const performanceMap = {};

    for (const record of performances) {
      const word = record.word;
      const wasCorrect = record.was_correct;

      if (!performanceMap[word]) {
        performanceMap[word] = { correct: 0, total: 0 };
      }

      performanceMap[word].total += 1;
      if (wasCorrect) performanceMap[word].correct += 1;
    }

    // Step 3: Construct state vector from words user has encountered
    const masteredThreshold = 1;
    const wordList = Object.keys(performanceMap);
    const stateVector = wordList.map(word => {
      const perf = performanceMap[word];
      return perf.correct >= masteredThreshold ? 1 : 0;
    });

    console.log("State vector from noode back" + stateVector)
    res.json({
      wordList,      // Only words user has seen
      stateVector,   // 1 or 0 for each
    });

  } catch (error) {
    console.error("Error generating state vector:", error);
    res.status(500).json({ error: "Failed to generate state vector" });
  }
});

export default router;
