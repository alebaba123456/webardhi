'use strict';
const {
  Model
} = require('sequelize');

const { textToLow } = require('../helpers/loweringText');
const { hashPassword } = require ('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Profile, {foreignKey: 'ProfileId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "USERNAME ID IS REQUIRED"
        },
        notEmpty: {
          msg: "USERNAME ID IS REQUIRED"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "E-MAIL IS INCORRECT",
        },
        notNull: {
          msg: "TYPE ID IS REQUIRED"
        },
        notEmpty: {
          msg: "TYPE ID IS REQUIRED"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [12, 40],
          msg: "PASSWORD MUST BE AT 12-40 CHARACTERS",
        },
        notNull: {
          msg: "PASSWORD ID IS REQUIRED"
        },
        notEmpty: {
          msg: "PASSWORD ID IS REQUIRED"
        }
      }
    },
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
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.email = textToLow(instance.email)
    instance.password = hashPassword(instance.password)
  })

  return User;
};