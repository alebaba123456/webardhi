<template>
    <div class="flex text-[0.8rem] font-semibold text-black rounded-[0.5rem] group flex-col justify-center p-1 items-center hover:text-ter hover:bg-shade transition-all duration-300 ease-out cursor-pointer">
        <div>
            <Component :is="currentIcon" />
        </div>
        <div>{{ pageName }}</div>
    </div>
</template>

<script setup>
import { onMounted, shallowRef } from 'vue';

const props = defineProps({
    pageName: {
        type: String,
        required: true,
    }
})

const iconMap = {
    Home: shallowRef(() => import('@/assets/single-bar-icons/home-icon.vue')),
    Class: shallowRef(() => import('@/assets/single-bar-icons/class-icon.vue')),
    Task: shallowRef(() => import('@/assets/single-bar-icons/task-icon.vue')),
    Profile: shallowRef(() => import('@/assets/single-bar-icons/profile-icon.vue')),
    Logout: shallowRef(() => import('@/assets/single-bar-icons/logout-icon.vue'))
  };

  const currentIcon = shallowRef(null);

  onMounted(async () => {
    if (iconMap[props.pageName]) {
      const component = await iconMap[props.pageName].value();
      currentIcon.value = component.default;
    } else {
      currentIcon.value = null;
    }
  });
</script>