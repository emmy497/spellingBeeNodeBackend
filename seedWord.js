// scripts/seedWords.js
import Word from './models/Word.js';
import sequelize from './sequelize.js';

const words = [
  { word: 'apple' },
  { word: 'banana' },
  { word: 'elephant' },
  { word: 'algorithm' },
  { word: 'computer' },
  { word: 'science' },
  { word: 'psychology' },
  { word: 'dictionary' },
  { word: 'chameleon' },
  { word: 'photosynthesis' },
  { word: 'rendezvous' },
  { word: 'umbrella' },
];

const seedWords = async () => {
  try {
    await sequelize.sync(); // ensures table is created
    await Word.bulkCreate(words);
    console.log('Words table seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedWords();
