<template>
    <div class="bg-gr shadow-md shadow-shade-tc w-full text-left text-[0.75rem]">
      <table class="w-full table-fixed">
        <thead class="bg-shade-gr text-tosca border border-gr">
          <tr>
            <th class="px-4 py-2 w-[5%]">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>No</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Nama</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Tgl. lahir</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Agama</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Jenis kelamin</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Kelas</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Pilihan</div>
                </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in fetched" :key="index"  class="hover:bg-tosca group hover:text-gr bg-shade-gr text-white border border-gr w-full cursor-pointer transition-colors duration-300 ease-out text-[0.75rem]">
            <td class="px-4 py-2 text-center truncate align-middle border-r border-gr bg-shade-gr text-white">{{ numberingIndex(index) }}</td>
            <td class="px-4 py-2 truncate align-middle">{{ data.name }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ new Date(data.birthDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data.religion }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data.gender === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data.Classroom?.grade || "0"  }} - {{ data.Classroom?.code || "" }}</td>
            <td class="px-4 py-2 truncate align-middle">
              <div v-if="data.grade !== 0" class="flex gap-8 justify-center items-center">
                <button @click.prevent="doOpenModal('createUser', {id : data.id, email: data.User?.email||''})" class="flex gap-1 items-center justify-center hover:bg-shade-wh p-1 rounded-md ease-in-out transition-all duration-300">
                  <IkonEditAkun v-if="data.User"/>
                  <IkonBuatAkun v-if="!data.User"/>
                </button>
                <button @click.prevent="doOpenModal('createProfile', {id: data.id ,name : data.name, birthDate: data.birthDate, religion: data.religion, gender: data.gender, ClassRoomId: data.Classroom.id })" class="flex gap-1 items-center justify-center hover:bg-shade-wh p-1 rounded-md ease-in-out transition-all duration-300">
                  <IkonPerbarui />
                </button>
                <button @click.prevent="doDeleteProfile(data.id)" class="flex gap-1 items-center justify-center hover:bg-shade-wh p-1 rounded-md ease-in-out transition-all duration-300">
                  <IkonDelete />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { useIndexStore } from "@/stores";
  import { storeToRefs } from "pinia";
  import IkonDelete from "@/assets/table-item-icons/ikon-delete.vue";
  import IkonPerbarui from "@/assets/table-item-icons/ikon-perbarui.vue";
  import IkonBuatAkun from "@/assets/table-item-icons/ikon-buat-akun.vue";
  import IkonEditAkun from "@/assets/table-item-icons/ikon-edit-akun.vue";

  const useStore = useIndexStore();
  const { numberingIndex, doOpenModal, doDeleteProfile } = useStore
  const { fetched } = storeToRefs(useStore);
  </script>  