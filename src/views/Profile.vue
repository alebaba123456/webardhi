<template>
  <Single />
  <div class="h-full flex flex-col">
      <div class="header-block">
          <h1 class="header-title">Halaman Profile</h1>
      </div>

      <!-- Konten Utama -->
      <div class="main-content flex">
          <!-- Area Foto -->
          <div class="photo-area">
              <div class="photo-container">
                  <!-- ini untuk upload foto di samping -->
                  <img src="@/assets/logos/logo-sekolah.png" class="photo" />
              </div>
          </div>

          <!-- Area Konten Profil -->
          <div class="content-area flex-1">
              <div class="profile-section">
                  <h2 class="section-title">Data Pribadi</h2>
                  <ul class="data-list">
                      <li><span class="label">NISN</span>: <span class="value"></span></li>
                      <li><span class="label">Nama Lengkap</span>: <span class="value"></span></li>
                      <li><span class="label">Kelas</span>: <span class="value"></span></li>
                      <li><span class="label">Tanggal Lahir</span>: <span class="value"></span></li>
                      <li><span class="label">Alamat Siswa</span>: <span class="value"></span></li>
                  </ul>
              </div>
              <div class="profile-section">
                  <h2 class="section-title">Data Orang Tua</h2>
                  <ul class="data-list">
                      <li><span class="label">Nama Ayah</span>: <span class="value"></span></li>
                      <li><span class="label">Pekerjaan Ayah</span>: <span class="value"></span></li>
                      <li><span class="label">Nama Ibu</span>: <span class="value"></span></li>
                      <li><span class="label">Pekerjaan Ibu</span>: <span class="value"></span></li>
                      <li><span class="label">Alamat Orang Tua</span>: <span class="value"></span></li>
                  </ul>
              </div>
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
  padding: 20px;
  gap: 20px;
}

/* Area Foto */
.photo-area {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-container {
  width: 150px;
  height: 300px;
  border: 4px solid #ccc;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
/* Area Konten Profil */
.content-area {
  width: 70%;
}

.profile-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 4px solid #ccc;
  padding-bottom: 5px;
}

.data-list {
  list-style: none;
  padding: 0;
}

.data-list li {
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  margin-bottom: 10px;
}

.label {
  width: 180px;
  font-weight: normal;
}

.value {
  flex: 1;
}
</style>
