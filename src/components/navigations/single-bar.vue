<template>
  <div>
    <!-- Hamburger Button -->
    <button
      @click="toggleMenu"
      class="hamburger-button p-2 bg-sec text-white rounded-md"
    >
      ☰
    </button>

    <!-- Backdrop untuk klik di luar menu -->
    <div
      v-if="isMenuOpen"
      @click="closeMenu"
      class="backdrop fixed inset-0 bg-black/50 z-40"
    ></div>

    <!-- Hamburger Menu -->
    <div
      v-if="isMenuOpen"
      class="menu h-full flex flex-col justify-between bg-sec py-4 px-[0.3rem] [user-select:none]"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import SBarButton from "@/components/buttons/single-bar-button.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const routes = [
  { path: "/home", name: "Home" },
  { path: "/class", name: "Class" },
  { path: "/task", name: "Task" },
  { path: "/profile", name: "Profile" },
];
</script>

<style>
.hamburger-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 50;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: #606c38;
  z-index: 50;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
