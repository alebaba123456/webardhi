class RouterController {
  static async getRouter(req, res, next) {
    try {
      const adminRoles = ['ADMIN', 'KEPALA_SEKOLAH', 'WAKIL_KEPALA_SEKOLAH'];

      const routesByRole = {
        ADMIN_GROUP: [
          { path: '/kelas', name: 'Kelas' },
          { path: '/siswa', name: 'Siswa' },
          { path: '/guru', name: 'Guru' },
          { path: '/pelajaran', name: 'Pelajaran' },
          { path: '/ujian', name: 'Ujian' },
          { path: '/bank-soal/:id?', name: 'Bank_Soal' },
          { path: '/rapot', name: 'Rapot' },
        ],
        GURU: [
          { path: '/kelas', name: 'Kelas' },
          { path: '/siswa', name: 'Siswa' },
          { path: '/ujian', name: 'Ujian' },
          { path: '/bank-soal/:id?', name: 'Bank_Soal' },
          { path: '/rapot', name: 'Rapot' },
        ],
        SISWA: [
          { path: '/pelajaran', name: 'Pelajaran_Ku' },
          { path: '/ujian', name: 'Ujian_Ku' },
          { path: '/sesi-ujian', name: 'Lembar_Ujian' },
          { path: '/rapot', name: 'Rapot_Ku' },
        ],
      };

      const { role } = req.user;

      if (!role) throw { name: 'Modified payload.' };

      let roleRoutes = [];

      if (adminRoles.includes(role)) {
        roleRoutes = routesByRole.ADMIN_GROUP;
      } else if (routesByRole[role]) {
        roleRoutes = routesByRole[role];
      } else {
        throw { name: 'Modified payload.' };
      }

      res.status(200).json({
        defaultRoutes: [
          { path: '/', redirect: '/login' },
          { path: '/login', name: 'Login' },
          { path: '/profil', name: 'Profil' },
        ],
        roleRoutes,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RouterController;
