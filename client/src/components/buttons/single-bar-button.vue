<template>
  <div
    class="flex text-[0.8rem] font-semibold hover:bg-tosca text-white group flex-col justify-start p-1 items-start hover:text-gr hover:font-extrabold transition-all duration-300 ease-out cursor-pointer">
    <div class="flex justify-center items-center gap-2">
      <Component :is="currentIcon" />
      <div>{{ formattedPageName.toUpperCase() }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, shallowRef, computed } from 'vue';

const props = defineProps({
  pageName: {
    type: String,
    required: true,
  }
});

const iconMap = {
  Kelas: shallowRef(() => import('@/assets/single-bar-icons/ikon-kelas.vue')),
  Profil: shallowRef(() => import('@/assets/single-bar-icons/ikon-profil.vue')),
  Guru: shallowRef(() => import('@/assets/single-bar-icons/ikon-guru.vue')),
  Siswa: shallowRef(() => import('@/assets/single-bar-icons/ikon-siswa.vue')),
  Ujian: shallowRef(() => import('@/assets/single-bar-icons/ikon-ujian.vue')),
  Pelajaran: shallowRef(() => import('@/assets/single-bar-icons/ikon-pelajaran.vue')),
  Rapot: shallowRef(() => import('@/assets/single-bar-icons/ikon-nilai.vue')),
  Keluar: shallowRef(() => import('@/assets/single-bar-icons/ikon-keluar.vue'))
};

const currentIcon = shallowRef(null);

const formattedPageName = computed(() => {
  if (props.pageName.endsWith('_Ku')) {
    return props.pageName.replace('_Ku', '');
  }
  return props.pageName;
});

onMounted(async () => {
  if (iconMap[formattedPageName.value]) {
    const component = await iconMap[formattedPageName.value].value();
    currentIcon.value = component.default;
  } else {
    currentIcon.value = null;
  }
});
</script>
