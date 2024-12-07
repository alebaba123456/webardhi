import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Class from '@/views/Class.vue';
import Task from '@/views/Task.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/class', name: 'Class', component: Class },
  { path: '/task', name: 'Task', component: Task },
  { path: '/profile', name: 'Profile', component: Profile }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
