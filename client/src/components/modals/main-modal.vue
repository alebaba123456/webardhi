<template>
    <div v-if="modal" class="w-screen h-screen z-50 absolute bg-shade-gr">
        <CreateClassModal v-if="modal && modalName === 'createClass'" />
        <CreateProfileModal v-if="modal && modalName === 'createProfile'" />
        <CreateUserModal v-if="modal && modalName === 'createUser'" />
    </div>
</template>

<script setup>
import CreateClassModal from "@/components/modals/create-class-modal.vue"
import CreateProfileModal from "@/components/modals/create-profile-modal.vue"
import CreateUserModal from "@/components/modals/create-user-modal.vue"
import { ref } from "vue"
import { useIndexStore} from "@/stores"
import { storeToRefs } from "pinia"

const useStore = useIndexStore()
const { modal, modalName } = storeToRefs(useStore)
</script>