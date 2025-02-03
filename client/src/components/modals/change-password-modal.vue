<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
      <div class="text-center bg-gr text-tosca font-bold w-6/12">FORM PERUBAHAN KATA SANDI</div>
      <div class="w-6/12 h-fit bg-shade-wh">
        <form @submit.prevent="doSubmitChangePassword({ oldPassword, newPassword, confirmationNewPassword })" class="px-4 py-2 w-full h-full">
          <div class="flex flex-col justify-between h-full">
            <div class="flex flex-col gap-8">
              <div class="flex gap-6 items-center">
                <label for="oldPassword" class="font-semibold">KATA SANDI LAMA</label>
                <div class="relative w-auto">
                  <input 
                    id="oldPassword" 
                    class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0 w-full pr-10" 
                    :type="showOldPassword ? 'text' : 'password'" 
                    placeholder="Masukkan password.." 
                    autocomplete="off" 
                    v-model="oldPassword" 
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center cursor-pointer" @click="showOldPassword = !showOldPassword">
                    <i :class="showOldPassword ? 'eye-off-icon' : 'eye-icon'"></i>
                  </span>
                </div>
              </div>
              <div class="flex gap-6 items-center">
                <label for="newPassword" class="font-semibold">KATA SANDI BARU</label>
                <div class="relative w-auto">
                  <input 
                    id="newPassword" 
                    class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0 w-full pr-10" 
                    :type="showNewPassword ? 'text' : 'password'" 
                    placeholder="Masukkan password baru.." 
                    autocomplete="off" 
                    v-model="newPassword" 
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center cursor-pointer" @click="showNewPassword = !showNewPassword">
                    <i :class="showNewPassword ? 'eye-off-icon' : 'eye-icon'"></i>
                  </span>
                </div>
              </div>
              <div class="flex gap-6 items-center">
                <label for="confirmationNewPassword" class="font-semibold">KONFIRMASI KATA SANDI BARU</label>
                <div class="relative w-auto">
                  <input 
                    id="confirmationNewPassword" 
                    class="bg-transparent border-b-gr border-b-2 outline-none focus:ring-0 w-full pr-10" 
                    :type="showConfirmationPassword ? 'text' : 'password'" 
                    placeholder="Ulangi password baru.." 
                    autocomplete="off" 
                    v-model="confirmationNewPassword" 
                  />
                  <span class="absolute inset-y-0 right-0 flex items-center cursor-pointer" @click="showConfirmationPassword = !showConfirmationPassword">
                    <i :class="showConfirmationPassword ? 'eye-off-icon' : 'eye-icon'"></i>
                  </span>
                </div>
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
  import { ref } from 'vue';
  import { useIndexStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import CancelButton from '@/components/buttons/cancel-button.vue';
  import SubmitButton from '@/components/buttons/submit-class.vue';
  
  const useStore = useIndexStore();
  const { doCloseModal, doSubmitChangePassword } = useStore;
  
  const oldPassword = ref("");
  const newPassword = ref("");
  const confirmationNewPassword = ref("");
  
  const showOldPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmationPassword = ref(false);
  </script>
  
  <style scoped>
  .eye-icon::before {
    content: '👁️';
  }
  .eye-off-icon::before {
    content: '🚫';
  }
  </style>
  