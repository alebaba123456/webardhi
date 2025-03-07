class RouterController {
  static async getRouter(req, res, next) {
    try {
      const routesByRole = {
        ADMIN: [
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
      if (!role || !routesByRole[role]) {
        throw { name: 'Modified payload.' };
      }

      res.status(200).json({
        defaultRoutes: [
          { path: '/', redirect: '/login' },
          { path: '/login', name: 'Login' },
          { path: '/profil', name: 'Profil' },
        ],
        roleRoutes: routesByRole[role],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RouterController;
