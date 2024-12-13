<template>
    <div class="h-full flex flex-col">
        <!-- Blok Header -->
            <div class="header-block">
                <h1 class="header-title">Halaman Utama</h1>
            </div>
  
    <!-- Konten Utama -->
    <div class="main-content flex">
        <!-- Sidebar -->
        <Single />
  
            <!-- Area Konten -->
            <div class="content-area flex-1">
                <div class="dashboard-grid">
                    <!-- Siswa -->
                    <div class="card" style="background-color: #fefae0; color: #283618">
                        <div class="icon">👥</div>
                        <div class="info">Siswa</div>
                    </div>

                    <!-- Guru -->
                    <div class="card" style="background-color: #fefae0; color: #283618">
                        <div class="icon">👤</div>
                        <div class="info">Guru</div>
                    </div>
  
                    <!-- Mata Pelajaran -->
                        <div class="card" style="background-color: #fefae0; color: #283618">
                            <div class="icon">📄</div>
                            <div class="info">Mata Pelajaran</div>
                        </div>
  
                    <!-- Tentang Sekolah -->
                    <div class="card" style="background-color: #fefae0; color: #283618">
                        <div class="icon">🏠</div>
                        <div class="info">Tentang Sekolah</div>
                    </div>
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
    color: white;
    padding: 20px;
    text-align: center;
  }
  
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
  
  /* Area konten grid */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  /* Kartu */
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  /* Ikon pada kartu */
  .card .icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  /* Info teks */
  .card .info {
    font-size: 1.1rem;
    font-weight: bold;
  }
  </style>
  