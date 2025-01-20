'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScoreReport extends Model {
    static associate(models) {
      ScoreReport.belongsTo(models.Profile, {foreignKey: 'ProfileId'})
      ScoreReport.belongsTo(models.Examination, {foreignKey: 'ExaminationId'})
    }
  }
  ScoreReport.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ProfileId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "PROFILE IS REQUIRED"
        },
        notEmpty: {
          msg: "PROFILE IS REQUIRED"
        }
      }
    },
    ExaminationId: {
      type: DataTypes.UUID,
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "SCORE IS REQUIRED"
        },
        notEmpty: {
          msg: "SCORE IS REQUIRED"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ScoreReport',
  });
  return ScoreReport;
};