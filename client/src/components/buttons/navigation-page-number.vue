<template>
    <div class="flex gap-2 text-white">
        <button v-for="pageNumber in visible" :key="pageNumber" @click="goToPage(pageNumber)"
            class="hover:font-semibold transition-colors duration-300 ease-in-out"
            :class="{ 'font-extrabold underline text-tosca': page === pageNumber }">
            {{ pageNumber }}
        </button>
    </div>
</template>

<script setup>
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";

const useStore = useIndexStore();
const { page, visible } = storeToRefs(useStore);
const { doChangePage } = useStore

function goToPage(pageNumber) {
    doChangePage(pageNumber)
}

</script>