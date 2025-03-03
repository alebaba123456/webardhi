<template>
  <div class="w-full h-full px-2 py-4 relative bg-pattern bg-repeat" ref="mainRef">
    <ErrorModal />
    <div class="bg-transparent" ref="contentRef">
      <div class="font-extrabold text-tosca bg-gradient-to-r from-gr via-shade-gr to-transparent rounded-xl flex px-2 text-[1.5rem] mb-6 w-full" ref="headerRef">
        MTS AL'HUSNA - LEMBAR UJIAN
      </div>
      <div class="overflow-y-auto custom-bar" :style="{ height: dynamicHeight + 'px' }">
          <div v-for="(question, index) in fetched" :key="question.id" class="px-2 py-4 mb-6 bg-gr border-tosca border-2 rounded-lg shadow-md shadow-shade-tc text-white">
            <p class="font-semibold mb-2">{{ index + 1 }}. {{ question.question }}</p>
            <div v-if="question.type === 'Pilihan ganda'">
              <label v-for="(option, idx) in question.option" :key="idx" class="flex items-center mb-2">
                <input
                  type="radio"
                  :name="`answer-${question.id}`"
                  :value="option"
                  v-model="question.answer"
                  @change="saveAnswer(question)"
                  class="mr-2"
                />
                {{ option }}
              </label>
            </div>
            <div v-else-if="question.type === 'Esai'">
              <textarea
                v-model="question.answer"
                @input="saveAnswer(question)"
                rows="3"
                placeholder="Ketik jawaban Anda di sini..."
                class="w-full p-2 border text-gr border-gray-300 rounded"
              ></textarea>
            </div>
          </div>
          <button @click="submitExamAnswer" class="bg-tosca text-white px-4 py-2 rounded mt-4">
            Kirim Jawaban
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorModal from "@/components/modals/error-modal.vue";
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useIndexStore } from "@/stores";
import { storeToRefs } from 'pinia';

const useStore = useIndexStore();
const { saveExamAnswer, submitExamAnswer } = useStore;
const { fetched } = storeToRefs(useStore);
const mainRef = ref(null);
const contentRef = ref(null);
const headerRef = ref(null);
const dynamicHeight = ref(0);

const calculateHeight = () => {
  if (mainRef.value && contentRef.value) {
    const mainHeight = mainRef.value.clientHeight;

    const headerHeight = headerRef.value ? headerRef.value.getBoundingClientRect().height : 0;
    const contentStyle = window.getComputedStyle(contentRef.value);
    const paddingTop = parseFloat(contentStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(contentStyle.paddingBottom) || 0;
    const marginBottom = parseFloat(contentStyle.marginBottom) || 0;

    const otherElementsHeight = headerHeight + paddingTop + paddingBottom + marginBottom + 50;

    dynamicHeight.value = mainHeight - otherElementsHeight;
  }
};

onMounted(() => {
  fetched.value.forEach((q) => {
    if (!q.answer) {
      q.answer = q.type === "Pilihan ganda" ? "" : "";
    }
  });
  calculateHeight();
  window.addEventListener('resize', calculateHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateHeight);
});

const saveAnswer = async (question) => {
  const index = fetched.value.findIndex((q) => q.id === question.id);
  if (index !== -1) {
    fetched.value[index].answer = question.answer;
    await saveExamAnswer();
  } else {
    console.error("Invalid question ID:", question.id);
  }
};

const submitAnswers = () => {
  console.log("Jawaban siswa:", fetched.value);
};
</script>

<style scoped>
.custom-bar {
  scrollbar-width: none;
}

.custom-bar::-webkit-scrollbar {
  width: 0;
}
</style>
