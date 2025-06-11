'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
          User.hasMany(models.User, { as: 'Referrals', foreignKey: 'referrerId' });
          User.belongsTo(models.User, { as: 'Referrer', foreignKey: 'referrerId' });
          User.hasMany(models.Purchase, { foreignKey: 'userId' });
          User.hasMany(models.Earning, { foreignKey: 'userId' }); 
          User.hasMany(models.Earning, { as: 'TriggeredEarnings', foreignKey: 'sourceUserId' }); 
    }
}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }, 
    referrerId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};