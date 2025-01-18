// states.js
import { ref } from "vue";

export const state = {
  page: ref(1),
  active: ref(""),
  loading: ref(false),
  accessible: ref(false),
  routes: ref([
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login'},
  ]),
};
