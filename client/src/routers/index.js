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
  const { active, roaded } = storeToRefs(useIndexStore());

  active.value = to.name;

  const isAuth = await isAuthenticated();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuth) {
      next();
    } else {
      next({ path: '/login', replace: true });
    }
  } else if (to.path === '/login' && isAuth) {
    next({ path: '/home', replace: true });
  } else {
    next();
  }
});

export default router;
