<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="w-6/12 h-fit bg-white shadow-2xl shadow-shade-tc border-gr border">
            <div class="text-center bg-gr text-tosca font-bold">{{ id ? "FORM PERUBAHAN UJIAN" : "FORM PEMBUATAN UJIAN" }}</div>
            <form @submit.prevent="doSubmitExamination(id ? { id, type, examinationDate, SubjectId } : { type, examinationDate, SubjectId })" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="type" class="font-semibold whitespace-nowrap">JENIS UJIAN</label>
                            <select id="type" class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="type">
                            <option class="" value="" disabled selected>Pilih jenis ujian..</option>
                            <option value="UJIAN">UJIAN HARIAN</option>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="SubjectId" class="font-semibold whitespace-nowrap">NAMA PELAJARAN</label>
                            <select id="SubjectId" class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="SubjectId">
                            <option class="" value="" disabled selected>Pilih pelajaran..</option>
                            <option
                                v-for="item in subjectSelection"
                                :key="item.id"
                                :value="item.id"
                            >
                                {{ `${item.name} - ${item.code} - ${item.Profile.name}` }}
                            </option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="examinationDate" class="font-semibold whitespace-nowrap">TANGGAL UJIAN</label>
                            <input id="examinationDate" type="date" class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0" 
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
const { doCloseModal, getSubjectSelection, doSubmitExamination } = useStore
const { props } = storeToRefs(useStore)

const id = ref(props.value.id || "");
const type = ref(props.value.type || "");
const examinationDate = ref(props.value.examinationDate || "");
const SubjectId = ref(props.value.SubjectId || "");

const subjectSelection = ref([]);

onMounted(async() => {
    subjectSelection.value = await getSubjectSelection();
})

</script>

