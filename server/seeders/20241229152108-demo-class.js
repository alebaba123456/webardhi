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
      { 
        id: 'a1e5f6d7-4b21-43c2-9f61-7890ab123456',
        grade: 7,
        code: 'A', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      { 
        id: 'b2d5f7e8-5c32-54d3-8f72-8901bc234567',
        grade: 7,
        code: 'B', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      { 
        id: 'c3e6f8f9-6d43-65e4-9f83-9012cd345678',
        grade: 8,
        code: 'A', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      { 
        id: 'd4f7f9fa-7e54-76f5-af94-0123de456789',
        grade: 8,
        code: 'B', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      { 
        // Replaced invalid 'g' in segment with 'f' to produce a valid UUID
        id: 'e5f8fafb-8f65-87f6-b0a5-1234ef567890',
        grade: 9,
        code: 'A', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      { 
        // Replaced invalid 'g' and 'h' in segment with 'f' and 'a' respectively
        id: 'f6f9fbfc-9f76-98a7-c1b6-2345f6789012',
        grade: 9,
        code: 'B', 
        createdAt: new Date(),
        updatedAt: new Date() 
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Classrooms', null, {});
  },
};
