<template>
    <div class="w-full h-full flex relative bg-pattern bg-fixed bg-repeat" ref="mainRef">
        <Modal />
        <ErrorModal />
        <Single class="sticky" />
        <div class="w-full h-full px-8 py-4 bg-transparent">
        <div class="font-extrabold text-tosca bg-gradient-to-r from-gr via-shade-gr to-transparent rounded-xl flex px-2 text-[1.5rem] mb-6 w-full">JADWAL UJIAN</div>
            <FilterBar class="w-full mb-4" ref="filter"/>
            <TableExamination class="w-full my-2"/>
            <Pagination class="w-full fixed bottom-4" ref="pagination" />
        </div>
    </div>
</template>

<script setup>
import ErrorModal from "@/components/modals/error-modal.vue";
import Modal from '@/components/modals/main-modal.vue'
import Single from '@/components/navigations/single-bar.vue';
import TableExamination from '@/components/tables/table-examination.vue';
import FilterBar from '@/components/navigations/filter-bar.vue';
import Pagination from '@/components/navigations/pagination.vue';
import { nextTick, onMounted, ref } from 'vue';
import { useIndexStore } from "@/stores";
import { storeToRefs } from 'pinia';

const useStore = useIndexStore();
const { getExamination, resetStates } = useStore;
const { size } = storeToRefs(useStore)

const filter = ref(null);
const pagination = ref(null);
const mainRef = ref(null);

onMounted(async () => {
    resetStates();
    await updateSize();
    await getExamination();
    await nextTick();
    const trueWidth = filter.value?.$el.offsetWidth || 0;
    if (pagination.value) {
        pagination.value.$el.style.width = `${trueWidth}px`;
    }
})

async function updateSize() {
    const anyHeight = 221.4;
    const maxHeight = mainRef.value.offsetHeight;
    const newSize = Math.floor((maxHeight-anyHeight)/43);
    size.value = newSize;
}
</script>