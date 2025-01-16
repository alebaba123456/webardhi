// actions.js
import router from "@/routers";
import { state } from "@/stores/states";
import { loginAPI } from "@/stores/apis";

const { page, active, loading } = state;

export const actions = {
  async doLogin(payload) {
    try {
      loading.value = true;
      const response = await loginAPI(payload.email, payload.password);
      if (response.status === 200) {
        router.push("/home");
      } else {
        console.error("Login gagal:", response.data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false;
    }
  },
};
