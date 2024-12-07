<template>
  <div
    class="h-full flex flex-col justify-between bg-normal py-4 px-[0.3rem] [user-select:none]"
  >
    <div class="flex flex-col gap-3">
      <div v-for="(route, index) in routes" :key="index">
        <RouterLink :to="route.path">
          <SBarButton :pageName="route.name" />
        </RouterLink>
      </div>
    </div>
    <SBarButton pageName="Logout" />
  </div>
</template>

<script setup>
const routes = [
  { path: "/", name: "Home" },
  { path: "/class", name: "Class" },
  { path: "/task", name: "Task" },
  { path: "/profile", name: "Profile" },
];

import SBarButton from "@/components/buttons/single-bar-button.vue";
</script>