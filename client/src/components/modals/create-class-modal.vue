<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-tosca font-bold w-6/12">{{ id ? "FORM PERUBAHAN KELAS" : "FORM PENAMBAHAN KELAS" }}</div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="doSubmitClass(!id ? { grade, code } : {id, grade : grade.toString(), code })" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="grade" class="font-semibold">KELAS</label>
                            <select id="grade" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="grade">
                            <option class="" value="" disabled selected>Pilih kelas..</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="code" class="font-semibold">KODE KELAS</label>
                            <input id="code" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Masukan kode kelas.." autocomplete="off" v-model="code" />
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
const { doCloseModal, doSubmitClass } = useStore
const { props } = storeToRefs(useStore)

const id = ref(props.value.id || "")
const grade = ref(props.value.grade || "");
const code = ref(props.value.code || "");
</script>