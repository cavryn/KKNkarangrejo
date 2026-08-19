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
      division: "Badan Pengurus Harian",
      major: "Teknik Informatika",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "Memimpin dengan aksi, mengabdi untuk kemajuan Desa Karangrejo, Ujungpangkah, Kabupaten Gresik.",
      instagram: "@rizky.ramadhan",
      email: "rizky.ramadhan@kknkarangrejo.id"
    },
    {
      id: "tm-2",
      name: "Nabila Putri",
      role: "Sekretaris Utama",
      division: "Badan Pengurus Harian",
      major: "Ilmu Komunikasi",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      quote: "Menjalin silaturahmi hangat dan keterbukaan informasi publik bersama warga desa.",
      instagram: "@nabilaputri.id",
      email: "nabila.putri@kknkarangrejo.id"
    },
    {
      id: "tm-3",
      name: "Fajar Pratama",
      role: "Bendahara Utama",
      division: "Badan Pengurus Harian",
      major: "Manajemen Ekonomi",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "Pengelolaan akuntabilitas keuangan pengabdian yang transparan dan efektif.",
      instagram: "@fajarpratama.eco",
      email: "fajar.pratama@kknkarangrejo.id"
    },
    {
      id: "tm-4",
      name: "Siti Aminah",
      role: "Koordinator Divisi Kesehatan & Stunting",
      division: "Kesehatan & Gizi",
      major: "Kesehatan Masyarakat",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      quote: "Generasi sehat dan bebas stunting adalah investasi masa depan Karangrejo.",
      instagram: "@siti.aminah_health",
      email: "siti.aminah@kknkarangrejo.id"
    },
    {
      id: "tm-5",
      name: "Dimas Anggara",
      role: "Koordinator Divisi Lingkungan",
      division: "Lingkungan & Kebersihan",
      major: "Teknik Lingkungan",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      quote: "Desa asri, hijau, dan pemilahan sampah mandiri untuk anak cucu kita kelak.",
      instagram: "@dimasanggara_env",
      email: "dimas.anggara@kknkarangrejo.id"
    },
    {
      id: "tm-6",
      name: "Anisa Rahma",
      role: "Koordinator Divisi Pendidikan & Literasi",
      division: "Pendidikan & Kebudayaan",
      major: "Pendidikan Guru Sekolah Dasar",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      quote: "Setiap anak Karangrejo berhak atas pembelajaran interaktif yang menyenangkan.",
      instagram: "@anisa.rahma_edu",
      email: "anisa.rahma@kknkarangrejo.id"
    },
    {
      id: "tm-7",
      name: "Ahmad Fauzi",
      role: "Koordinator Divisi PDD & IT",
      division: "PDD & Teknologi",
      major: "Teknik Informatika",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      quote: "Digitalisasi informasi desa untuk transparansi dan aksesibilitas publik.",
      instagram: "@ahmadfauzi_dev",
      email: "ahmad.fauzi@kknkarangrejo.id"
    },
    {
      id: "tm-8",
      name: "Budi Santoso",
      role: "Koordinator Divisi UMKM & Ekonomi",
      division: "Ekonomi & UMKM",
      major: "Agribisnis",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      quote: "Restrukturisasi branding dan pemasaran digital UMKM pangan lokal.",
      instagram: "@budi.santoso_agri",
      email: "budi.santoso@kknkarangrejo.id"
    },
    {
      id: "tm-9",
      name: "Dewi Lestari",
      role: "Anggota Divisi Humas & Dokumentasi",
      division: "Humas & Publikasi",
      major: "Ilmu Komunikasi",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      quote: "Mengabadikan setiap momen penuh kehangatan dan kebersamaan warga.",
      instagram: "@dewilestari_media",
      email: "dewi.lestari@kknkarangrejo.id"
    },
    {
      id: "tm-10",
      name: "Eko Prasetyo",
      role: "Anggota Divisi Lingkungan",
      division: "Lingkungan & Kebersihan",
      major: "Teknik Sipil",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      quote: "Membangun fasilitas sanitasi dan tempat daur ulang komposter warga.",
      instagram: "@eko.prasetyo_civil",
      email: "eko.prasetyo@kknkarangrejo.id"
    },
    {
      id: "tm-11",
      name: "Fitri Handayani",
      role: "Anggota Divisi Kesehatan & Gizi",
      division: "Kesehatan & Gizi",
      major: "Ilmu Gizi",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "Sosialisasi MP-ASI kaya nutrisi herbal lokal untuk balita Karangrejo.",
      instagram: "@fitri.nutrition",
      email: "fitri.handayani@kknkarangrejo.id"
    },
    {
      id: "tm-12",
      name: "Gilang Ramadhan",
      role: "Anggota Divisi PDD & Design",
      division: "PDD & Teknologi",
      major: "Desain Komunikasi Visual",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
      quote: "Mendesain kemasan UMKM dan spanduk informasi desa yang estetik.",
      instagram: "@gilang_design",
      email: "gilang.ramadhan@kknkarangrejo.id"
    },
    {
      id: "tm-13",
      name: "Hany Septiani",
      role: "Anggota Divisi Pendidikan",
      division: "Pendidikan & Kebudayaan",
      major: "Pendidikan Bahasa Inggris",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      quote: "Mengajar Fun English Club & pendampingan belajar sore di Posko.",
      instagram: "@hany.septiani_english",
      email: "hany.septiani@kknkarangrejo.id"
    },
    {
      id: "tm-14",
      name: "Indra Wijaya",
      role: "Anggota Divisi PDD & Website",
      division: "PDD & Teknologi",
      major: "Sistem Informasi",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      quote: "Pengembangan etalase web desa agar Karangrejo dikenal luas.",
      instagram: "@indra.wijaya_is",
      email: "indra.wijaya@kknkarangrejo.id"
    },
    {
      id: "tm-15",
      name: "Julia Kartika",
      role: "Anggota Divisi Humas & Acara",
      division: "Humas & Publikasi",
      major: "Hubungan Internasional",
      photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      quote: "Penyelenggara lokakarya dan panggung pentas seni perpisahan desa.",
      instagram: "@julia.kartika_ir",
      email: "julia.kartika@kknkarangrejo.id"
    },
    {
      id: "tm-16",
      name: "Kevin Kurniawan",
      role: "Anggota Divisi UMKM & Logistik",
      division: "Ekonomi & UMKM",
      major: "Administrasi Bisnis",
      photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
      quote: "Pendampingan legalitas NIB dan pendaftaran Google Maps UMKM.",
      instagram: "@kevin.kurniawan_biz",
      email: "kevin.kurniawan@kknkarangrejo.id"
    },
    {
      id: "tm-17",
      name: "Larasati Putri",
      role: "Anggota Divisi Kesehatan & Konseling",
      division: "Kesehatan & Gizi",
      major: "Psikologi",
      photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
      quote: "Edukasi kesehatan mental dan dampingan tumbuh kembang remaja desa.",
      instagram: "@larasati.putri_psych",
      email: "larasati.putri@kknkarangrejo.id"
    }
  ]
};
