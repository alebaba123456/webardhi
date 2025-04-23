import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useIndexStore } from "@/stores";

const pinia = createPinia();
setActivePinia(pinia);

const useStore = useIndexStore();
const { doAuthValidation, getMenu } = useStore;
const { routes, accessible, fetched } = storeToRefs(useStore);

const routeComponents = {
  Login: () => import('@/views/auth/Login.vue'),
  Profil: () => import('@/views/profile/Profile.vue'),
  Kelas: () => import('@/views/dashboard/Classroom.vue'),
  Siswa: () => import('@/views/dashboard/Student.vue'),
  Guru: () => import('@/views/dashboard/Teacher.vue'),
  Ujian: () => import('@/views/dashboard/Exam.vue'),
  Pelajaran: () => import('@/views/dashboard/Subject.vue'),
  Rapot: () => import('@/views/dashboard/Report.vue'),
  Bank_Soal: () => import('@/views/dashboard/Question.vue'),
  Pelajaran_Ku: () => import('@/views/student-dashboard/MySubject.vue'),
  Ujian_Ku: () => import('@/views/student-dashboard/MyExam.vue'),
  Rapot_Ku: () => import('@/views/student-dashboard/MyReport.vue'),
  Lembar_Ujian: () => import('@/views/student-dashboard/MyExamPage.vue'),
  Lembar_Ujian: () => import('@/views/student-dashboard/MyExamPage.vue'),
};

const initialRoutes = routes.value.map((route) => ({
  ...route,
  component: routeComponents[route.name],
}));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: initialRoutes,
});

function reloadRoutes() {
  router.getRoutes().forEach((route) => {
    if (route.name) {
      router.removeRoute(route.name);
    }
  });

  routes.value.forEach((route) => {
    router.addRoute({
      ...route,
      component: routeComponents[route.name],
    });
  });
}

async function isAuthenticated() {
  try {
    const response = await doAuthValidation();
    return response.data;
  } catch (error) {
    return false;
  }
}

watch(
  routes,
  () => {
    reloadRoutes();
  },
  { deep: true }
);

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      return next({ path: '/profil', replace: true });
    }
    return next();
  }

  const authenticated = await isAuthenticated();

  if (!authenticated && to.path !== '/login') {
    return next({ path: '/login', replace: true });
  }

  if (authenticated?.data) {
    fetched.value = JSON.parse(authenticated.data);
  }

  if (authenticated?.message === 'On Exam!' && to.path !== '/sesi-ujian') {
    return next({ path: '/sesi-ujian', replace: true });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authenticated) {
      if (!accessible.value) {
        try {
          await getMenu();
        } catch (error) {
          return next({ path: '/login', replace: true });
        }
      }
      return next();
    }

    accessible.value = false;
    routes.value = [
      { path: '/', redirect: '/login' },
      { path: '/login', name: 'Login', component: routeComponents.Login },
    ];
    return next({ path: '/login', replace: true });
  }

  if (authenticated && !accessible.value) {
    try {
      await getMenu();
      return next({ path: to.fullPath, replace: true });
    } catch (error) {
      return next({ path: '/login', replace: true });
    }
  }

  next();
});

export default router;
