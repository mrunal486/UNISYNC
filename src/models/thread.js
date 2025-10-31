'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
      Thread.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
      Thread.belongsTo(models.Community, { foreignKey: 'communityId' });
      Thread.hasMany(models.Reply, { foreignKey: 'threadId' });
    }
  }

  Thread.init({
    communityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Thread',
  });

  return Thread;
};