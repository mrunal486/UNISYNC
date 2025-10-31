'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Mentorship, { foreignKey: 'studentId', as: 'studentMentorships' });
      User.hasMany(models.Mentorship, { foreignKey: 'mentorId', as: 'mentorMentorships' });
      User.hasMany(models.Thread, { foreignKey: 'authorId' });
      User.hasMany(models.Reply, { foreignKey: 'authorId' });
      User.hasMany(models.Event, { foreignKey: 'organizerId' });
      User.hasMany(models.Resource, { foreignKey: 'uploadedBy' });
      User.hasMany(models.Message, { foreignKey: 'senderId' });
      User.belongsToMany(models.Community, { through: 'Membership', foreignKey: 'userId' });
      User.belongsToMany(models.ChatRoom, { through: 'ChatRoomParticipant', foreignKey: 'userId' });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM('student', 'alumni', 'expert', 'admin'),
      allowNull: false,
    },
    profilePicture: DataTypes.TEXT,
    yearOfStudy: DataTypes.INTEGER,
    branch: DataTypes.STRING,
    company: DataTypes.STRING,
    role: DataTypes.STRING,
    interests: DataTypes.TEXT, // Stored as comma-separated string
    skills: DataTypes.TEXT, // Stored as comma-separated string
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};