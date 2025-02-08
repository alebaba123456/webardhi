<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-tosca font-bold w-6/12">{{ id ? "FORM PERUBAHAN KELAS" : "FORM PENAMBAHAN KELAS" }}</div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="doSubmitSubjectClass(id ? { id, ProfileId, ClassRoomId, SubjectId } : { ProfileId, ClassRoomId, SubjectId })" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="SubjectId" class="font-semibold">NAMA PELAJARAN</label>
                            <select id="SubjectId" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="SubjectId">
                            <option class="" value="" disabled selected>Pilih pelajaran..</option>
                            <option
                                v-for="subject in subjectSelection"
                                :key="subject.id"
                                :value="subject.id"
                            >
                                {{ subject.name }}
                            </option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="ClassRoomId" class="font-semibold">KELAS</label>
                            <select id="ClassRoomId" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="ClassRoomId">
                            <option class="" value="" disabled selected>Pilih kelas..</option>
                            <option
                                v-for="classroom in classSelection"
                                :key="classroom.id"
                                :value="classroom.id"
                            >
                                {{ classroom.grade }} - {{ classroom.code }}
                            </option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="ProfileId" class="font-semibold">NAMA GURU</label>
                            <select id="ProfileId" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
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

const useStore = useIndexStore()
const { doCloseModal, getClassSelection, getSubjectSelection, getProfileSelection, doSubmitSubjectClass } = useStore
const { props } = storeToRefs(useStore)

const id = ref(props.value.id || "")
const ClassRoomId = ref(props.value.ClassRoomId || "");
const ProfileId = ref(props.value.ProfileId || "");
const SubjectId = ref(props.value.SubjectId || "");

const classSelection = ref([]);
const subjectSelection = ref([]);
const teacherSelection = ref([]);

onMounted(async() => {
    classSelection.value = await getClassSelection();
    subjectSelection.value = await getSubjectSelection();
    teacherSelection.value = await getProfileSelection();
})

</script>