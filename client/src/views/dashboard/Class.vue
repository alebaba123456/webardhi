<template>
    <div class="w-full h-full flex">
        <Single />
        <div class="w-full h-full px-[2rem] py-[1rem]">
            <div class="font-bold text-shade text-[1.5rem] mb-6">DAFTAR KELAS</div>
            <FilterBar class="w-full mb-4"/>
            <TablesClass class="w-full"/>
        </div>
    </div>
</template>

<script setup>
import Single from '@/components/navigations/single-bar.vue';
import TablesClass from '@/components/tables/tables-class.vue';
import FilterBar from '@/components/navigations/class-filter-bar.vue';
import { onMounted } from 'vue';
import { useIndexStore } from "@/stores";

const useStore = useIndexStore();
const { getClass } = useStore;
onMounted(async() => {
    await getClass();
})
</script>