// actions.js
import router from "@/routers";
import { state } from "@/stores/states";
import { 
  loginAPI, 
  logoutAPI, 
  routesAPI, 
  validateAPI, 
  classAPI,
  classPostAPI,
  classEditAPI,
  classDeleteAPI,
 } from "@/stores/apis";
import { 
  generateQuery, 
  changeQuery, 
} from "@/stores/utilities";

const { 
  page,
  size,
  max,
  visible,
  routes, 
  active,
  props,
  modal,
  modalName,
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
      const response = await classAPI(query.value);
      console.log(query.value);
      
      fetched.value = response.data;
      max.value = response.totalData;
      this.doUpdateVisible()
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
    await changeQuery(e)
    await this.doGeneratingQuery()
    await this.doRefreshData()
  },

  async doGeneratingQuery()  {
    const newQuery = generateQuery({
      page : page.value,
      size : size.value,
      keyword : keyword.value,
      category : category.value,
      order : order.value
    })
    query.value = newQuery
  },

  async doRefreshData() {
    switch (router.currentRoute.value.name) {
      case 'Kelas':
        await this.getClass()
        break;
      default:
        break;
    }
  },

  doUpdateVisible() {
    if (max.value <= 10) {
      visible.value = Array.from({ length: max.value }, (_, i) => i + 1);
    } else {
      let start = Math.max(1, page.value - 5);
      let end = Math.min(max.value, start + 9);
      if (end === max.value) {
        start = Math.max(1, end - 9);
      }
      visible.value = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    }
  },

  async doChangePage(number) {
    page.value = number;
    this.doGeneratingQuery()
    await this.doRefreshData();
  },

  async doOpenModal(name, payload) {
    await payload? props.value = payload : props.value = {};
    modal.value = true;
    modalName.value = name;
  },

  async doCloseModal() {
    modal.value = null;
    modalName.value = null;
  },

  async doSubmitClass(payload) {
    try {
      loading.value = true;
      props.value.id? await classEditAPI(payload) : await classPostAPI(payload);
      this.doRefreshData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      this.doCloseModal()
      loading.value = false;
    }
  },

  async doDeleteClass(payload) {
    try {
      loading.value = true;
      await classDeleteAPI(payload)
      this.doRefreshData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false;
    }
  }
};
