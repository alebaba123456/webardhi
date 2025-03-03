<template>
    <div v-if="errStatus" class="fixed inset-0 z-50 bg-shade-gr flex justify-center items-center">
        <div class="min-w-[30%] max-w-fit min-h-[20%] border-2 border-gr max-h-fit bg-tosca text-gr flex flex-col rounded-xl shadow-lg shadow-shade-tc justify-center items-center p-4">
            <div class="font-extrabold text-[2rem] mb-2">{{ errCode }}</div>
            <div class="font-bold">{{ errMessage }}</div>
        </div>
    </div>
</template>

<script setup>

import { useIndexStore} from "@/stores"
import { storeToRefs } from "pinia"

const useStore = useIndexStore()
const { errStatus, errCode, errMessage } = storeToRefs(useStore)
</script>