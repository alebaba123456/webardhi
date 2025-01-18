import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia, storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useIndexStore } from "@/stores";

const pinia = createPinia();
setActivePinia(pinia);

const useStore = useIndexStore();
const { doAuthValidation, getMenu } = useStore;
const { routes, accessible, active } = storeToRefs(useStore);

const routeComponents = {
  Login: () => import('@/views/auth/Login.vue'),
  Profil: () => import('@/views/profile/Profile.vue'),
  Kelas: () => import('@/views/dashboard/Class.vue'),
  Siswa: () => import('@/views/dashboard/Student.vue'),
  Guru: () => import('@/views/dashboard/Teacher.vue'),
  Ujian: () => import('@/views/dashboard/Exam.vue'),
  Pelajaran: () => import('@/views/dashboard/Subject.vue'),
  Rapot: () => import('@/views/dashboard/Report.vue'),
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
    return response.status === 200;
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
  active.value = to.name;
  const authenticated = await isAuthenticated();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authenticated) {
      if (!accessible.value) {
        try {
          await getMenu();
          next();
        } catch (error) {
          next({ path: '/login', replace: true });
        }
      } else {
        next();
      }
    } else {
      accessible.value = false;
      routes.value = [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'Login', component: Login },
      ];
      next({ path: '/login', replace: true });
    }
  } else if (to.path === '/login' && authenticated) {
    next({ path: '/profil', replace: true });
  } else {
    if (authenticated && !accessible.value) {
      try {
        await getMenu();
        next({path: to.fullPath, replace: true});
      } catch (error) {
        next({ path: '/login', replace: true });
      }
    } else {
      next();
    }
  }
});

export default router;
