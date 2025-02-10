<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-tosca font-bold w-6/12">{{ id ? "FORM PERUBAHAN KELAS" : "FORM PENAMBAHAN KELAS" }}</div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="doSubmitSubjectClass(id ? { id, ProfileId, ClassRoomId, SubjectId } : { ProfileId, ClassRoomId, SubjectId })" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="SubjectClassId" class="font-semibold">NAMA PELAJARAN</label>
                            <select id="SubjectClassId" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="SubjectClassId">
                            <option class="" value="" disabled selected>Pilih kelas..</option>
                            <option
                                v-for="item in subjectClassSelection"
                                :key="item.id"
                                :value="item.id"
                            >
                                {{ `${item.Subject.name} - ${item.Classroom.grade}${item.Classroom.code}` }}
                            </option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="type" class="font-semibold">JENIS UJIAN</label>
                            <select id="type" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="type">
                            <option class="" value="" disabled selected>Pilih jenis ujian..</option>
                            <option value="HARIAN">UJIAN HARIAN</option>
                            <option value="LATIHAN">LATIHAN</option>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="examinationDate" class="font-semibold">TANGGAL UJIAN</label>
                            <input id="examinationDate" type="date" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            autocomplete="off" v-model="examinationDate" />
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
const { doCloseModal, getSubjectClassSelection, getClassSelection, doSubmitSubjectClass } = useStore
const { props } = storeToRefs(useStore)

const id = ref(props.value.id || "");
const examinationDate = ref(props.value.examinationDate || "");
const SubjectClassId = ref(props.value.SubjectId || "");

const subjectClassSelection = ref([]);
const classSelection = ref([])

onMounted(async() => {
    subjectClassSelection.value = await getSubjectClassSelection();
    classSelection.value = await getClassSelection();
})

</script>