<template>
  <div class="h-full flex flex-col">
      <div class="header-block">
          <h1 class="header-title">Halaman Kelas</h1>
          <Single />
      </div>

      <!-- Konten Utama -->
      <div class="main-content flex">
          <div class="content-area-left">
              <!-- Tabel Jadwal -->
              <div class="table-container">
                  <h2 class="table-title">Jadwal Pelajaran</h2>
                  <table class="schedule-table">
                      <thead>
                          <tr>
                              <th>Tanggal</th>
                              <th>Hari</th>
                              <th>Mata Pelajaran</th>
                              <th>Jam Mulai</th>
                              <th>Jam Selesai</th>
                          </tr>
                      </thead>
                      <tbody>
                          <!-- untuk nambah data sesuai kebutuhan -->
                           <tr>
                              <td>2024-12-16</td>
                              <td>Senin</td>
                              <td>Matematika</td>
                              <td>08:00</td>
                              <td>10:00</td>
                           </tr>
                           <tr>
                              <td>2024-12-16</td>
                              <td>Senin</td>
                              <td>Bahasa Indonesia</td>
                              <td>10:30</td>
                              <td>12:00</td>
                           </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          
          <div class="content-area-right">
              <!-- Tabel Kelas -->
              <div class="table-container">
                <h2 class="table-title">Kelas I-A</h2>
                  <table class="class-table">
                      <thead>
                          <tr>
                              <th>No.Absen</th>
                              <th>Nama</th>
                              <th>Jenis Kelamin</th>
                              <th>Rank Kelas</th>
                              <th>Rank di Sekolah</th>
                          </tr>
                      </thead>
                      <tbody>
                          <!-- untuk nambah data sesuai kebutuhan -->
                           <tr>
                              <td>1</td>
                              <td>Ardhi</td>
                              <td>Laki-laki</td>
                              <td>1</td>
                              <td>10</td>
                           </tr>
                           <tr>
                              <td>2</td>
                              <td>Firmansyah</td>
                              <td>Laki-laki</td>
                              <td>2</td>
                              <td>12</td>
                           </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
      <!-- Kolom Live Chat -->
      <div class="chat-box">
          <div class="chat-header">
              <h3>Live Chat</h3>
          </div>
          <div class="chat-content">
              <div class="chat-messages">
                  <!-- Pesan akan ditampilkan di sini -->
              </div>
              <input type="text"placeholder="Ketik pesan..." class="chat-input" />
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
}

/* Tabel Jadwal dan Tabel Kelas */
.content-area-left,
.content-area-right {
  width: 50%;
  padding: 10px;
}

.table-container {
  background-color: #bc6c25;
  border: 10px solid #bc6c2554;
  border-radius: 5px;
}

.table-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

/* Styling untuk kedua tabel */
.schedule-table,
.class-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.schedule-table th,
.schedule-table td,
.class-table th,
.class-table td {
  border: 1px solid #dda15e;
  padding: 10px;
}

.schedule-table th,
.class-table th {
  background-color: #dda15e60;
  font-weight: bold;
}

/* Kolom Live Chat */
.chat-box {
  position: fixed;
  bottom: 10px;
  right: 20px;
  width: 40%;
  max-width: 500;
  background-color: #fff;
  border: 4px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #283618;
  color: white;
  padding: 10px;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.chat-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: auto;
  color: black
}

.chat-messages {
  margin-bottom: 10px;
  color : black
}

.chat-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  width: 100%;
}
</style>
