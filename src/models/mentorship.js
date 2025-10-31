'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mentorship extends Model {
    static associate(models) {
      Mentorship.belongsTo(models.User, { foreignKey: 'studentId', as: 'student' });
      Mentorship.belongsTo(models.User, { foreignKey: 'mentorId', as: 'mentor' });
    }
  }

  Mentorship.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mentorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    compatibilityScore: DataTypes.FLOAT,
    status: {
      type: DataTypes.ENUM('pending', 'active', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    modelName: 'Mentorship',
  });

  return Mentorship;
};