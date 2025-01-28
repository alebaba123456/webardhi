<template>
    <button @click.prevent="handleOpenModal()"
        class="bg-white hover:bg-shade hover:font-bold hover:text-white transition-all duration-300 ease-out w-full rounded-lg border-shade-gr border text-shade-gr px-6">
        <div>Buat baru</div>
    </button>
</template>

<script setup>
import router from "@/routers";
import { useIndexStore } from "@/stores";
const useStore = useIndexStore();
const { doOpenModal } = useStore

async function handleOpenModal() {
    switch (router.currentRoute.value.name) {
        case 'Kelas':
            doOpenModal('createClass');
            break;
        case 'Siswa':
        case 'Guru':
            doOpenModal('createProfile');
            break;
        default:
            break;
    }
}
</script>