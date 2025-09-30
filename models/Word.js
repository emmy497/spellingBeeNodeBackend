
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

 const Word = sequelize.define('Word', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
});

export default Word