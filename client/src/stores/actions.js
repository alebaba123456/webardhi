// actions.js
import router from "@/routers";
import { state } from "@/stores/states";
import { loginAPI, logoutAPI, routesAPI, validateAPI, classAPI, } from "@/stores/apis";
import { generateQuery } from "@/stores/utilities";

const { 
  page,
  size,
  routes, 
  active,
  accessible, 
  loading,
  fetched,
  query,
  keyword,
  category,
  order,
 } = state;

export const actions = {
  async doAuthValidation () {
    try {
      const response = await validateAPI();
      return response
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  },

  async doLogin(payload) {
    try {
      loading.value = true;
      const response = await loginAPI(payload.email, payload.password);
      if (response.status === 200) {
        await this.getMenu()
        router.push('/Profil');
      } else {
        console.error("Login gagal:", response.data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false;
    }
  },

  async doLogout() {
    try {
      loading.value = true
      await logoutAPI();
      router.push("/login")
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false
    }
  },

  async getMenu() {
    try {
      loading.value = true
      const response = await routesAPI();
      const { defaultRoutes, roleRoutes } = response.data;
      routes.value = [...defaultRoutes, ...roleRoutes];
      accessible.value = true
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false
    }
  },
  
  async getClass() {
    try {
      loading.value = true
      const response = await classAPI(page.value, size.value, query.value);
      fetched.value = response.data;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false
    }
  },

  numberingIndex(index) {
    return (page.value - 1) * size.value + index + 1;
  },

  async doSearch(e) {
    const newQuery = await generateQuery(e)
    query.value = newQuery
  }
};
