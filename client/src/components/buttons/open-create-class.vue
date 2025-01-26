<template>
    <button @click.prevent="doOpenModal('createClass')"
        class="bg-white hover:bg-shade hover:font-bold hover:text-white transition-all duration-300 ease-out w-full rounded-lg border-shade-gr border text-shade-gr px-6">
        <div>Buat baru</div>
    </button>
</template>

<script setup>
import { useIndexStore } from "@/stores";

const useStore = useIndexStore();
const { doOpenModal } = useStore
</script>