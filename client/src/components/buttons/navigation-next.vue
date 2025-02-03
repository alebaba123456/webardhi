<template>
    <button @click="nextPage()"
        class="px-2 bg-white rounded-md text-[0.85rem] hover:bg-tosca transition-all duration-300 ease-in-out"
        :class="{ 'opacity-50 cursor-not-allowed': page === max }">
        <div class="flex gap-2 justify-center align-middle items-center">
            <div>Selanjutnya</div>
            <ArrowNext />
        </div>
    </button>
</template>

<script setup>
import ArrowNext from '@/assets/pagination-icons/pagination-arrow-next.vue'
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";

const useStore = useIndexStore();
const { max, page } = storeToRefs(useStore);
const { doChangePage } = useStore

function nextPage() {
    if (page.value < max.value) {
        doChangePage(page.value + 1);
    }
}

</script>