'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectExamination extends Model {
    static associate(models) {
      SubjectExamination.belongsTo(models.SubjectClass, {foreignKey: 'SubjectClassId'})
      SubjectExamination.belongsTo(models.Examination, {foreignKey: 'ExaminationId'})
    }
  }
  SubjectExamination.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    SubjectClassId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "SUBJECT CLASS ID IS REQUIRED"
        },
        notEmpty: {
          msg: "SUBJECT CLASS ID IS REQUIRED"
        }
      }
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
    }
  }, {
    sequelize,
    modelName: 'SubjectExamination',
  });
  return SubjectExamination;
};