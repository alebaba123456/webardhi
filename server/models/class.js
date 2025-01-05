'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      Class.hasMany(models.Profile, {foreignKey: 'ClassRoomId'})
      Class.hasMany(models.Examination, {foreignKey: 'ClassRoomId'})
    }
  }
  Class.init({
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'GRADE IS REQUIRED!',
        },
        notNull: {
          msg: 'GRADE IS REQUIRED!',
        },
      }
    },
    classCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'CLASS CODE IS REQUIRED!',
        },
        notNull: {
          msg: 'CLASS CODE IS REQUIRED!',
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};