<template>
    <div 
        class="w-full h-full flex justify-end items-center bg-login bg-cover" 
        :class="['overflow-hidden custom-scrollbar', 'scrollbar-track-background']"
    >
        <div 
            :style="boxPosition"
            class="flex flex-col h-full w-[30%] justify-between bg-shade-gr shadow-2xl p-4 transition-all duration-1000"
        >
            <div class="flex flex-col gap-20 text-tosca">
                <div class="flex justify-center gap-4 items-center">
                    <img src="@/assets/logos/alhusna-ikon.png" class="w-[5rem]" />
                    <div class="text-[2.5rem] font-[Tajawal] font-extrabold">AL - HUSNA</div>
                </div>
                <form 
                    @submit.prevent="handleLogin"
                    class="flex flex-col gap-6"
                >
                    <div class="w-full px-2 flex flex-col gap-2">
                        <label for="email" class="font-semibold text-tosca">EMAIL</label>
                        <input 
                            id="email" 
                            class="w-full text-white border-b-2 border-tosca bg-transparent outline-none focus:ring-0 px-2 py-1 rounded-md" 
                            placeholder="email.saya@website.com" 
                            type="email"
                            required
                            autocomplete="off"
                            v-model="email"
                        />
                    </div>
                    <div class="w-full px-2 flex flex-col gap-2">
                        <label for="password" class="font-semibold text-tosca">KATA SANDI</label>
                        <input 
                            id="password"
                            class="w-full text-white border-b-2 border-tosca bg-transparent outline-none focus:ring-0 px-2 py-1 rounded-md" 
                            placeholder="password_saya" 
                            type="password"
                            required
                            autocomplete="off"
                            v-model="password"
                        />
                    </div>
                    <div class="flex justify-center">
                        <div
                        @click.prevent="isLogin = false" 
                            class="text-center cursor-pointer ease-out hover:font-extrabold hover:text-tosca hover:underline transition-all duration-200"
                        >
                            lupa password
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        class="flex justify-center items-center mt-6"
                    >
                        <div 
                            class="bg-gr border-2 border-tosca hover:border-gr text-tosca text-center rounded-lg px-4 hover:bg-tosca hover:font-extrabold hover:text-gr w-[65%] cursor-pointer duration-200 ease-out transition-all py-1"
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
const isLogin = ref(true);

const boxPosition = ref({
    transform: 'translateX(100%)',
});

const handleLogin = async () => {
    await doLogin({
        email: email.value,
        password: password.value 
    })
};

const handleForgetPassword = () => {
    isLogin.value = false
}

onMounted(() => {
    setTimeout(() => {
        boxPosition.value = {
            transform: 'translateX(0)',
        };
    }, 300);
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
