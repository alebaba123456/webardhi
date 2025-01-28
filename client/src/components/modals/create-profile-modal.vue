<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-shade font-bold w-6/12">{{ id ? `FORM PERUBAHAN ${role.toUpperCase()}` : `FORM PENAMBAHAN ${role.toUpperCase()}` }}</div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="doSubmitProfile(!id ? {name, religion, gender, birthDate, role, ClassRoomId} : {id, name, religion, gender, birthDate, role, ClassRoomId})" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="name" class="font-semibold">NAMA</label>
                            <input id="name" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Masukkan nama.." autocomplete="off" v-model="name" />
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="birthDate" class="font-semibold">TANGGAL LAHIR</label>
                            <input id="birthDate" type="date" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            autocomplete="off" v-model="birthDate" />
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="religion" class="font-semibold">AGAMA</label>
                            <select id="religion" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih agama.." autocomplete="off" v-model="religion">
                            <option class="" value="" disabled selected>Pilih agama..</option>
                            <option value="ISLAM">Islam</option>
                            <option value="KRISTEN">Kristen</option>
                            <option value="KATOLIK">Katolik</option>
                            <option value="HINDU">Hindu</option>
                            <option value="BUDHA">Budha</option>
                            <option value="KONGHUCU">Konghucu</option>
                            <option value="LAINNYA">Lainnya</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="gender" class="font-semibold">JENIS KELAMIN</label>
                            <select id="gender" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih jenis kelamin.." autocomplete="off" v-model="gender">
                            <option class="" value="" disabled selected>Pilih jenis kelamin..</option>
                            <option value="L">Laki - laki</option>
                            <option value="P">Perempuan</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center" v-if="role === 'Siswa'">
                            <label for="ClassRoomId" class="font-semibold">KELAS</label>
                            <select id="ClassRoomId" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" 
                            placeholder="Pilih kelas.." autocomplete="off" v-model="ClassRoomId">
                            <option class="" value="" disabled selected>Pilih kelas..</option>
                            <option
                                v-for="classroom in classrooms"
                                :key="classroom.id"
                                :value="classroom.id"
                            >
                                {{ classroom.grade }} - {{ classroom.code }}
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
const { doCloseModal, doSubmitProfile, getClassSelection } = useStore
const { props, role } = storeToRefs(useStore)

const id = ref(props.value.id || "")
const name = ref(props.value.name || "");
const religion = ref(props.value.religion || "");
const gender = ref(props.value.gender || "");
const birthDate = ref(props.value.birthDate || "");
const ClassRoomId = ref(props.value.ClassRoomId || "");
const classrooms = ref([]);

onMounted(async () => {
  const response = await getClassSelection();
  classrooms.value = response;
  switch (role.value) {
    case 'Siswa':
      classrooms.value = response.filter((classroom) => classroom.grade !== 0);
      break;
    case 'Guru':
      classrooms.value = response.filter((classroom) => classroom.code === 'GURU');
      ClassRoomId.value = classrooms.value[0].id;
      break;
    default:
      break;
  }
});

</script>