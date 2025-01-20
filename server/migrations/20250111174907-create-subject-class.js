'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubjectClasses', {
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
      ClassRoomId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Classrooms"
          }
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      SubjectId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Subjects"
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
    await queryInterface.dropTable('SubjectClasses');
  }
};