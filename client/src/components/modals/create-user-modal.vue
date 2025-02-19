<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-tosca font-bold w-6/12">{{ isRegistered? "AKUN TERDAFTAR" : "FORM PEMBUATAN AKUN" }}</div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="doSubmitUser({ProfileId: id, email: email})" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="email" class="font-semibold">EMAIL</label>
                            <input v-if="!isRegistered" id="email" class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Masukkan email.." autocomplete="off" v-model="email" />
                            <div v-if="isRegistered" class="font-bold underline underline-offset-2">{{ email }}</div>
                        </div>
                    </div>
                    <div class="flex gap-8 justify-end items-center mt-10">
                        <SubmitButton v-if="!isRegistered" />
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

import { ref } from 'vue';
import { useIndexStore } from '@/stores';
import { storeToRefs } from 'pinia';

const useStore = useIndexStore()
const { doCloseModal, doSubmitUser } = useStore
const { props } = storeToRefs(useStore)

const id = ref(props.value.id || "")
const email = ref(props.value.email || "")

const isRegistered = ref(props.value.email || false)

</script>