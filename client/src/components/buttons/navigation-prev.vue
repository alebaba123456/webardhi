<template>
    <button @click="previousPage()"
        class="px-2 bg-white rounded-md text-[0.85rem] hover:bg-tosca transition-all duration-300 ease-in-out"
        :class="{ 'opacity-50 cursor-not-allowed': page === 1 }">
        <div class="flex gap-2 justify-center align-middle items-center">
            <ArrowPrevious />
            <div>Sebelumnya</div>
        </div>
    </button>
</template>

<script setup>
import ArrowPrevious from '@/assets/pagination-icons/pagination-arrow-previous.vue'
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";

const useStore = useIndexStore();
const { page } = storeToRefs(useStore);
const { doChangePage } = useStore

function previousPage() {
    if (page.value > 1) {
        doChangePage(page.value - 1);
    }
}

</script>