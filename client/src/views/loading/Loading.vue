<template>
    <div>Loading... Please wait.</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
try {
    // Muat rute dinamis
    await router.loadRoutes();
    router.push('/home'); // Redirect ke halaman utama
} catch (error) {
    console.error('Failed to load routes:', error);
    router.push('/login'); // Redirect ke login jika ada kesalahan
}
});
</script>
  