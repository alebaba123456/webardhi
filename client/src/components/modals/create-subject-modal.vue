<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="w-6/12 bg-white shadow-2xl shadow-shade-tc border-gr border">
            <div class="text-center bg-gr text-tosca font-bold">{{ id ? "FORM PERUBAHAN MATA PELAJARAN" : "FORM PENAMBAHAN MATA PELAJARAN" }}</div>
            <form @submit.prevent="doSubmitSubject(id ? { id, name, code, grade, ProfileId } : { name, code, grade, ProfileId })" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="name" class="font-semibold whitespace-nowrap">NAMA MATA PELAJARAN</label>
                            <input id="name" class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Masukkan pelajaran.." autocomplete="off" v-model="name" />
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="grade" class="font-semibold">KELAS</label>
                            <select id="grade" class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="grade">
                            <option class="" value="" disabled selected>Pilih kelas..</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="ProfileId" class="font-semibold whitespace-nowrap">NAMA GURU</label>
                            <select id="ProfileId" class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="ProfileId">
                            <option class="" value="" disabled selected>Pilih guru..</option>
                            <option
                                v-for="teacher in teacherSelection"
                                :key="teacher.id"
                                :value="teacher.id"
                            >
                                {{ teacher.name }}
                            </option>
                            </select>
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

const useStore = useIndexStore();
const { doCloseModal, doSubmitSubject, getProfileSelection } = useStore;
const { props } = storeToRefs(useStore);

const id = ref(props.value.id || "");
const name = ref(props.value.name || "");
const grade = ref(props.value.grade || "");
const ProfileId = ref(props.value.ProfileId || "");

const teacherSelection = ref([]);

onMounted(async() => {
    teacherSelection.value = await getProfileSelection(`?page=1&size=999&category=role&keyword=GURU`);
})

</script>