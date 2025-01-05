module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        email: 'student1@example.com',
        password: '$2b$10$5LQIuYUEowD8PSN1nIm0V.QMZIr3diYsKYk.NhYXotnq6P42jtswa', // bcrypt hash for 'password123'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'teacher1@example.com',
        password: '$2b$10$5LQIuYUEowD8PSN1nIm0V.QMZIr3diYsKYk.NhYXotnq6P42jtswa', // bcrypt hash for 'password123'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@example.com',
        password: '$2b$10$5LQIuYUEowD8PSN1nIm0V.QMZIr3diYsKYk.NhYXotnq6P42jtswa', // bcrypt hash for 'password123'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
