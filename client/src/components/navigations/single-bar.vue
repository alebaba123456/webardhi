<template>
  <div class="h-full flex flex-col justify-between shadow-2xl shadow-shade-gr bg-shade-gr py-4 px-[0.3rem] [user-select:none]">
    <div class="flex flex-col gap-3">
      <div class="flex flex-col justify-center items-center mb-4">
        <img class="w-[3rem] h-[3rem]" src="@/assets/logos/logo-sekolah.png" />
        <div class="font-bold text-[1rem] text-white">AL-HUSNA</div>
      </div>
      <div v-for="(route, index) in filteredRoutes" :key="index">
        <RouterLink :to="route.path">
          <SBarButton :pageName="route.name" />
        </RouterLink>
      </div>
    </div>
    <SBarButton pageName="Keluar" @click.prevent="doLogout()" />
  </div>
</template>

<script setup>
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const useStore = useIndexStore();
const { doLogout } = useStore;
const { routes } = storeToRefs(useStore)

const filteredRoutes = ref([])

async function filterRoutes() {
  filteredRoutes.value = routes.value.filter(route => !['/', '/login'].includes(route.path))
}

onBeforeMount(async () => {
  filterRoutes();
})

import SBarButton from "@/components/buttons/single-bar-button.vue";
</script>