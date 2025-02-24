<template>
    <div class="w-full h-full flex relative bg-pattern bg-fixed bg-repeat" ref="mainRef">
        <Modal />
        <Single class="sticky" />
        <div class="w-full h-full px-8 py-4 bg-transparent">
            <div
                class="font-extrabold text-tosca bg-gradient-to-r from-gr via-shade-gr to-transparent rounded-xl flex px-2 text-[1.5rem] mb-6 w-full">
                PROFIL SAYA</div>
            <div class="w-full flex flex-col gap-4 bg-gr px-8 py-6 rounded-lg shadow-md shadow-shade-tc">
                <div class="flex gap-6 text-tosca">
                    <div>NAMA</div>
                    <div>:</div>
                    <div class="underline underline-offset-4 font-semibold">{{ fetched?.name || "" }}</div>
                </div>
                <div class="flex gap-6 text-tosca">
                    <div>TANGGAL LAHIR</div>
                    <div>:</div>
                    <div class="underline underline-offset-4 font-semibold">{{ new Date(fetched?.birthDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) }}</div>
                </div>
                <div class="flex gap-6 text-tosca">
                    <div>AGAMA</div>
                    <div>:</div>
                    <div class="underline underline-offset-4 font-semibold">{{ fetched?.religion || "" }}</div>
                </div>
                <div class="flex gap-6 text-tosca">
                    <div>JENIS KELAMIN</div>
                    <div>:</div>
                    <div class="underline underline-offset-4 font-semibold">{{ fetched?.gender === 'L' ? "LAKI - LAKI" : "PEREMPUAN" }}</div>
                </div>
                <div class="flex gap-6 text-tosca">
                    <div>POSISI</div>
                    <div>:</div>
                    <div class="underline underline-offset-4 font-semibold">{{ fetched?.role || "" }}</div>
                </div>
                <div class="flex gap-6 text-tosca">
                    <div>KELAS</div>
                    <div>:</div>
                    <div class="underline underline-offset-4 font-semibold">{{ fetched?.classroom || "" }}</div>
                </div>
                <div class="flex gap-6 mt-8 justify-end text-tosca">
                    <button @click.prevent="doOpenModal('changePassword')" class="border-tosca border py-1 px-2 rounded-md bg-gr hover:bg-tosca hover:font-bold hover:border-gr hover:text-gr transition-all ease-out duration-200">
                        <div>GANTI KATA SANDI</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Modal from '@/components/modals/main-modal.vue'
import Single from '@/components/navigations/single-bar.vue';
import { onMounted } from 'vue';
import { useIndexStore } from "@/stores";
import { storeToRefs } from 'pinia';

const useStore = useIndexStore();
const { getMyProfile, resetStates, doOpenModal } = useStore;
const { fetched } = storeToRefs(useStore)

onMounted(async () => {
    resetStates();
    await getMyProfile();
})

</script>