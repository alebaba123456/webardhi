'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExaminationQuestion extends Model {
    static associate(models) {
      ExaminationQuestion.belongsTo(models.Examination, {foreignKey: 'ExaminationId'})
      ExaminationQuestion.belongsTo(models.Question, {foreignKey: 'QuestionId'})
    }
  }
  ExaminationQuestion.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ExaminationId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "EXAMINATION ID IS REQUIRED"
        },
        notEmpty: {
          msg: "EXAMINATION ID IS REQUIRED"
        }
      }
    },
    QuestionId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "QUESTION ID IS REQUIRED"
        },
        notEmpty: {
          msg: "QUESTION ID IS REQUIRED"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ExaminationQuestion',
  });
  return ExaminationQuestion;
};