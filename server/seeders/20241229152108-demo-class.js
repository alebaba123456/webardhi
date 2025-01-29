module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Classrooms', [
      { 
        id : '4e2a41fc-23bf-42db-b14e-78d8df14f942',
        grade: 0,
        code: 'ADMIN', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      { 
        id: '9f0c7f3d-59b8-4d70-b5ad-5d2e7c36de8f',
        grade: 0,
        code: 'GURU', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Classrooms', null, {});
  },
};
