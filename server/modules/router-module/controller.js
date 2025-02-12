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
        ],
        GURU: [
          { path: '/kelas', name: 'Kelas' },
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