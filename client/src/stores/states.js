// states.js
import { ref } from "vue";

export const state = {
  page: ref(1),
  max: ref(1),
  visible: ref([]),
  size: ref(10),
  active: ref(""),
  loading: ref(false),
  accessible: ref(false),
  modal: ref(false),
  modalName: ref(null),
  props: ref({}),
  routes: ref([
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login'},
  ]),
  fetched: ref(null),
  query : ref(""),
  keyword: ref(null),
  category: ref(null),
  order: ref(null),
  role: ref(null),
  errStatus: ref(false),
  errCode: ref(null),
  errMessage: ref(null),
};
