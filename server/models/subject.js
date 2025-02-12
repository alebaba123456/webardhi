'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.hasMany(models.Examination, {foreignKey: 'SubjectId'})
      Subject.hasMany(models.SubjectClass, {foreignKey: 'SubjectId'})
      Subject.belongsTo(models.Profile, {foreignKey: 'ProfileId'})
    }
  }
  Subject.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
    },
    grade: {
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
    ProfileId : {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "PROFILE ID IS REQUIRED"
        },
        notEmpty: {
          msg: "PROFILE ID IS REQUIRED"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};