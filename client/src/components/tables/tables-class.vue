<template>
    <div class="bg-shade-gr shadow-md shadow-shade-gr w-full text-left text-[0.75rem]">
      <table class="w-full table-fixed">
        <thead class="bg-shade-gr text-white border border-gr">
          <tr>
            <th class="px-4 py-2 w-[5%]">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>No</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Kelas</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Kode Kelas</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Anggota</div>
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
          <tr v-for="(data, index) in fetched" :key="index"  class="hover:bg-shade bg-shade-gr text-white border border-gr w-full hover:text-white cursor-pointer transition-colors duration-300 ease-out text-[0.75rem]">
            <td class="px-4 py-2 text-center truncate align-middle border-r border-gr bg-shade-gr text-white">{{ numberingIndex(index) }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data.grade }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data.code }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data.profileCount }}</td>
            <td class="px-4 py-2 truncate align-middle">
              <div v-if="data.grade !== 0" class="flex gap-8 justify-center items-center">
                <button @click.prevent="doOpenModal('createClass', {id: data.id ,code : data.code, grade : data.grade})" class="group flex gap-1 items-center justify-center hover:bg-gr p-1 rounded-md">
                  <IkonPerbarui />
                  <div>Perbarui</div>
                </button>
                <button @click.prevent="doDeleteClass(data.id)" class="group flex gap-1 items-center justify-center hover:bg-gr p-1 rounded-md">
                  <IkonDelete />
                  <div>Hapus</div>
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

  const useStore = useIndexStore();
  const { numberingIndex, doOpenModal, doDeleteClass } = useStore
  const { fetched } = storeToRefs(useStore);
  </script>  