<template>
    <div class="w-full flex gap-4 justify-between">
        <form @submit.prevent="" class="flex gap-8 w-9/12 text-[0.85rem] bg-shade-gr shadow-md shadow-shade-gr px-2 py-1">
            <div class="flex gap-2 items-center">
                <label for="keyword" class="text-white font-medium">Pencarian :</label>
                <input id="keyword"
                    class="text-white bg-transparent outline-none focus:ring-0 px-2 rounded-md border-b border-white"
                    placeholder="Kata pencarian.." autocomplete="off" v-model="keyword" />
            </div>
            <div class="flex gap-2 items-center">
                <label for="category" class="text-white font-medium">berdasarkan :</label>
                <select id="category"
                    class="text-white bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-white"
                    placeholder="Pilih kategori.." autocomplete="off" v-model="category">
                    <option value="" disabled selected>Pilih kategori..</option>
                    <option value="grade">Kelas</option>
                    <option value="code">Kode kelas</option>
                </select>
            </div>
            <div class="flex gap-2 items-center">
                <label for="order" class="text-white font-medium">urutan :</label>
                <select id="order"
                    class="text-white bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-white"
                    placeholder="Pilih urutan.." autocomplete="off" v-model="order">
                    <option class="" value="" disabled selected>Pilih urutan..</option>
                    <option value="asc">Naik</option>
                    <option value="desc">Turun</option>
                </select>
            </div>
            <button class="bg-white rounded-lg border-shade-gr border text-shade-gr px-6 hover:font-semibold">
                <div>Cari</div>
            </button>
        </form>
        <div class="flex gap-8 text-[0.85rem] w-3/12 bg-shade-gr shadow-md shadow-shade-gr px-2 py-1">
            <button class="bg-white w-full rounded-lg border-shade-gr border text-shade-gr px-6 hover:font-semibold">
                <div>Buat baru</div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const keyword = ref('');
const category = ref('');
const order = ref('');
</script>