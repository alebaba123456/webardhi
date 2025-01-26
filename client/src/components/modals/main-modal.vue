<template>
    <div v-if="modal" class="w-screen h-screen z-50 absolute bg-shade-gr">
        <CreateClassModal v-if="modal && modalName === 'createClass'" />
    </div>
</template>

<script setup>
import CreateClassModal from "@/components/modals/create-class-modal.vue"
import { ref } from "vue"
import { useIndexStore} from "@/stores"
import { storeToRefs } from "pinia"

const useStore = useIndexStore()
const { modal, modalName } = storeToRefs(useStore)
</script>