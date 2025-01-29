const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 'a7e4c8fa-1c3e-4d9a-bf0e-f8d704e17831',
        username: 'ADMIN AL HUSNA',
        email: 'adm.mts.alhusna@gmail.com',
        password: hashPassword('AlHusnaAdmin1994'),
        ProfileId: 'f6d74824-03f6-4f5e-b109-5f14c9ddf674',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
