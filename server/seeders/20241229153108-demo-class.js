module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Classes', [
      { grade: 7, createdAt: new Date(), updatedAt: new Date() },
      { grade: 8, createdAt: new Date(), updatedAt: new Date() },
      { grade: 9, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Classes', null, {});
  },
};
