class RouterController {
    static async getRouter (req, res, next) {
        try {
            const routesByRole = {
                Admin: [
                  { path: '/class', name: 'Class', component: 'dashboard/Class' },
                  { path: '/student', name: 'Student', component: 'dashboard/Student' },
                  { path: '/teacher', name: 'Teacher', component: 'dashboard/Teacher' },
                  { path: '/exam', name: 'Exam', component: 'dashboard/Exam' },
                  { path: '/subject', name: 'Subject', component: 'dashboard/Subject' },
                ],
                Guru: [
                  { path: '/class', name: 'Class', component: 'dashboard/Class' },
                  { path: '/subject', name: 'Subject', component: 'dashboard/Subject' },
                  { path: '/student', name: 'Student', component: 'dashboard/Student' },
                  { path: '/exam', name: 'Exam', component: 'dashboard/Exam' },
                ],
                Siswa: [
                  { path: '/subject', name: 'Subject', component: 'dashboard/Subject' },
                  { path: '/exam', name: 'Exam', component: 'dashboard/Exam' },
                  { path: '/report', name: 'Report', component: 'dashboard/Report' },
                ],
              };

              const { role } = req.user;

              if (!role || !routesByRole[role]) {
                throw { name : 'Modified payload.'}
              }

              res.status(200).json({
                defaultRoutes: [
                  { path: '/', redirect: '/login' },
                  { path: '/login', name: 'Login', component: 'auth/Login' },
                  { path: '/profile', name: 'Profile', component: 'profile/Profile' },
                ],
                roleRoutes: routesByRole[role],
              });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RouterController