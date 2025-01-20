'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScoreReports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      ProfileId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Profiles"
          }
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
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
      score: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ScoreReports');
  }
};