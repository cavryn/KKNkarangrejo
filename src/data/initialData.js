export const INITIAL_DATA = {
  villageInfo: {
    name: "Desa Karangrejo",
    subdistrict: "Kecamatan Ujungpangkah",
    regency: "Kabupaten Gresik",
    province: "Jawa Timur",
    motto: "Maju, Sejahtera, dan Berkelanjutan",
    description: "Desa Karangrejo adalah desa yang terletak di Kecamatan Ujungpangkah, Kabupaten Gresik, kaya akan potensi perikanan, tambak, pertanian, UMKM olahan pangan lokal, serta keasrian lingkungan pedesaan. Melalui KKN Kelompok 3, kami berkomitmen untuk melakukan akselerasi digitalisasi UMKM, edukasi kesehatan warga, serta keberlanjutan lingkungan.",
    location: "Desa Karangrejo, Kec. Ujungpangkah, Kab. Gresik, Jawa Timur",
    stats: {
      prokerCount: 5,
      workHours: "384 Jam", // 16 Hari
      teamMembers: 17
    }
  },

  prokerList: [
    {
      id: "proker-1",
      title: "Digitalisasi & Branding UMKM Olahan Pangan Lokal",
      category: "Ekonomi & UMKM",
      status: "Selesai",
      date: "12 Juli 2026",
      objective: "Membantu pelaku UMKM Desa Karangrejo memperluas jangkauan pasar melalui pendaftaran Google Maps, pembuatan kemasan kedap udara, dan materi promosi sosial media.",
      target: "Pelaku UMKM Pangan Lokal Desa Karangrejo",
      description: "Program ini mencakup restrukturisasi kemasan produk lokal, desain label nutrisi modern, pendaftaran Google Business Profile agar mudah ditemukan wisatawan, serta pelatihan pemasaran digital via Instagram & TikTok.",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      impact: "UMKM lokal berhasil terdaftar di Google Maps dan mengalami kenaikan jangkauan pesanan digital."
    },
    {
      id: "proker-2",
      title: "Edukasi Pemilahan Sampah & Pelatihan Kompos Rumah Tangga",
      category: "Lingkungan",
      status: "Selesai",
      date: "15 Juli 2026",
      objective: "Meningkatkan kesadaran lingkungan warga Desa Karangrejo terhadap pengelolaan sampah organik dan anorganik skala rumah tangga.",
      target: "Ibu-Ibu PKK & Warga Desa Karangrejo",
      description: "Sosialisasi langsung pembuatan komposter sederhana memanfaatkan ember bekas dan bioaktivator EM4 untuk mengubah limbah dapur menjadi pupuk organik cair yang kaya unsur hara.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      impact: "Tersedianya unit komposter rumah tangga dan modul praktis pengolahan sampah."
    },
    {
      id: "proker-3",
      title: "Bimbingan Belajar Bahasa Inggris & Pojok Baca Digital",
      category: "Pendidikan",
      status: "Berjalan",
      date: "18 Juli 2026",
      objective: "Meningkatkan literasi dan keterampilan berbahasa Inggris anak-anak sekolah dasar di Desa Karangrejo melalui metode gamifikasi interaktif.",
      target: "Siswa Sekolah Dasar Desa Karangrejo",
      description: "Pendirian Pojok Baca anak dengan koleksi buku fisik dan e-book interaktif, disertai kelas belajar Bahasa Inggris mingguan bernuansa permainan dan lagu edukatif.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      impact: "Anak-anak SD rutin mengikuti program Bimbel interaktif setiap akhir pekan."
    },
    {
      id: "proker-4",
      title: "Pemeriksaan Kesehatan Gratis & Pencegahan Stunting",
      category: "Kesehatan",
      status: "Selesai",
      date: "22 Juli 2026",
      objective: "Mendukung posyandu balita dan lansia dalam pemantauan gizi anak serta pemeriksaan tekanan darah dan gula darah.",
      target: "Balita, Ibu Hamil, dan Lansia Desa Karangrejo",
      description: "Kolaborasi dengan bidan desa untuk mendistribusikan PMT (Pemberian Makanan Tambahan) gizi seimbang, edukasi isi piringku untuk cegah stunting, dan cek kesehatan lansia.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      impact: "Warga terskrining kesehatan dan mendapat vitamin serta makanan tambahan gizi."
    },
    {
      id: "proker-5",
      title: "Pembuatan Website Profil Resmi Desa & Peta Tematik Digital",
      category: "Teknologi",
      status: "Berjalan",
      date: "25 Juli 2026",
      objective: "Menyediakan etalase digital dokumentasi KKN dan informasi publik desa agar mudah diakses oleh pihak kampus, warga, dan pengunjung.",
      target: "Perangkat Desa & Masyarakat Luas",
      description: "Pengembangan sistem web berdesain modern yang menyajikan dokumentasi kegiatan KKN, direktori proker, galeri foto interaktif, serta repositori artikel modul.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      impact: "Publikasi terbuka terpusat untuk akreditasi KKN & portofolio desa."
    }
  ],

  galleryList: [
    {
      id: "gal-1",
      title: "Sosialisasi Pemilahan Sampah bersama Ibu PKK",
      prokerCategory: "Lingkungan",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      caption: "Sesi demonstrasi pembuatan pupuk komposter dari sisa dapur di Balai Desa Karangrejo."
    },
    {
      id: "gal-2",
      title: "Pendampingan Labeling Packaging UMKM Lokal",
      prokerCategory: "Ekonomi & UMKM",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      caption: "Perancangan desain kemasan pouch modern tahan lembab untuk produk lokal."
    },
    {
      id: "gal-3",
      title: "Pemeriksaan Kesehatan Posyandu Lansia",
      prokerCategory: "Kesehatan",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      caption: "Cek gratis tekanan darah & asam urat lansia Desa Karangrejo."
    },
    {
      id: "gal-4",
      title: "Kelas Bahasa Inggris Ceria Anak SD",
      prokerCategory: "Pendidikan",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      caption: "Anak-anak antusias memperagakan kosakata hewan & warna dalam permainan kelompok."
    },
    {
      id: "gal-5",
      title: "Diskusi Koordinasi dengan Kepala Desa Karangrejo",
      prokerCategory: "Teknologi",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      caption: "Penyampaian progres program kerja mingguan kepada pimpinan desa."
    }
  ],

  articlesList: [
    {
      id: "art-1",
      title: "Panduan Praktis Pembuatan Kompos Rumah Tangga Tanpa Bau",
      category: "Lingkungan & Edukasi",
      author: "Tim Lingkungan KKN Kelompok 3",
      date: "16 Juli 2026",
      summary: "Pelajari langkah mudah mengubah sisa sampah dapur menjadi cairan pupuk organik kaya nutrisi menggunakan bahan sederhana di rumah.",
      coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      content: `
### Pendahuluan
Sampah organik skala rumah tangga mencakup lebih dari 60% total volume limbah harian di pedesaan. Jika ditumpuk tanpa pengolahan, sampah ini berpotensi menimbulkan bau tak sedap dan mengundang bibit penyakit. 

### Alat & Bahan yang Dibutuhkan
1. Ember plastik berukuran 20-30 Liter yang dilengkapi penutup rapat.
2. Botol Bioaktivator EM4 (Tersedia di toko pertanian).
3. Air bersih & Gula merah secukupnya sebagai nutrisi mikroba.
4. Sampah organik dapur (sisa sayuran, kulit buah, sisa nasi - hindari minyak & daging).
5. Sekam padi atau serbuk gergaji kayu untuk penyeimbang kelembaban.

### Langkah-Langkah Pembuatan
1. **Pencacahan**: Cincang sisa sayuran dan kulit buah menjadi ukuran 2-3 cm agar proses pembusukan mikroba berlangsung lebih cepat.
2. **Campuran Larutan EM4**: Larutkan 2 tutup botol EM4 + 1 sendok makan gula merah ke dalam 1 Liter air. Diamkan 15 menit.
3. **Penyusunan Lapisan**: Taburkan serbuk gergaji/sekam di bagian dasar ember (tebal 3 cm), lalu masukkan sampah dapur yang telah dicincang.
4. **Penyemprotan**: Semprotkan larutan EM4 hingga lembab (tidak terlalu basah/berair).
5. **Tutup Rapat**: Tutup rapat komposter dan tempatkan di lokasi teduh yang terhindar dari hujan langsung.

### Perawatan & Pemanfaatan
Kocok atau aduk seminggu sekali. Dalam waktu 3-4 minggu, pupuk komposter akan siap dipanen. Kompos yang matang ditandai dengan warna cokelat kehitaman dan aroma harum mirip tanah segar.
      `
    },
    {
      id: "art-2",
      title: "Strategi Mendaftarkan Usaha Lokal di Google Maps & Business Profile",
      category: "Ekonomi & Digital",
      author: "Tim Ekonomi & IT KKN Kelompok 3",
      date: "20 Juli 2026",
      summary: "Tutorial step-by-step gratis pendaftaran toko / UMKM desa ke peta digital Google agar mudah ditemukan pelanggan luar kota.",
      coverImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      content: `
### Mengapa UMKM Desa Wajib Hadir di Google Maps?
Di era digital, calon pembeli atau wisatawan mencari rekomendasi oleh-oleh langsung via smartphone. Jika UMKM Anda terdaftar di Google Maps, pembeli dapat menemukan rute, jam buka, nomor WhatsApp, dan foto produk dalam 1 kali klik.

### Syarat Persiapan
- Smartphone Android/iOS yang terhubung internet.
- Akun Google / Gmail aktif.
- Foto jernih produk & papan nama toko.
- Alamat rinci atau patokan lokasi terdekat.

### Langkah Pendaftaran
1. Buka aplikasi **Google Maps** di ponsel Anda.
2. Ketuk ikon **Kontribusi (+)** di bagian bawah layar.
3. Pilih menu **Tambahkan Tempat (Add Place)**.
4. Isi Nama Usaha (Contoh: *UMKM Pangan Lokal Karangrejo Ujungpangkah*).
5. Pilih Kategori yang sesuai (contoh: *Toko Makanan* atau *Pabrik Makanan*).
6. Tentukan titik lokasi di peta secara akurat dengan menggeser pin merah.
7. Tambahkan nomor WhatsApp bisnis & foto terbaik produk Anda.
8. Klik **Kirim**. Google akan meninjau pendaftaran Anda dalam 24-48 jam.
      `
    }
  ],

  teamMembers: [
    {
      id: "tm-1",
      name: "Rizky Ramadhan",
      role: "Ketua Kelompok KKN",
      major: "Teknik Informatika",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "Memimpin dengan aksi, mengabdi untuk kemajuan Desa Karangrejo, Ujungpangkah, Kabupaten Gresik."
    },
    {
      id: "tm-2",
      name: "Nabila Putri",
      role: "Sekretaris & Divisi Humas",
      major: "Ilmu Komunikasi",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      quote: "Menjalin silaturahmi hangat dan keterbukaan informasi bersama warga."
    },
    {
      id: "tm-3",
      name: "Fajar Pratama",
      role: "Bendahara & Penanggung Jawab UMKM",
      major: "Manajemen Ekonomi",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "Mendorong kemandirian ekonomi desa lewat inovasi produk lokal."
    },
    {
      id: "tm-4",
      name: "Siti Aminah",
      role: "Divisi Kesehatan & Stunting",
      major: "Kesehatan Masyarakat",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      quote: "Generasi sehat dan bebas stunting adalah investasi masa depan Karangrejo."
    },
    {
      id: "tm-5",
      name: "Dimas Anggara",
      role: "Divisi Lingkungan & Infrastruktur",
      major: "Teknik Lingkungan",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      quote: "Desa asri, hijau, dan tertata rapi untuk anak cucu kita kelak."
    },
    {
      id: "tm-6",
      name: "Anisa Rahma",
      role: "Divisi Pendidikan & Literasi",
      major: "Pendidikan Guru Sekolah Dasar",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      quote: "Setiap anak Karangrejo berhak atas pendidikan yang menyenangkan."
    }
  ]
};
