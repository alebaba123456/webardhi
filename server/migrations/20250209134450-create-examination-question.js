'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExaminationQuestions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      ExaminationId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Examinations"
          }
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      QuestionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Questions"
          }
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExaminationQuestions');
  }
};