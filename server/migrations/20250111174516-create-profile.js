'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      religion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ClassRoomId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Classrooms"
          }
        },
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
    await queryInterface.dropTable('Profiles');
  }
};