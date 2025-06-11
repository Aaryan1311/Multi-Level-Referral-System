'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Earning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Earning.belongsTo(models.User, { foreignKey: 'userId' });
      Earning.belongsTo(models.User, { as: 'SourceUser', foreignKey: 'sourceUserId' });
      Earning.belongsTo(models.Purchase, { foreignKey: 'purchaseId' });
    }
  }
  Earning.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    sourceUserId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    purchaseId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Purchases',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    level:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 2
      }
    },
    amountEarned: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0
      }
  }, 
  }, {
    sequelize,
    modelName: 'Earning',
  });
  return Earning;
};