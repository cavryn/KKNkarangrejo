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
      category: "Proker Utama",
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
      category: "Proker Utama",
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
      category: "Proker Tambahan",
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
      category: "Proker Tambahan",
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
      category: "Proker Utama",
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

  newsList: [
    {
      id: "news-1",
      title: "Pemberdayaan & Digitalisasi UMKM Pangan Lokal Resmi Diluncurkan di Karangrejo",
      category: "Liputan Proker",
      author: "Humas KKN Kelompok 3",
      date: "14 Juli 2026",
      readTime: "3 menit",
      summary: "Mahasiswa KKN Kelompok 3 menyelenggarakan workshop perdana branding kemasan kedap udara dan registrasi lokasi Google Maps bersama para pengrajin olahan pangan lokal.",
      coverImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      content: `
### Antusiasme Pelaku UMKM Desa Karangrejo
Kegiatan pengabdian mahasiswa KKN Kelompok 3 di Desa Karangrejo resmi mengawali program kerja klaster ekonomi dengan menggelar pendampingan UMKM. Acara yang berlangsung di Balai Pertemuan Desa ini dihadiri oleh lebih dari 25 pelaku usaha olahan pangan rumahan dan perangkat desa.

### Fokus Program Digitalisasi
1. **Redesain Kemasan & Labeling Modern**: Memberikan identitas visual yang lebih profesional, higienis, dan memuat informasi nilai gizi.
2. **Pendaftaran Google Business & Maps**: Memastikan titik usaha terdeteksi oleh calon pelanggan dan wisatawan luar daerah.
3. **Pemasaran Konten Media Sosial**: Memberikan tutorial praktis pembuatan foto produk menarik hanya dengan kamera smartphone.

Ketua Kelompok KKN menyampaikan bahwa digitalisasi ini diharapkan mampu mengangkat produk lokal Karangrejo agar mampu bersaing di pasar regional Gresik dan sekitarnya.
      `
    },
    {
      id: "news-2",
      title: "Warga Antusias Ikuti Pemeriksaan Kesehatan Gratis & Sosialisasi Gizi Balita",
      category: "Kabar Desa",
      author: "Divisi Kesehatan KKN",
      date: "22 Juli 2026",
      readTime: "4 menit",
      summary: "Bekerjasama dengan tenaga kesehatan desa, posko layanan skrining kesehatan gratis dan konsultasi gizi pencegahan stunting dipadati puluhan balita dan lansia.",
      coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      content: `
### Pelayanan Kesehatan Terintegrasi
Sebagai wujud kepedulian terhadap kualitas hidup masyarakat, mahasiswa KKN Kelompok 3 menggelar aksi sosial pelayanan pemeriksaan kesehatan gratis yang bertempat di balai posyandu.

### Rangkaian Kegiatan Layanan
- **Pemeriksaan Tanda Vital**: Cek tensi darah, gula darah sewaktu, dan asam urat bagi para lansia.
- **Konseling Gizi Balita**: Pengukuran tinggi dan berat badan serta pemberian edukasi menu *Isi Piringku*.
- **Distribusi PMT Tambahan**: Penyerahan paket makanan pendamping bergizi seimbang berbahan baku lokal.

Warga menyambut hangat inisiatif ini karena mempermudah akses cek kesehatan rutin langsung di lingkungan tempat tinggal mereka.
      `
    },
    {
      id: "news-3",
      title: "Ciptakan Lingkungan Bersih, Pelatihan Komposter Rumah Tangga Digelar Bersama Ibu PKK",
      category: "Edukasi & Lingkungan",
      author: "Divisi Lingkungan KKN",
      date: "28 Juli 2026",
      readTime: "3 menit",
      summary: "Inovasi pengolahan limbah dapur menjadi pupuk organik cair disosialisasikan secara langsung dengan metode percontohan komposter ember ember kedap udara.",
      coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      content: `
### Mengatasi Masalah Sampah dari Sumbernya
Pengelolaan sampah rumah tangga menjadi salah satu fokus utama mahasiswa KKN Kelompok 3 di Desa Karangrejo. Dalam rangka menekan volume sampah organik yang terbuang percuma, diselenggarakan pelatihan pembuatan komposter ember sederhana.

### Respon Positif Kader PKK
Ibu-ibu kader PKK mempraktikkan langsung cara mencacah sisa sayuran, menambahkan bioaktivator EM4, dan mengatur sirkulasi komposter agar tidak menimbulkan bau tidak sedap. Hasil cairan fermentasi nantinya dapat dimanfaatkan sebagai pupuk alami tanaman pekarangan warga.
      `
    }
  ],

  modulesList: [
    {
      id: "mod-1",
      title: "Panduan Praktis Pembuatan Kompos Rumah Tangga Tanpa Bau",
      category: "Lingkungan & Pengolahan Limbah",
      author: "Tim Lingkungan KKN Kelompok 3",
      date: "16 Juli 2026",
      fileSize: "2.4 MB (PDF)",
      pages: "12 Halaman",
      summary: "Modul SOP langkah demi langkah mengubah sisa sampah dapur menjadi cairan pupuk organik kaya nutrisi menggunakan bahan sederhana di rumah.",
      coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      content: `
### Bab 1: Urgensi Pengelolaan Sampah Organik
Sampah organik skala rumah tangga mencakup lebih dari 60% total volume limbah harian di pedesaan. Jika ditumpuk tanpa pengolahan, sampah ini berpotensi menimbulkan bau tak sedap dan mengundang bibit penyakit. 

### Bab 2: Alat & Bahan yang Dibutuhkan
1. Ember plastik berukuran 20-30 Liter yang dilengkapi penutup rapat.
2. Botol Bioaktivator EM4 (Tersedia di toko pertanian).
3. Air bersih & Gula merah secukupnya sebagai nutrisi mikroba.
4. Sampah organik dapur (sisa sayuran, kulit buah, sisa nasi - hindari minyak & daging).
5. Sekam padi atau serbuk gergaji kayu untuk penyeimbang kelembaban.

### Bab 3: Langkah-Langkah Pembuatan
1. **Pencacahan**: Cincang sisa sayuran dan kulit buah menjadi ukuran 2-3 cm agar proses pembusukan mikroba berlangsung lebih cepat.
2. **Campuran Larutan EM4**: Larutkan 2 tutup botol EM4 + 1 sendok makan gula merah ke dalam 1 Liter air. Diamkan 15 menit.
3. **Penyusunan Lapisan**: Taburkan serbuk gergaji/sekam di bagian dasar ember (tebal 3 cm), lalu masukkan sampah dapur yang telah dicincang.
4. **Penyemprotan**: Semprotkan larutan EM4 hingga lembab (tidak terlalu basah/berair).
5. **Tutup Rapat**: Tutup rapat komposter dan tempatkan di lokasi teduh yang terhindar dari hujan langsung.

### Bab 4: Perawatan & Panen Pupuk
Kocok atau aduk seminggu sekali. Dalam waktu 3-4 minggu, pupuk komposter akan siap dipanen. Kompos yang matang ditandai dengan warna cokelat kehitaman dan aroma harum mirip tanah segar.
      `
    },
    {
      id: "mod-2",
      title: "Tutorial Digitalisasi Usaha & Google Maps untuk UMKM Desa",
      category: "Ekonomi & Teknologi Digital",
      author: "Tim Ekonomi & IT KKN Kelompok 3",
      date: "20 Juli 2026",
      fileSize: "3.1 MB (PDF)",
      pages: "16 Halaman",
      summary: "Modul tutorial lengkap cara mendaftarkan lokasi toko/usaha ke Google Maps, optimasi profil bisnis, dan pembuatan katalog produk digital.",
      coverImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      content: `
### Bab 1: Mengapa UMKM Wajib Hadir di Google Maps?
Di era digital, calon pembeli atau wisatawan mencari rekomendasi oleh-oleh langsung via smartphone. Jika UMKM Anda terdaftar di Google Maps, pembeli dapat menemukan rute, jam buka, nomor WhatsApp, dan foto produk dalam 1 kali klik.

### Bab 2: Syarat Persiapan
- Smartphone Android/iOS yang terhubung internet.
- Akun Google / Gmail aktif.
- Foto jernih produk & papan nama toko.
- Alamat rinci atau patokan lokasi terdekat.

### Bab 3: Langkah Pendaftaran Praktis
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

  // Alias untuk kompatibilitas data lama
  articlesList: [
    {
      id: "art-1",
      title: "Pemberdayaan & Digitalisasi UMKM Pangan Lokal Resmi Diluncurkan di Karangrejo",
      category: "Liputan Proker",
      author: "Humas KKN Kelompok 3",
      date: "14 Juli 2026",
      summary: "Mahasiswa KKN Kelompok 3 menyelenggarakan workshop branding kemasan kedap udara dan registrasi lokasi Google Maps bersama para pengrajin olahan pangan lokal.",
      coverImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      content: "Mahasiswa KKN Kelompok 3 di Desa Karangrejo resmi mengawali program kerja klaster ekonomi dengan menggelar pendampingan UMKM."
    }
  ],

  teamMembers: [
    {
      id: "tm-1",
      name: "Rizky Ramadhan",
      role: "Ketua Kelompok KKN",
      division: "Ketua",
      major: "Teknik Informatika",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "Memimpin dengan aksi, mengabdi untuk kemajuan Desa Karangrejo, Ujungpangkah, Kabupaten Gresik.",
      instagram: "@rizky.ramadhan",
      email: "rizky.ramadhan@kknkarangrejo.id"
    },
    {
      id: "tm-2",
      name: "Nabila Putri",
      role: "Sekretaris 1",
      division: "Sekretaris",
      major: "Ilmu Komunikasi",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      quote: "Menjalin silaturahmi hangat dan keterbukaan informasi publik bersama warga desa.",
      instagram: "@nabilaputri.id",
      email: "nabila.putri@kknkarangrejo.id"
    },
    {
      id: "tm-3",
      name: "Fajar Pratama",
      role: "Bendahara",
      division: "Bendahara",
      major: "Manajemen Ekonomi",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "Pengelolaan akuntabilitas keuangan pengabdian yang transparan dan efektif.",
      instagram: "@fajarpratama.eco",
      email: "fajar.pratama@kknkarangrejo.id"
    },
    {
      id: "tm-4",
      name: "Siti Aminah",
      role: "Wakil Ketua Kelompok",
      division: "Wakil",
      major: "Kesehatan Masyarakat",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      quote: "Sinergi dan kolaborasi pengabdian untuk kemakmuran masyarakat Karangrejo.",
      instagram: "@siti.aminah_health",
      email: "siti.aminah@kknkarangrejo.id"
    },
    {
      id: "tm-5",
      name: "Dimas Anggara",
      role: "Koordinator Logtrans",
      division: "Logtrans",
      major: "Teknik Lingkungan",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      quote: "Kesiapan logistik dan mobilitas lancar untuk seluruh agenda program kerja desa.",
      instagram: "@dimasanggara_env",
      email: "dimas.anggara@kknkarangrejo.id"
    },
    {
      id: "tm-6",
      name: "Anisa Rahma",
      role: "Koordinator Acara",
      division: "Acara",
      major: "Pendidikan Guru Sekolah Dasar",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      quote: "Merancang rangkaian kegiatan yang berdampak positif dan menyenangkan bagi warga.",
      instagram: "@anisa.rahma_edu",
      email: "anisa.rahma@kknkarangrejo.id"
    },
    {
      id: "tm-7",
      name: "Ahmad Fauzi",
      role: "Koordinator PDD",
      division: "PDD",
      major: "Teknik Informatika",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      quote: "Digitalisasi informasi desa untuk transparansi dan aksesibilitas publik.",
      instagram: "@ahmadfauzi_dev",
      email: "ahmad.fauzi@kknkarangrejo.id"
    },
    {
      id: "tm-8",
      name: "Budi Santoso",
      role: "Anggota Logtrans",
      division: "Logtrans",
      major: "Agribisnis",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      quote: "Mendukung operasional dan perlengkapan kegiatan lapangan secara optimal.",
      instagram: "@budi.santoso_agri",
      email: "budi.santoso@kknkarangrejo.id"
    },
    {
      id: "tm-9",
      name: "Dewi Lestari",
      role: "Koordinator Humas",
      division: "Humas",
      major: "Ilmu Komunikasi",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      quote: "Menjembatani komunikasi yang harmonis antara mahasiswa dan masyarakat Karangrejo.",
      instagram: "@dewilestari_media",
      email: "dewi.lestari@kknkarangrejo.id"
    },
    {
      id: "tm-10",
      name: "Eko Prasetyo",
      role: "Anggota Logtrans",
      division: "Logtrans",
      major: "Teknik Sipil",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      quote: "Menjamin kelengkapan fasilitas teknis pendukung seluruh proker KKN.",
      instagram: "@eko.prasetyo_civil",
      email: "eko.prasetyo@kknkarangrejo.id"
    },
    {
      id: "tm-11",
      name: "Fitri Handayani",
      role: "Koordinator Konsumsi",
      division: "Konsumsi",
      major: "Ilmu Gizi",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      quote: "Menjaga asupan gizi dan konsumsi bergizi seimbang untuk tim dan warga.",
      instagram: "@fitri.nutrition",
      email: "fitri.handayani@kknkarangrejo.id"
    },
    {
      id: "tm-12",
      name: "Gilang Ramadhan",
      role: "Anggota PDD",
      division: "PDD",
      major: "Desain Komunikasi Visual",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
      quote: "Mendesain materi visual dan publikasi kegiatan yang estetik dan informatif.",
      instagram: "@gilang_design",
      email: "gilang.ramadhan@kknkarangrejo.id"
    },
    {
      id: "tm-13",
      name: "Hany Septiani",
      role: "Anggota Acara",
      division: "Acara",
      major: "Pendidikan Bahasa Inggris",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      quote: "Menghadirkan suasana interaktif dan edukatif di setiap agenda pertemuan warga.",
      instagram: "@hany.septiani_english",
      email: "hany.septiani@kknkarangrejo.id"
    },
    {
      id: "tm-14",
      name: "Indra Wijaya",
      role: "Anggota PDD",
      division: "PDD",
      major: "Sistem Informasi",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      quote: "Pengembangan etalase web desa agar potensi Karangrejo dikenal luas.",
      instagram: "@indra.wijaya_is",
      email: "indra.wijaya@kknkarangrejo.id"
    },
    {
      id: "tm-15",
      name: "Julia Kartika",
      role: "Anggota Humas",
      division: "Humas",
      major: "Hubungan Internasional",
      photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      quote: "Menjalin kemitraan dan publikasi kegiatan pengabdian masyarakat.",
      instagram: "@julia.kartika_ir",
      email: "julia.kartika@kknkarangrejo.id"
    },
    {
      id: "tm-16",
      name: "Kevin Kurniawan",
      role: "Anggota Konsumsi",
      division: "Konsumsi",
      major: "Administrasi Bisnis",
      photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
      quote: "Memastikan ketersediaan kebutuhan konsumsi di setiap program kerja berjalan lancar.",
      instagram: "@kevin.kurniawan_biz",
      email: "kevin.kurniawan@kknkarangrejo.id"
    },
    {
      id: "tm-17",
      name: "Larasati Putri",
      role: "Sekretaris 2",
      division: "Sekretaris",
      major: "Psikologi",
      photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
      quote: "Mendukung tertib administrasi, notulensi, dan dokumentasi berkas KKN.",
      instagram: "@larasati.putri_psych",
      email: "larasati.putri@kknkarangrejo.id"
    }
  ]
};
