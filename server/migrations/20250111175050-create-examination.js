'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Examinations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      examinationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      SubjectId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Subjects'
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
    await queryInterface.dropTable('Examinations');
  }
};