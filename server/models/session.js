const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }

  Session.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'SESSION IS REQUIRED',
        },
        notEmpty: {
          msg: 'SESSION IS REQUIRED',
        },
      },
    },
    privateKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'PRIVATE KEY IS REQUIRED',
        },
        notEmpty: {
          msg: 'PRIVATE KEY IS REQUIRED',
        },
      },
    },
    publicKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'PUBLIC KEY IS REQUIRED',
        },
        notEmpty: {
          msg: 'PUBLIC KEY IS REQUIRED',
        },
      },
    },
    fingerPrint: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'FINGERPRINT IS REQUIRED',
        },
        notEmpty: {
          msg: 'FINGERPRINT IS REQUIRED',
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'USER ID IS REQUIRED',
        },
        notEmpty: {
          msg: 'USER ID IS REQUIRED',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Session',
  });

  return Session;
};