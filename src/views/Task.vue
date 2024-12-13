<template>
  <div class="h-full flex flex-col">
      <div class="header-block">
          <h1 class="header-title">Halaman Tugas</h1>
      </div>

            <!-- Konten Utama -->
                <div class="main-content flex">
                    <Single />
                <div class="content-area flex-1">
            </div>
        </div>
    </div>
</template>

<script setup>
import Single from "@/components/navigations/single-bar.vue";
</script>

<style>
/* Blok Header */
.header-block {
  background-color: #283618;
  color: white; /* warna text */
  padding: 20px;
  text-align: center;
}

/* Gaya untuk teks di header */
.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

/* Konten utama */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: row;
}
</style>
