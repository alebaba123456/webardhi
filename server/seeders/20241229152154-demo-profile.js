module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Profiles', [
      {
        id: 'f6d74824-03f6-4f5e-b109-5f14c9ddf674',
        name: 'ADMIN AL HUSNA',
        birthDate: '1994-12-13T00:00:00.000Z',
        religion: 'LAINNYA',
        gender: 'L',
        role: 'ADMIN',
        ClassRoomId: '4e2a41fc-23bf-42db-b14e-78d8df14f942',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
