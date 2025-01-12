'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examination extends Model {
    static associate(models) {
      Examination.hasMany(models.Question, {foreignKey:'ExaminationId'})
      Examination.hasMany(models.ScoreReport, {foreignKey:'ExaminationId'})
      Examination.belongsTo(models.SubjectClass, {foreignKey:'SubjectClassId'})
    }
  }
  Examination.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "TYPE IS REQUIRED"
        },
        notEmpty: {
          msg: "TYPE IS REQUIRED"
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
    },
    SubjectClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "SUBJECT CLASS ID IS REQUIRED"
        },
        notEmpty: {
          msg: "SUBJECT CLASS ID IS REQUIRED"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Examination',
  });
  return Examination;
};