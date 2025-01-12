'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectClass extends Model {
    static associate(models) {
      SubjectClass.belongsTo(models.Profile, {foreignKey: 'ProfileId'})
      SubjectClass.belongsTo(models.Classroom, {foreignKey: 'ClassroomId'})
      SubjectClass.belongsTo(models.Subject, {foreignKey: 'SubjectId'})
      SubjectClass.hasMany(models.Examination, {foreignKey: 'SubjectClassId'})
    }
  }
  SubjectClass.init({
    ProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "PROFILE ID IS REQUIRED"
        },
        notEmpty: {
          msg: "PROFILE ID IS REQUIRED"
        }
      }
    },
    ClassRoomId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
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