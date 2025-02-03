<template>
    <button @click.prevent="handleOpenModal()"
        class="bg-gr hover:bg-tosca hover:font-bold hover:text-gr transition-all duration-300 ease-out w-full rounded-lg border-shade-gr border text-tosca px-6">
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
        case 'Pelajaran' :
            doOpenModal('createSubject');
            break;
        default:
            break;
    }
}
</script>