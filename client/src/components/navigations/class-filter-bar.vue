<template>
    <div class="w-full flex gap-4 justify-between">
        <form @submit.prevent="applyFilter()" class="flex gap-8 text-[0.85rem] bg-shade-gr shadow-md shadow-shade-gr px-2 py-1">
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
            <div class="flex gap-2 items-center">
                <label for="size" class="text-white font-medium">tampilkan :</label>
                <select id="size"
                    class="text-white bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-white"
                    placeholder="Pilih urutan.." autocomplete="off" v-model="size">
                    <option class="" value="" disabled selected>Pilih urutan..</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
            <button class="bg-white hover:bg-shade hover:font-bold hover:text-white transition-all duration-300 ease-out rounded-lg border-shade-gr border text-shade-gr px-6">
                <div>Cari</div>
            </button>
        </form>
        <div class="flex gap-8 text-[0.85rem] bg-shade-gr shadow-md shadow-shade-gr px-2 py-1">
            <button class="bg-white hover:bg-shade hover:font-bold hover:text-white transition-all duration-300 ease-out w-full rounded-lg border-shade-gr border text-shade-gr px-6">
                <div>Buat baru</div>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useIndexStore } from "@/stores";

    const useStore = useIndexStore()
    const { doSearch } = useStore

    const order = ref(null)
    const category = ref(null)
    const keyword = ref(null)
    const size = ref(null)

    async function applyFilter() {
        const payload = {
            order : order.value,
            category : category.value,
            keyword : keyword.value,
            size : size.value
        }
        await doSearch(payload)
    }
</script>