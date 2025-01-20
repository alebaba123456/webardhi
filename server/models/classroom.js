'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {
      Classroom.hasMany(models.Profile, {foreignKey: 'ClassRoomId'})
      Classroom.hasMany(models.SubjectClass, {foreignKey: 'ClassRoomId'})
    }
  }
  Classroom.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "GRADE IS REQUIRED"
        },
        notEmpty: {
          msg: "GRADE IS REQUIRED"
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
    modelName: 'Classroom',
  });
  return Classroom;
};