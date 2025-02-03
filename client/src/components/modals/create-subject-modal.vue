<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-tosca font-bold w-6/12">{{ id ? "FORM PERUBAHAN MATA PELAJARAN" : "FORM PENAMBAHAN MATA PELAJARAN" }}</div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="doSubmitSubject(id ? { id, name } : { name })" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="name" class="font-semibold">NAMA MATA PELAJARAN</label>
                            <input id="name" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Masukkan pelajaran.." autocomplete="off" v-model="name" />
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

import { ref } from 'vue';
import { useIndexStore } from '@/stores';
import { storeToRefs } from 'pinia';

const useStore = useIndexStore()
const { doCloseModal, doSubmitSubject } = useStore
const { props } = storeToRefs(useStore)

const id = ref(props.value.id || "")
const name = ref(props.value.name || "")

</script>