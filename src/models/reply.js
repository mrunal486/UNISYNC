'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    static associate(models) {
      Reply.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
      Reply.belongsTo(models.Thread, { foreignKey: 'threadId' });
    }
  }

  Reply.init({
    threadId: {
      type: DataTypes.INTEGER,
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
    modelName: 'Reply',
  });

  return Reply;
};