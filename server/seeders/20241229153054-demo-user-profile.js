module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserProfiles', [
      {
        name: 'John Doe',
        birthDate: '2000-01-01',
        religion: 'Christianity',
        gender: 'male',
        role: 'student',
        class: '10A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        birthDate: '1995-03-25',
        religion: 'Islam',
        gender: 'female',
        role: 'teacher',
        class: '10B',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Admin User',
        birthDate: '1990-07-15',
        religion: 'Hindu',
        gender: 'male',
        role: 'admin',
        class: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserProfiles', null, {});
  },
};
