'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectClass extends Model {
    static associate(models) {
      SubjectClass.belongsTo(models.Classroom, {foreignKey: 'ClassRoomId'})
      SubjectClass.belongsTo(models.Subject, {foreignKey: 'SubjectId'})
    }
  }
  SubjectClass.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ClassRoomId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "CLASSROOM ID IS REQUIRED"
        },
        notEmpty: {
          msg: "CLASSROOM ID IS REQUIRED"
        }
      }
    },
    SubjectId: {
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
    }
  }, {
    sequelize,
    modelName: 'SubjectClass',
  });
  return SubjectClass;
};