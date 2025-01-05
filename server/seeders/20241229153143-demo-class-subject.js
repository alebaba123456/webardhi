module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ClassSubjects', [
      { name: 'Mathematics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Science', createdAt: new Date(), updatedAt: new Date() },
      { name: 'English', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ClassSubjects', null, {});
  },
};
