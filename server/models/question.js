'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Examination, {foreignKey: 'ExaminationId'})
    }
  }
  Question.init({
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "QUESTION IS REQUIRED"
        },
        notEmpty: {
          msg: "QUESTION IS REQUIRED"
        }
      }
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ANSWER IS REQUIRED"
        },
        notEmpty: {
          msg: "ANSWER IS REQUIRED"
        }
      }
    },
    option: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "STATUS IS REQUIRED"
        },
        notEmpty: {
          msg: "STATUS IS REQUIRED"
        }
      }
    },
    ExaminationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "EXAMINATION ID IS REQUIRED"
        },
        notEmpty: {
          msg: "EXAMINATION ID IS REQUIRED"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};