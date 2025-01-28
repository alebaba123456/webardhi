<template>
    <div class="w-full flex gap-4 justify-between">
        <form @submit.prevent="applyFilter()" class="flex gap-8 text-[0.85rem] bg-shade-gr shadow-md shadow-shade-gr px-2 py-1">
            <div v-if="['name', 'code', null].includes(category)"  class="flex gap-2 items-center">
                <label for="keyword" class="text-white font-medium">Pencarian :</label>
                <input id="keyword"
                    class="text-white bg-transparent outline-none focus:ring-0 px-2 rounded-md border-b border-white"
                    placeholder="Kata pencarian.." autocomplete="off" v-model="keyword" />
            </div>
            <div v-if="['religion', 'gender', 'grade', 'ClassRoomId'].includes(category)" class="flex gap-2 items-center">
                <label for="keyword" class="text-white font-medium">Keyword :</label>
                <select id="keyword"
                    class="text-white bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-white"
                    placeholder="Pilih kategori.." autocomplete="off" v-model="keyword">
                    <option value="" disabled selected>Kata pencarian..</option>
                    <template v-if="category == 'religion'">
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Budha">Budha</option>
                        <option value="Konghucu">Konghucu</option>
                        <option value="Lainnya">Lainnya</option>
                    </template>
                    <template v-if="category == 'gender'">
                        <option value="L">Laki - laki</option>
                        <option value="P">Perempuan</option>
                    </template>
                    <template v-if="category == 'grade'">
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </template>
                    <template v-if="category === 'ClassRoomId'">
                        <option
                            v-for="classroom in classrooms"
                            :key="classroom.id"
                            :value="classroom.id"
                        >
                            {{ classroom.grade }} - {{ classroom.code }}
                        </option>
                    </template>
                </select>
            </div>
            <div class="flex gap-2 items-center">
                <label for="category" class="text-white font-medium">berdasarkan :</label>
                <select id="category"
                    class="text-white bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-white"
                    placeholder="Pilih kategori.." autocomplete="off" v-model="category">
                    <option value="" disabled selected>Pilih kategori..</option>
                    <template v-if="['Siswa', 'Guru'].includes(router.currentRoute.value.name)">
                        <option value="name">Nama</option>
                        <option value="religion">Agama</option>
                        <option value="gender">Jenis kelamin</option>
                        <option value="ClassRoomId">Kelas</option>
                    </template>
                    <template v-if="router.currentRoute.value.name === 'Kelas'">
                        <option value="grade">Kelas</option>
                        <option value="code">Kode Kelas</option>
                    </template>
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
            <button class="bg-white hover:bg-shade hover:font-bold hover:text-white transition-all duration-300 ease-out rounded-lg border-shade-gr border text-shade-gr px-6">
                <div>Cari</div>
            </button>
        </form>
        <div class="flex gap-8 text-[0.85rem] bg-shade-gr shadow-md shadow-shade-gr px-2 py-1">
            <CreateClassButton />
        </div>
    </div>
</template>

<script setup>
    import router from "@/routers";
    import CreateClassButton from '@/components/buttons/open-create-class.vue';
    import { onMounted, ref, watch } from 'vue';
    import { useIndexStore } from "@/stores";

    const useStore = useIndexStore()
    const { doSearch, doOpenModal, getClassSelection } = useStore

    const order = ref(null)
    const category = ref(null)
    const keyword = ref(null)
    const size = ref(null)
    const classrooms = ref([]);

    async function applyFilter() {
        const payload = {
            order : order.value,
            category : category.value,
            keyword : keyword.value,
            size : size.value
        }
        await doSearch(payload)
    }

    onMounted(async () => {
        const response = await getClassSelection();
        classrooms.value = response;
    })
</script>