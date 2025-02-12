'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examination extends Model {
    static associate(models) {
      Examination.hasMany(models.ScoreReport, {foreignKey:'ExaminationId'})
      Examination.hasMany(models.Question, {foreignKey:'ExaminationId'})
      Examination.belongsTo(models.Subject, {foreignKey:'SubjectId'})
    }
  }
  Examination.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
    examinationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "EXAMINATION IS REQUIRED"
        },
        notEmpty: {
          msg: "EXAMINATION IS REQUIRED"
        }
      }
    },
    SubjectId : {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "SUBJECT ID IS REQUIRED"
        },
        notEmpty: {
          msg: "SUBJECT ID IS REQUIRED"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Examination',
  });
  return Examination;
};