<template>
    <div 
        class="w-full h-full flex justify-end items-center bg-login bg-cover" 
        :class="['overflow-hidden custom-scrollbar', 'scrollbar-track-background']"
    >
        <div 
            :style="boxPosition"
            class="flex flex-col h-full w-[30%] justify-between bg-shade-gr shadow-2xl p-4 transition-all duration-1000"
        >
            <div class="flex flex-col gap-20 text-white">
                <div class="flex justify-between">
                    <img src="@/assets/logos/logo-sekolah.png" class="w-[3rem]" />
                    <div class="flex flex-col justify-center items-center text-[1.2rem]">
                        <div>MADRASAH TSANAWIYAH</div>
                        <div>AL - HUSNA</div>
                    </div>
                    <img src="@/assets/logos/logo-yayasan.png" class="w-[3rem]" />
                </div>
                <form 
                    @submit.prevent="handleLogin"
                    class="flex flex-col gap-6"
                >
                    <div class="w-full px-2 flex flex-col gap-2">
                        <label for="email">Email</label>
                        <input 
                            id="email" 
                            class="w-full text-white border-b-2 border-white bg-transparent outline-none focus:ring-0 px-2 py-1 rounded-md" 
                            placeholder="email.saya@website.com" 
                            type="email"
                            required
                            autocomplete="off"
                            v-model="email"
                        />
                    </div>
                    <div class="w-full px-2 flex flex-col gap-2">
                        <label for="password">Kata sandi</label>
                        <input 
                            id="password"
                            class="w-full text-white border-b-2 border-white bg-transparent outline-none focus:ring-0 px-2 py-1 rounded-md" 
                            placeholder="password_saya" 
                            type="password"
                            required
                            autocomplete="off"
                            v-model="password"
                        />
                    </div>
                    <div class="flex justify-center">
                        <div 
                            class="text-center cursor-pointer ease-out hover:font-extrabold hover:underline transition-all duration-300"
                        >
                            lupa password
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        class="flex justify-center items-center mt-6"
                    >
                        <div 
                            class="bg-white text-gr text-center rounded-l px-4 hover:bg-gr hover:font-extrabold hover:text-white w-[65%] cursor-pointer duration-500 ease-out transition-all py-1"
                        >
                            MASUK
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useIndexStore } from "@/stores";

const useStore = useIndexStore();
const { doLogin } = useStore;

const email = ref('');
const password = ref('');

const boxPosition = ref({
    transform: 'translateX(100%)',
});

const handleLogin = async () => {
    doLogin({
        email: email.value,
        password: password.value 
    })
};

// Animasi saat mounted
onMounted(() => {
    setTimeout(() => {
        boxPosition.value = {
            transform: 'translateX(0)',
        };
    }, 300); // 300ms untuk animasi masuk
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 0;
}

.scrollbar-track-background::-webkit-scrollbar-track {
    background: transparent;
}
</style>
