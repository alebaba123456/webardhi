// states.js
import { ref } from "vue";

export const state = {
  page: ref(1),
  size: ref(10),
  active: ref(""),
  loading: ref(false),
  accessible: ref(false),
  routes: ref([
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login'},
  ]),
  fetched: ref(null),
  query : ref("?page=1&size=10"),
  keyword: ref(null),
  category: ref(null),
  order: ref(null),
};
