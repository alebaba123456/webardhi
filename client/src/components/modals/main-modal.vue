<template>
    <div v-if="modal" class="w-screen h-screen z-40 absolute bg-shade-gr">
        <CreateClassModal v-if="modal && modalName === 'createClass'" />
        <CreateProfileModal v-if="modal && modalName === 'createProfile'" />
        <CreateUserModal v-if="modal && modalName === 'createUser'" />
        <CreateSubjectModal v-if="modal && modalName === 'createSubject'" />
        <CreateExaminationModal v-if="modal && modalName === 'createExamination'"/>
        <createQuestionModal v-if="modal && modalName === 'createQuestion'"/>
        <ChangePasswordModal v-if="modal && modalName === 'changePassword'" />
    </div>
</template>

<script setup>
import CreateClassModal from "@/components/modals/create-class-modal.vue"
import CreateProfileModal from "@/components/modals/create-profile-modal.vue"
import CreateUserModal from "@/components/modals/create-user-modal.vue"
import CreateSubjectModal from "@/components/modals/create-subject-modal.vue"
import CreateExaminationModal from "@/components/modals/create-examination-modal.vue"
import createQuestionModal from "@/components/modals/create-question-modal.vue"
import ChangePasswordModal from "@/components/modals/change-password-modal.vue"

import { useIndexStore} from "@/stores"
import { storeToRefs } from "pinia"

const useStore = useIndexStore()
const { modal, modalName } = storeToRefs(useStore)
</script>