// states.js
import { ref } from "vue";

export const state = {
  page: ref(1), // Mengelola halaman aktif
  active: ref(""), // Mengelola state aktif
  loading: ref(false), // Status loading
};
