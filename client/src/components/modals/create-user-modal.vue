<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-shade font-bold w-6/12">FORM PEMBUATAN AKUN</div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="doSubmitProfile(!id ? {name, religion, gender, birthDate, role, ClassRoomId} : {id, name, religion, gender, birthDate, role, ClassRoomId})" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="email" class="font-semibold">EMAIL</label>
                            <input id="email" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Masukkan email.." autocomplete="off" v-model="email" />
                        </div>
                    </div>
                    <div class="flex gap-8 justify-end items-center mt-10">
                        <SubmitButton />
                        <CancelButton @click.prevent="doCloseModal()"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

import CancelButton from '@/components/buttons/cancel-button.vue';
import SubmitButton from '@/components/buttons/submit-class.vue';

import { onMounted, ref } from 'vue';
import { useIndexStore } from '@/stores';
import { storeToRefs } from 'pinia';

const useStore = useIndexStore()
const { doCloseModal, doSubmitProfile, getClassSelection } = useStore
const { props, role } = storeToRefs(useStore)

const id = ref(props.value.id || "")

</script>