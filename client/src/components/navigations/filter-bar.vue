<template>
    <div class="w-full flex gap-4 justify-between">
        <form v-if="!['Bank_Soal'].includes(router.currentRoute.value.name)" @submit.prevent="applyFilter()" class="flex gap-8 text-[0.85rem] rounded-lg bg-gr shadow-md shadow-shade-tc px-2 py-1">
            <div v-if="['name', 'code', null].includes(category)"  class="flex gap-2 items-center">
                <label for="keyword" class="text-tosca font-medium">Pencarian :</label>
                <input id="keyword"
                    class="text-tosca bg-transparent outline-none focus:ring-0 px-2 rounded-md border-b border-tosca"
                    placeholder="Kata pencarian.." autocomplete="off" v-model="keyword" />
            </div>
            <div v-if="['religion', 'gender', 'grade', 'ClassRoomId', 'ProfileId', 'SubjectId', 'type'].includes(category)" class="flex gap-2 items-center">
                <label for="keyword" class="text-tosca font-medium">Keyword :</label>
                <select id="keyword"
                    class="text-tosca bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-tosca"
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
                    <template v-if="category == 'type'">
                        <option value="UJIAN">Ujian Harian</option>
                        <option value="UTS">UTS</option>
                        <option value="UAS">UAS</option>
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
                    <template v-if="category === 'ProfileId'">
                        <option
                            v-for="profile in profiles"
                            :key="profile.id"
                            :value="profile.id"
                        >
                            {{ profile.name }}
                        </option>
                    </template>
                    <template v-if="category === 'SubjectId'">
                        <option
                            v-for="subject in subjects"
                            :key="subject.id"
                            :value="subject.id"
                        >
                            {{ subject.name }}
                        </option>
                    </template>
                </select>
            </div>
            <div class="flex gap-2 items-center">
                <label for="category" class="text-tosca font-medium">berdasarkan :</label>
                <select id="category"
                    class="text-tosca bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-tosca"
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
                    <template v-if="router.currentRoute.value.name === 'Pelajaran'">
                        <option value="name">Nama pelajaran</option>
                        <option value="code">Kode pelajaran</option>
                        <option value="grade">Kelas</option>
                    </template>
                    <template v-if="router.currentRoute.value.name === 'Ujian'">
                        <option value="type">Tipe ujian</option>
                        <option value="ProfileId">Guru</option>
                    </template>
                </select>
            </div>
            <div class="flex gap-2 items-center">
                <label for="order" class="text-tosca font-medium">urutan :</label>
                <select id="order"
                    class="text-tosca bg-transparent hover:text-gr cursor-pointer outline-none focus:ring-0 px-2 py-[0.15rem] rounded-md border-b border-tosca"
                    placeholder="Pilih urutan.." autocomplete="off" v-model="order">
                    <option class="" value="" disabled selected>Pilih urutan..</option>
                    <option value="asc">Naik</option>
                    <option value="desc">Turun</option>
                </select>
            </div>
            <button class="bg-gr hover:bg-tosca hover:font-bold hover:text-gr transition-all duration-300 ease-out rounded-lg border-shade-gr border text-tosca px-6">
                <div>Cari</div>
            </button>
        </form>
        <div class="flex gap-8 text-[0.85rem] bg-gr shadow-md shadow-shade-tc px-2 py-1 rounded-lg">
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
    const { doSearch, doOpenModal, getClassSelection, getProfileSelection, getSubjectSelection } = useStore

    const order = ref(null)
    const category = ref(null)
    const keyword = ref(null)
    const size = ref(null)
    const classrooms = ref([]);
    const profiles = ref([]);
    const subjects = ref([]);

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
        switch (router.currentRoute.value.name) {
            case 'Siswa':
            case 'Guru':
                classrooms.value = await getClassSelection();
                break;
            case 'Kelas':
                classrooms.value = await getClassSelection();
                profiles.value = await getProfileSelection(`?page=1&size=999&category=role&keyword=GURU`);
                subjects.value = await getSubjectSelection();
                break;
            case 'Ujian':
            case 'Pelajaran':
                profiles.value = await getProfileSelection(`?page=1&size=999&category=role&keyword=GURU`);
                break;
            default:
                break;
        }
    })
</script>