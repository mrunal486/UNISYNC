'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    static associate(models) {
      Community.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
      Community.hasMany(models.Thread, { foreignKey: 'communityId' });
      Community.belongsToMany(models.User, { through: 'Membership', foreignKey: 'communityId' });
    }
  }

  Community.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Community',
  });

  return Community;
};