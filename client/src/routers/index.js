import { createRouter, createWebHistory } from 'vue-router';
import { goValidate } from '@/stores/apis';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Class from '@/views/Class.vue';
import Task from '@/views/Task.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/class', name: 'Class', component: Class, meta: { requiresAuth: true } },
  { path: '/task', name: 'Task', component: Task, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

async function isAuthenticated() {
  try {
    const response = await goValidate();
    return response.status === 200; // Authentication successful
  } catch (error) {
    console.error('Authentication failed:', error);
    return false; // Authentication failed
  }
}

router.beforeEach(async (to, from, next) => {
  const { useIndexStore } = await import('@/stores');
  const { storeToRefs } = await import('pinia');
  const { active } = storeToRefs(useIndexStore());

  active.value = to.name;

  const isAuth = await isAuthenticated();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuth) {
      next(); // Proceed if authenticated
    } else {
      next({ path: '/login', replace: true }); // Redirect to login
    }
  } else if (to.path === '/login' && isAuth) {
    next({ path: '/home', replace: true }); // Redirect to home if already authenticated
  } else {
    next(); // Proceed to route
  }
});

export default router;
