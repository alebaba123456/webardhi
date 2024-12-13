<template>
    <div class="w-full h-full flex justify-center items-center bg-login bg-cover">
        <div class="w-[30%] h-[70%] flex flex-col justify-between bg-shade-sh shadow-2xl rounded-xl p-4">
            <div class="flex flex-col gap-12">
                <div class="flex justify-between">
                    <img src="@/assets/logos/logo-sekolah.png" class="w-[3rem]"/>
                    <div class="flex flex-col justify-center items-center">
                        <div>MADRASAH IBTIDAIYAH</div>
                        <div>AL-HUSNA</div>
                    </div>
                    <img src="@/assets/logos/logo-yayasan.png" class="w-[3rem]"/>
                </div>
                <div class="flex flex-col gap-6">
                    <div class="w-full px-2 flex flex-col gap-2">
                        <div>username</div>
                        <input class="w-full text-prime px-2 py-1 rounded-lg"/>
                    </div>
                    <div class="w-full px-2 flex flex-col gap-2">
                        <div>password</div>
                        <input class="w-full text-prime text-px-2 py-1 rounded-lg" type="password"/>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center">
                <div class="bg-prime text-center rounded-xl px-4 hover:bg-sec w-[65%] cursor-pointer duration-300 ease-out transition-all py-1 ">LOGIN</div>
            </div>
        </div>
    </div>
</template>

<script setup>
   
</script>