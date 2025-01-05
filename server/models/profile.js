'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.Class, {foreignKey:'ClassRoomId'})
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'NAME IS REQUIRED!',
        },
        notNull: {
          msg: 'NAME IS REQUIRED!',
        },
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'BIRTH DATE IS REQUIRED!',
        },
        notNull: {
          msg: 'BIRTH DATE IS REQUIRED!',
        },
      }
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'RELIGION IS REQUIRED!',
        },
        notNull: {
          msg: 'RELIGION IS REQUIRED!',
        },
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'GENDER IS REQUIRED!',
        },
        notNull: {
          msg: 'GENDER IS REQUIRED!',
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ROLE IS REQUIRED!',
        },
        notNull: {
          msg: 'ROLE IS REQUIRED!',
        },
      }
    },
    ClassRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'CLASS ROOM ID IS REQUIRED!',
        },
        notNull: {
          msg: 'CLASS ROOM ID IS REQUIRED!',
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};