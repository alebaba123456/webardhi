const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 'a7e4c8fa-1c3e-4d9a-bf0e-f8d704e17831',
        username: 'ADMIN AL HUSNA',
        email: 'adm.mts.alhusna@gmail.com',
        password: await hashPassword('AlHusnaAdmin1994'),
        ProfileId: 'f6d74824-03f6-4f5e-b109-5f14c9ddf674',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7e4c8fa-1c3e-4d9a-bf0e-f8d704e17832',
        username: 'BUDI SULISTYO',
        email: 'dikyatama@gmail.com',
        password: await hashPassword('AlHusnaKepsek1994'),
        ProfileId: 'e79bb47c-3b77-4c4c-8b82-0a4c95e4d7b1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7e4c8fa-1c3e-4d9a-bf0e-f8d704e17833',
        username: 'SITI BADRIAH',
        email: 'clkytm@gmail.com',
        password: await hashPassword('AlHusnaAdmin1994'),
        ProfileId: 'd3d9a839-bc4c-4c89-a6e4-8f30f87366e2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
