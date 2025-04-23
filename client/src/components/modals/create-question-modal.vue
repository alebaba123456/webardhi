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
                            <select id="type" class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0" v-model="type">
                                <option value="" disabled selected>Pilih jenis pertanyaan..</option>
                                <option value="Pilihan ganda">Pilihan Ganda</option>
                                <option value="Esai">Essay</option>
                            </select>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label for="question" class="font-semibold">PERTANYAAN</label>
                            <textarea id="question"
                                class="bg-transparent w-full border-b-gr border-b-2 outline-none focus:ring-0"
                                autocomplete="off" v-model="question"></textarea>
                        </div>
                        <div class="flex gap-6 items-center">
                            <label class="font-semibold">GAMBAR</label>
                            <div class="flex flex-col gap-2 w-full">
                                <input type="file" @change="onImageSelected" accept="image/*"
                                    class="bg-transparent outline-none focus:ring-0" />
                                <img v-if="previewImage" :src="previewImage" alt="Preview Gambar"
                                    class="max-w-xs max-h-52 rounded shadow mt-2" />
                            </div>
                        </div>
                        <div v-if="type === 'Pilihan ganda'" class="flex gap-6 items-center">
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

                        <div v-if="type === 'Pilihan ganda'" class="flex gap-6 items-center">
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
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useIndexStore } from '@/stores';
import { storeToRefs } from 'pinia';

const route = useRoute();
const useStore = useIndexStore();
const { doCloseModal, doSubmitQuestion } = useStore;
const { props } = storeToRefs(useStore);

const id = ref(props.value.id || "");
const question = ref(props.value.question || "");
const answer = ref(props.value.answer || "");
const type = ref(props.value.type || "");
const ExaminationId = ref(props.value.ExaminationId || route.params.id);
const options = ref(props.value.options || []);

const imageFile = ref(null);
const previewImage = ref(null);

if (props.value.option) {
    options.value = Array.isArray(props.value.option)
        ? props.value.option
        : JSON.parse(props.value.option);
} else {
    options.value = [""];
}

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

function onImageSelected(event) {
    const file = event.target.files[0];
    if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = () => {
            previewImage.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

watch(type, (newType, oldType) => {
    if (newType !== 'Pilihan ganda') {
        answer.value = "";
        options.value = [""];
    }
    previewImage.value = null;
    imageFile.value = null;
});

function handleSubmit() {
    const formData = new FormData();

    if (id.value) formData.append('id', id.value);
    formData.append('question', question.value);
    formData.append('answer', answer.value);
    formData.append('type', type.value);
    formData.append('ExaminationId', ExaminationId.value);

    if (type.value === 'Pilihan ganda') {
        formData.append('option', JSON.stringify(options.value));
    }

    if (imageFile.value) {
        formData.append('image', imageFile.value);
    }

    doSubmitQuestion(formData);
}
</script>
