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
      {
        id: 'e79bb47c-3b77-4c4c-8b82-0a4c95e4d7b1',
        name: 'BUDI SULISTYO',
        birthDate: '1970-01-15T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'L',
        role: 'KEPALA_SEKOLAH',
        ClassRoomId: '9f0c7f3d-59b8-4d70-b5ad-5d2e7c36de8f',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd3d9a839-bc4c-4c89-a6e4-8f30f87366e2',
        name: 'SITI BADRIAH',
        birthDate: '1975-03-20T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'WAKIL_KEPALA_SEKOLAH',
        ClassRoomId: '9f0c7f3d-59b8-4d70-b5ad-5d2e7c36de8f',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a69c0b72-3ea9-44b0-80de-25c4b7b5f3e3',
        name: 'AGUS SALIM',
        birthDate: '1980-07-10T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'L',
        role: 'GURU',
        ClassRoomId: '9f0c7f3d-59b8-4d70-b5ad-5d2e7c36de8f',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f2a8e2fa-1f09-41a2-a3c8-5baf1d3f3f44',
        name: 'RINA CHIKA',
        birthDate: '1982-11-25T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'GURU',
        ClassRoomId: '9f0c7f3d-59b8-4d70-b5ad-5d2e7c36de8f',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c5b9d1a0-9a7a-4e39-b1c2-2a88b9f73e57',
        name: 'JOKO DRIYONO',
        birthDate: '1978-09-30T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'L',
        role: 'GURU',
        ClassRoomId: '9f0c7f3d-59b8-4d70-b5ad-5d2e7c36de8f',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7a8f4b59-4c2d-4e8e-9a3e-1e4a0d5c9f01',
        name: 'ARDHI FIRMANSYAH',
        birthDate: '2007-05-01T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'a1e5f6d7-4b21-43c2-9f61-7890ab123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1e2a3d4-f5c6-47a8-9b01-c2d3e4f5a678',
        name: 'AULIA AGUS MAULANA',
        birthDate: '2007-06-02T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'b2d5f7e8-5c32-54d3-8f72-8901bc234567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9c8d7e6f-5a4b-3c2d-1e0f-1234567890ab',
        name: 'RYAN HARIYANTO',
        birthDate: '2007-07-03T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'a1e5f6d7-4b21-43c2-9f61-7890ab123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f0e1d2c3-b4a5-6789-0cde-1f23456789ab',
        name: 'FAHRUL MAULANA FIKRI',
        birthDate: '2007-08-04T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'b2d5f7e8-5c32-54d3-8f72-8901bc234567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'KAUSAR RAMADHANA',
        birthDate: '2007-09-05T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'a1e5f6d7-4b21-43c2-9f61-7890ab123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '00112233-4455-6677-8899-aabbccddeeff',
        name: 'CHAVIKA XAVERIUS LOVA',
        birthDate: '2007-10-06T00:00:00.000Z',
        religion: 'KATOLIK',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'b2d5f7e8-5c32-54d3-8f72-8901bc234567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '11223344-5566-7788-99aa-bbccddeeff00',
        name: 'FAIZ FANANI',
        birthDate: '2007-11-07T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'a1e5f6d7-4b21-43c2-9f61-7890ab123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '22334455-6677-8899-aabb-ccddeeff0011',
        name: 'DWIKA ARIYANI',
        birthDate: '2006-05-01T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'c3e6f8f9-6d43-65e4-9f83-9012cd345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '33445566-7788-99aa-bbcc-ddeeff001122',
        name: 'LUCYANA VOLAHRAY NOVELINA',
        birthDate: '2006-06-02T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'd4f7f9fa-7e54-76f5-af94-0123de456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '44556677-8899-aabb-ccdd-eeff00112233',
        name: 'DIAN KRISTIANA',
        birthDate: '2006-07-03T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'c3e6f8f9-6d43-65e4-9f83-9012cd345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '55667788-99aa-bbcc-ddee-ff0011223344',
        name: 'DENNY CHRISTIANTO',
        birthDate: '2006-08-04T00:00:00.000Z',
        religion: 'KATOLIK',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'd4f7f9fa-7e54-76f5-af94-0123de456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '66778899-aabb-ccdd-eeff-001122334455',
        name: 'WINDADIA SABRINA',
        birthDate: '2006-09-05T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'c3e6f8f9-6d43-65e4-9f83-9012cd345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '778899aa-bbcc-ddee-ff00-112233445566',
        name: 'DANIEL HILARIOUS',
        birthDate: '2006-10-06T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'd4f7f9fa-7e54-76f5-af94-0123de456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8899aabb-ccdd-eeff-0011-223344556677',
        name: 'GADIS FAUZIAH',
        birthDate: '2005-05-01T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'e5f8fafb-8f65-87f6-b0a5-1234ef567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '99aabbcc-ddee-ff00-1122-334455667788',
        name: 'YOSEPH FERDINAND',
        birthDate: '2005-06-02T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'f6f9fbfc-9f76-98a7-c1b6-2345f6789012',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'aabbccdd-eeff-0011-2233-445566778899',
        name: 'SALSABILA GISYA',
        birthDate: '2005-07-03T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'e5f8fafb-8f65-87f6-b0a5-1234ef567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'bbccddee-ffee-0011-2233-4455667788aa',
        name: 'ENRICO CHRISTIAN LAZAUDA',
        birthDate: '2005-08-04T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'f6f9fbfc-9f76-98a7-c1b6-2345f6789012',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'ccddeeff-0011-2233-4455-66778899aabb',
        name: 'AMIRAH FATIMAH',
        birthDate: '2005-09-05T00:00:00.000Z',
        religion: 'ISLAM',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'e5f8fafb-8f65-87f6-b0a5-1234ef567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'ddeeff00-1122-3344-5566-778899aabbcc',
        name: 'FREDY TOBING',
        birthDate: '2005-10-06T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'L',
        role: 'SISWA',
        ClassRoomId: 'f6f9fbfc-9f76-98a7-c1b6-2345f6789012',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'eeff0011-2233-4455-6677-8899aabbccdd',
        name: 'PATRICIA LADY',
        birthDate: '2005-11-07T00:00:00.000Z',
        religion: 'KRISTEN',
        gender: 'P',
        role: 'SISWA',
        ClassRoomId: 'e5f8fafb-8f65-87f6-b0a5-1234ef567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Profiles', null, {});
  },
};
