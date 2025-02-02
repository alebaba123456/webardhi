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
  profileAPI,
  profilePostAPI,
  profileEditAPI,
  profileDeleteAPI,
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
  role,
} = state;

export const actions = {
  async doAuthValidation() {
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
      routes.value = [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'Login'},
      ]
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

  numberingIndex(index) {
    return (page.value - 1) * size.value + index + 1;
  },

  async doSearch(e) {
    await changeQuery(e)
    await this.doGeneratingQuery()
    await this.doRefreshData()
  },

  async doGeneratingQuery() {
    const queries = {
      page: page.value,
      size: size.value,
      keyword : keyword.value,
      category : category.value,
      order : order.value,
    };
    ['Siswa', 'Guru'].includes(router.currentRoute.value.name) ? queries.role = role.value : null;
    const newQuery = generateQuery(queries)
    query.value = newQuery
  },

  async doRefreshData() {
    switch (router.currentRoute.value.name) {
      case 'Kelas':
        await this.getClass();
        break;
      case 'Siswa':
      case 'Guru':
        await this.getProfile();
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
    await payload ? props.value = payload : props.value = {};
    modal.value = true;
    modalName.value = name;
  },

  async doCloseModal() {
    modal.value = null;
    modalName.value = null;
  },

  async getClass() {
    try {
      loading.value = true
      await this.doGeneratingQuery()
      const response = await classAPI(query.value);
      fetched.value = response.data;
      max.value = response.totalData;
      this.doUpdateVisible()
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false
    }
  },

  async doSubmitClass(payload) {
    try {
      loading.value = true;
      props.value.id ? await classEditAPI(payload) : await classPostAPI(payload);
      this.resetStates();
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
  },

  async getProfile() {
    try {
      loading.value = true;
      await this.doGeneratingQuery();
      const response = await profileAPI(query.value);
      fetched.value = response.data;
      
      console.log(fetched.value);
      max.value = response.totalData;
      this.doUpdateVisible();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false;
    }
  },

  async getClassSelection() {
    try {
      loading.value = true;
      const response = await classAPI("");
      let filteredData = [];
      switch (router.currentRoute.value.name) {
        case 'Siswa':
          filteredData = response.data.filter(item => [7, 8, 9].includes(item.grade));
          break;
        case 'Guru':
          filteredData = response.data.filter(item => item.grade === 0);
          break;
        default:
          break;
      }
      return filteredData
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false;
    }
  },

  async doSubmitProfile(payload) {
    try {
      loading.value = true;
      props.value.id ? await profileEditAPI(payload) : await profilePostAPI(payload);
      this.resetStates();
      this.doRefreshData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      this.doCloseModal()
      loading.value = false;
    }
  },

  async doDeleteProfile(payload) {
    try {
      loading.value = true;
      await profileDeleteAPI(payload);
      this.doRefreshData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      loading.value = false;
    }
  },

  resetStates() {
    page.value = 1;
    fetched.value = null;
    keyword.value = null;
    category.value = null;
    order.value = null;
    props.value = null
  },
};
