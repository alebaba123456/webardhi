<template>
  <div class="bg-shade-gr shadow-md shadow-shade-tc w-full text-left text-[0.75rem]">
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
              <div>Jenis ujian</div>
            </div>
          </th>
          <th class="px-4 py-2">
            <div class="flex gap-[0.4rem] justify-center">
              <div>Kode Ujian</div>
            </div>
          </th>
          <th class="px-4 py-2">
            <div class="flex gap-[0.4rem] justify-center">
              <div>Guru Koordinator</div>
            </div>
          </th>
          <th class="px-4 py-2">
            <div class="flex gap-[0.4rem] justify-center">
              <div>Jadwal ujian</div>
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
        <tr @click.prevent="handleOpenQuestion(data.id)" v-for="(data, index) in fetched" :key="index"
          class="hover:bg-tosca group hover:text-gr bg-shade-gr text-white border border-gr w-full cursor-pointer transition-colors duration-300 ease-out text-[0.75rem]">
          <td class="px-4 py-2 text-center truncate align-middle border-r border-gr bg-shade-gr text-white">{{
            numberingIndex(index) }}</td>
          <td class="px-4 py-2 truncate text-center align-middle">{{ data?.type || "" }}</td>
          <td class="px-4 py-2 truncate text-center align-middle">{{ data?.code || "" }}</td>
          <td class="px-4 py-2 truncate text-center align-middle">{{ data?.Subject?.Profile.name || "" }}</td>
          <td class="px-4 py-2 truncate text-center align-middle">{{ new
            Date(data?.examinationDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
            }}</td>
          <td class="px-4 py-2 truncate align-middle">
            <div v-if="data.grade !== 0" class="flex gap-8 justify-center items-center">
              <button
                @click.prevent="doOpenModal('createExamination', { id: data.id, type: data.type, code: data.code, examinationDate: data.examinationDate, SubjectId: data.Subject.id })"
                class="flex gap-1 items-center justify-center hover:bg-shade-wh p-1 rounded-md ease-out transition-all duration-200">
                <IkonPerbarui />
                <div>Perbarui</div>
              </button>
              <button @click.prevent="doDeleteExamination(data.id)"
                class="flex gap-1 items-center justify-center hover:bg-shade-wh p-1 rounded-md ease-out transition-all duration-200">
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
import { useRouter } from 'vue-router'
import { useIndexStore } from "@/stores";
import { storeToRefs } from "pinia";
import IkonDelete from "@/assets/table-item-icons/ikon-delete.vue";
import IkonPerbarui from "@/assets/table-item-icons/ikon-perbarui.vue";

const router = useRouter();
const useStore = useIndexStore();
const { numberingIndex, doOpenModal, doDeleteExamination } = useStore
const { fetched, category, keyword } = storeToRefs(useStore);

async function handleOpenQuestion(id) {
  await router.push({ path: '/bank-soal', query: { id } });
}
</script>