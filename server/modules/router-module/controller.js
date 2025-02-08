class RouterController {
  static async getRouter(req, res, next) {
    try {
      const routesByRole = {
        ADMIN: [
          { path: '/ruang-kelas', name: 'RuangKelas' },
          { path: '/siswa', name: 'Siswa' },
          { path: '/guru', name: 'Guru' },
          { path: '/ujian', name: 'Ujian' },
          { path: '/pelajaran', name: 'Pelajaran' },
          { path: '/kelas', name: 'Kelas' },
        ],
        GURU: [
          { path: '/ruangkelas', name: 'Ruang Kelas' },
          { path: '/siswa', name: 'Siswa' },
          { path: '/ujian', name: 'Ujian' },
        ],
        SISWA: [
          { path: '/pelajaran', name: 'Pelajaran' },
          { path: '/ujian', name: 'Ujian' },
          { path: '/hasil', name: 'Hasil' },
        ],
      };

      const { role } = req.user;
      if (!role || !routesByRole[role]) {
        throw { name: 'Modified payload.' }
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
      next(error)
    }
  }
}

module.exports = RouterController