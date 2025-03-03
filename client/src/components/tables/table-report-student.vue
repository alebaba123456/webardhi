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
                  <div>Pelajaran</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Kode Ujian</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Waktu Ujian</div>
                </div>
            </th>
            <th class="px-4 py-2">
                <div class="flex gap-[0.4rem] justify-center">
                  <div>Nilai</div>
                </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in fetched" :key="index"  class="hover:bg-tosca group hover:text-gr bg-shade-gr text-white border border-gr w-full cursor-pointer transition-colors duration-300 ease-out text-[0.75rem]">
            <td class="px-4 py-2 text-center truncate align-middle border-r border-gr bg-shade-gr text-white">{{ numberingIndex(index) }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data?.Examination?.Subject?.name }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data?.Examination?.code }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ new Date(data?.Examination?.examinationDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })  }}</td>
            <td class="px-4 py-2 truncate text-center align-middle">{{ data.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { useIndexStore } from "@/stores";
  import { storeToRefs } from "pinia";

  const useStore = useIndexStore();
  const { numberingIndex } = useStore
  const { fetched } = storeToRefs(useStore);
  </script>  