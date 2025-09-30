import { DataTypes } from 'sequelize';
import sequelize from '../../sequelize.js';


  const Child = sequelize.define('Child', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    // age: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // parentId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  });

  Child.associate = (models) => {
    Child.belongsTo(models.Parent, {
      foreignKey: 'parentId',
      as: 'parent',
    });
  };


  export default Child;