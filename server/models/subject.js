'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.hasMany(models.SubjectClass, {foreignKey: 'SubjectId'})
    }
  }
  Subject.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "NAME IS REQUIRED"
        },
        notEmpty: {
          msg: "NAME IS REQUIRED"
        }
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "CODE IS REQUIRED"
        },
        notEmpty: {
          msg: "CODE IS REQUIRED"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};