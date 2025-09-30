import Word from "../models/Word.js"
import express from "express"
const router = express.Router()
import { fn } from "sequelize";
import axios from "axios";


import { updateMasteredStatus } from "../utils/userPerfomanceService.js";
import { UserWordPerformance } from "../models/UserWordPerformance.js";
import { getUserPerformance } from "../utils/performanceController.js";
import { getUserWordPerformance } from "../utils/getUserWordPerformance.js";







router.get("/getWord", async (req, res) => {
  const userId = req.query.user_id;  
  if (!userId) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  try {
    // Step 1: Get a random word
    const wordEntry = await Word.findOne({
      order: [fn('RAND')],
      attributes: ['word']
    });

    if (!wordEntry) {
      return res.status(404).json({ error: 'No word found' });
    }

    const word = wordEntry.dataValues.word;

    

   
    const userWord = await UserWordPerformance.findOne({
      where: {
        user_id: userId,
        word: word
      },
      attributes: ['mastered']  // Or use `was_correct` if that's what you're tracking
    });

    const mastered = userWord ? userWord.dataValues.mastered : false;

    // Step 3: Return word and mastered status
    res.json({ word, mastered, performance });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
 


// router.get("/getWord", async (req, res) => {
//     try {
//         const word = await Word.findOne({
//       order: [fn('RAND')], 
//     });

   
//     console.log(word)

//      if (!word) {
//       return res.status(404).json({ error: 'No word found' });
//     }

//     res.json({word })

//     }catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// }) 

// router.get("/getWord", async (req, res) => {

 

//   let word
//   try {
//     const wordEntry = await Word.findOne({
//       order: [fn('RAND')], 
//       attributes: ['word']  // Only select the word field
//     });

    
//     let word = wordEntry.dataValues.word
    
//     console.log(wordEntry)

//     if (!wordEntry) {
//       return res.status(404).json({ error: 'No word found' });
//     }


//     res.json({ word: word});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }

 



// });


// router.get("/getWord", async (req, res) => {
//   try {
//     const userId = req.query.user_id;

//     // 1. Get all candidate words from the DB
//     const words = await Word.findAll({ attributes: ["id", "word"] });

//     // 2. Get user-word performance stats from your DB (e.g., retries, correctness, is_mastered)
//     const userPerformance = await getUserPerformance(userId); // define this function

//     // 3. Send data to your Python backend (DQN model) to choose the best word
//     const response = await axios.post("http://localhost:5000/select-word", {
//       words: words.map(w => w.word),
//       user_id: userId,
//       performance_data: userPerformance,
//     });

//     const chosenWord = response.data.word;
//     const chosenId = response.data.word_id;

//     return res.json({ word: chosenWord, word_id: chosenId });
//   } catch (err) {
//     console.error("Error in getWord:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });



router.post('/update-performance', async (req, res) => {
  const { user_id, word, was_correct, retries, response_time } = req.body;

  if (!user_id || !word) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = await updateMasteredStatus(
    user_id,
    word,
    was_correct,
    retries,
    response_time
  );

  if (result.success) {
    return res.json({
      message: "Mastery status updated",
      mastered: result.mastered,
    });
  } else {
    return res.status(500).json({ error: "Failed to update mastery status" });
  }
 
}); 
export default router  