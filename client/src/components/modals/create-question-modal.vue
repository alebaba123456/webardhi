<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="text-center bg-gr text-tosca font-bold w-6/12">
            {{ id ? "FORM PERUBAHAN PERTANYAAN" : "FORM PENAMBAHAN PERTANYAAN" }}
        </div>
        <div class="w-6/12 h-fit bg-shade-wh">
            <form @submit.prevent="handleSubmit" class="px-4 py-2 w-full h-full">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-8">
                        <div class="flex gap-6 items-center">
                            <label for="type" class="font-semibold">JENIS PERTANYAAN</label>
                            <select id="type" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0"
                                v-model="type">
                                <option value="" disabled selected>Pilih jenis pertanyaan..</option>
                                <option value="multiple_choice">Pilihan Ganda</option>
                                <option value="essay">Essay</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="question" class="font-semibold">PERTANYAAN</label>
                            <textarea id="question"
                                class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0"
                                autocomplete="off" v-model="question"></textarea>
                        </div>
                        <div v-if="type === 'multiple_choice'" class="flex gap-6 items-center">
                            <label class="font-semibold">OPTIONS</label>
                            <div class="flex flex-col gap-2 w-full">
                                <div v-for="(opt, idx) in options" :key="idx" class="flex items-center gap-2">
                                    <input type="text" v-model="options[idx]"
                                        class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0 flex-1"
                                        placeholder="Masukkan option..." />
                                    <button v-if="options.length > 1" type="button"
                                        class="text-red-500 hover:text-red-700" @click="removeOption(idx)">
                                        Hapus
                                    </button>
                                </div>
                                <button type="button" class="text-blue-500 hover:text-blue-700 self-start"
                                    @click="addOption">
                                    Tambah Option
                                </button>
                            </div>
                        </div>
                        <div v-if="type === 'multiple_choice'" class="flex gap-6 items-center">
                            <label for="answer" class="font-semibold">JAWABAN</label>
                            <select id="answer" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0"
                                v-model="answer">
                                <option value="" disabled selected>Pilih jawaban yang benar</option>
                                <option v-for="(opt, idx) in options" :key="idx" :value="opt">
                                    {{ opt }}
                                </option>
                            </select>
                        </div>
                        <div v-else class="flex gap-6 items-center">
                            <label for="answer" class="font-semibold">JAWABAN</label>
                            <textarea id="answer"
                                class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0"
                                autocomplete="off" v-model="answer"></textarea>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="ExaminationId" class="font-semibold">UJIAN</label>
                            <select id="ExaminationId"
                                class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0"
                                v-model="ExaminationId">
                                <option value="" disabled selected>Pilih ujian..</option>
                                <option v-for="item in examinationSelection" :key="item.id" :value="item.id">
                                    {{ item.name ? item.name : item.code }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex gap-8 justify-end items-center mt-10">
                        <SubmitButton />
                        <CancelButton @click.prevent="doCloseModal()" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import CancelButton from '@/components/buttons/cancel-button.vue';
import SubmitButton from '@/components/buttons/submit-class.vue';
import { onMounted, ref, watch } from 'vue';
import { useIndexStore } from '@/stores';
import { storeToRefs } from 'pinia';

const useStore = useIndexStore();
const { doCloseModal, getExaminationSelection, doSubmitQuestion } = useStore;
const { props } = storeToRefs(useStore);

const id = ref(props.value.id || "");
const question = ref(props.value.question || "");
const answer = ref(props.value.answer || "");
const type = ref(props.value.type || "");
const ExaminationId = ref(props.value.ExaminationId || "");

const options = ref([]);

if (props.value.option) {
    options.value = Array.isArray(props.value.option)
        ? props.value.option
        : JSON.parse(props.value.option);
} else {
    options.value = [""];
}

const examinationSelection = ref([]);

onMounted(async () => {
    examinationSelection.value = await getExaminationSelection();
});

function addOption() {
    options.value.push("");
}

function removeOption(idx) {
    if (options.value.length > 1) {
        options.value.splice(idx, 1);
        if (!options.value.includes(answer.value)) {
            answer.value = "";
        }
    }
}

watch(type, (newType, oldType) => {
    if (newType !== 'multiple_choice') {
        answer.value = "";
        options.value = [""];
    }
});

function handleSubmit() {
    const payload = id.value
        ? { id: id.value, question: question.value, answer: answer.value, type: type.value, option: type.value === 'multiple_choice' ? options.value : null, ExaminationId: ExaminationId.value }
        : { question: question.value, answer: answer.value, type: type.value, option: type.value === 'multiple_choice' ? options.value : null, ExaminationId: ExaminationId.value };
    doSubmitQuestion(payload);
}
</script>