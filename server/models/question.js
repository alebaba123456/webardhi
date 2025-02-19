'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Examination, { foreignKey: 'ExaminationId' });
    }
  }
  
  Question.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "QUESTION IS REQUIRED"
        },
        notEmpty: {
          msg: "QUESTION IS REQUIRED"
        }
      }
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ANSWER IS REQUIRED"
        },
        notEmpty: {
          msg: "ANSWER IS REQUIRED"
        }
      }
    },
    type: {
      type: DataTypes.ENUM('Pilihan ganda', 'Esai'),
      allowNull: false,
      validate: {
        notNull: {
          msg: "QUESTION TYPE IS REQUIRED"
        },
        isIn: {
          args: [['Pilihan ganda', 'Esai']],
          msg: "TYPE MUST BE 'Pilihan ganda' OR 'Esai'"
        }
      }
    },
    option: {
      type: DataTypes.JSON,
      allowNull: true,
      validate: {
        isValidOption(value) {
          if (this.type === 'Pilihan ganda') {
            if (!value || !Array.isArray(value) || value.length === 0) {
              throw new Error('OPTIONS MUST BE A NON-EMPTY ARRAY FOR MULTIPLE CHOICE QUESTIONS');
            }
          }
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
    modelName: 'Question',
  });

  return Question;
};
