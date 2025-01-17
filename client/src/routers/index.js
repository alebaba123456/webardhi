import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { useIndexStore } from "@/stores";

const pinia = createPinia();
setActivePinia(pinia);

const useStore = useIndexStore();
const { goValidate } = useStore 
const { routes } = useStore

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

async function isAuthenticated() {
  try {
    const response = await goValidate();
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

router.beforeEach(async (to, from, next) => {
  const { useIndexStore } = await import('@/stores');
  const { storeToRefs } = await import('pinia');
  const { getMenu } = useIndexStore()
  const { active, accessible, routes } = storeToRefs(useIndexStore());

  active.value = to.name;

  const authenticated = await isAuthenticated();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authenticated) {
      if (!accessible.value) {
        try {
          await getMenu(); // Memuat menu jika belum di-fetch
          next();
        } catch (error) {
          console.error('Failed to fetch menu:', error);
          next({ path: '/login', replace: true });
        }
      } else {
        next();
      }
    } else {
      // Jika tidak terautentikasi
      accessible.value = false; // Reset accessible
      routes.value = [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'Login', component: () => import('@/views/auth/Login.vue') },
      ]; // Reset routes ke nilai default
      await doLogout(); // Hapus token dan kembalikan ke keadaan awal
      next({ path: '/login', replace: true });
    }
  } else if (to.path === '/login' && authenticated) {
    next({ path: '/home', replace: true });
  } else {
    next();
  }
});

export default router;
