'use strict';
const {
  Model
} = require('sequelize');
const { textToLow } = require('../helpers/loweringText');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasOne(models.User, {foreignKey:'ProfileId'})
      Profile.hasMany(models.ScoreReport, {foreignKey: 'ProfileId'})
      Profile.hasMany(models.Subject, {foreignKey: 'ProfileId'})
      Profile.belongsTo(models.Classroom, {foreignKey: 'ClassRoomId'})
    }
  }
  Profile.init({
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
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "BIRTHDATE IS REQUIRED"
        },
        notEmpty: {
          msg: "BIRTHDATE IS REQUIRED"
        }
      }
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "RELIGION IS REQUIRED"
        },
        notEmpty: {
          msg: "RELIGION IS REQUIRED"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "GENDER IS REQUIRED"
        },
        notEmpty: {
          msg: "GENDER IS REQUIRED"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ROLE IS REQUIRED"
        },
        notEmpty: {
          msg: "ROLE IS REQUIRED"
        }
      }
    },
    ClassRoomId: {
      type: DataTypes.UUID,
    }
  }, {
    sequelize,
    modelName: 'Profile',
  }); 

  return Profile;
};