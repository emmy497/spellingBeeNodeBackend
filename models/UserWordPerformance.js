import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './User.js';
import Word from './Word.js';

export const UserWordPerformance = sequelize.define('UserWordPerformance', {
  user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    was_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    retries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    response_time: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    mastered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
});

