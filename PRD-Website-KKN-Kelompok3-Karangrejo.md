# PRD (Product Requirements Document)
## Website Profil KKN Kelompok 3 — Desa Karangrejo

**Versi:** 1.0
**Tanggal:** 28 Juli 2026
**Disusun untuk:** Tim KKN Kelompok 3, Desa Karangrejo

---

## 1. Latar Belakang

Kelompok 3 KKN yang bertugas di Desa Karangrejo membutuhkan sebuah website profil untuk mendokumentasikan seluruh program kerja (proker) yang telah dan sedang dijalankan selama masa KKN. Website ini akan menjadi etalase digital yang menampilkan kegiatan, dokumentasi, dan modul/artikel hasil proker kepada dosen pembimbing, pihak desa, kampus, maupun masyarakat umum — mirip dengan website profil perusahaan (seperti Grab, Traveloka) namun disesuaikan untuk konteks KKN.

## 2. Tujuan Produk

- Menjadi pusat informasi resmi dan terpusat tentang seluruh proker Kelompok 3 KKN Karangrejo.
- Mendokumentasikan kegiatan secara visual (foto, cerita) agar mudah diakses dan dinilai oleh dosen pembimbing lapangan (DPL) maupun pihak kampus.
- Membagikan modul/hasil proker (materi edukasi, panduan, dsb.) dalam bentuk artikel web agar bisa dimanfaatkan masyarakat Desa Karangrejo maupun kelompok KKN lain di masa depan.
- Menampilkan citra kelompok secara profesional melalui desain modern, dark, dan elegan.

## 3. Target Pengguna

| Pengguna | Kebutuhan |
|---|---|
| Dosen Pembimbing Lapangan (DPL) / Kampus | Melihat rekap & bukti pelaksanaan proker |
| Masyarakat Desa Karangrejo | Mengakses modul/edukasi hasil proker |
| Anggota Kelompok 3 | Media dokumentasi & portofolio bersama |
| Pengunjung umum / KKN angkatan berikutnya | Referensi program kerja |

## 4. Ruang Lingkup

**Termasuk (in-scope):**
- Landing page profil kelompok
- Daftar & detail program kerja (proker)
- Halaman dokumentasi (galeri kegiatan)
- Modul/artikel hasil proker (konten langsung di web, bukan file unduhan)
- Halaman tentang kelompok & desa
- Halaman kontak/sosial media

**Tidak termasuk (out-of-scope) untuk versi awal:**
- Sistem login/akun untuk masyarakat
- Fitur komentar atau forum diskusi
- Multi-bahasa (cukup Bahasa Indonesia)

## 5. Struktur Halaman (Sitemap)

1. **Beranda (Home)** — Hero section dengan foto kelompok/background, ringkasan singkat, highlight proker unggulan, statistik singkat (jumlah proker, jumlah anggota, dsb.)
2. **Tentang Kami** — Profil kelompok, profil Desa Karangrejo, daftar anggota
3. **Program Kerja (Proker)** — Daftar seluruh proker (kartu/grid), tiap proker punya halaman detail (latar belakang, tujuan, pelaksanaan, hasil)
4. **Dokumentasi** — Galeri foto/video kegiatan, bisa dikelompokkan per proker atau per tanggal
5. **Modul & Artikel** — Daftar artikel hasil proker (edukasi/panduan), tiap artikel punya halaman baca penuh
6. **Kontak** — Info kontak kelompok, media sosial, lokasi desa (opsional peta)

## 6. Fitur Utama

- **Landing page dinamis** dengan animasi saat scroll (fade-in, slide-up) untuk tiap section
- **Grid/kartu proker** yang bisa difilter (misal: berdasarkan kategori: pendidikan, lingkungan, kesehatan, ekonomi, dll.)
- **Galeri dokumentasi** dengan lightbox (foto bisa diperbesar saat diklik)
- **Halaman artikel/modul** dengan format rapi (heading, gambar, teks) untuk konten edukasi
- **Navigasi sticky/dark navbar** dengan efek transisi saat scroll
- **Responsive design** — tampil baik di HP maupun desktop, karena banyak diakses lewat WhatsApp share
- **Panel admin sederhana** untuk tim menambah/mengedit proker, dokumentasi, dan artikel tanpa perlu coding (mengingat ini akan dikelola tim mahasiswa non-developer setelah website jadi)

## 7. Kebutuhan Desain (UI/UX)

- **Tema:** Dark mode, clean, minimalis
- **Palet warna:** Dominan gelap (hitam/abu gelap) dipadukan **hijau** (aksen tombol, ikon, highlight) dan **cream** (teks sekunder, elemen kontras lembut)
- **Hero background:** Foto kelompok/kegiatan sebagai background dengan overlay gelap agar teks tetap terbaca (gaya profile web seperti Grab/Traveloka)
- **Tipografi:** Font modern, sans-serif, jelas dibaca di layar dark
- **Animasi:** Scroll-reveal animation, hover effect pada kartu proker, smooth transition antar halaman/section
- **Konsistensi:** Setiap halaman detail (proker, artikel) mengikuti template yang sama agar terlihat rapi dan seragam

## 8. Rekomendasi Tech Stack

Karena rencana deploy di **Vercel**, rekomendasi saya menyesuaikan (Vercel dioptimalkan untuk framework JavaScript/Node, bukan PHP/Laravel):

| Komponen | Rekomendasi | Alasan |
|---|---|---|
| Framework | Next.js (React) | Native support di Vercel, deploy tinggal push ke Git, gratis untuk skala proyek KKN |
| Styling | Tailwind CSS | Cocok untuk dark theme custom (hijau+cream), ringan, gampang dipadukan animasi |
| Animasi | Framer Motion | Library animasi standar untuk Next.js, halus untuk scroll-reveal & transisi antar section |
| Data proker/dokumentasi/artikel | MDX/JSON di repo (tanpa database), atau Sanity/Contentful (headless CMS gratis) jika ingin tim non-developer bisa update konten sendiri lewat dashboard | Vercel tidak menyediakan database persisten bawaan, jadi lebih praktis pakai CMS headless daripada MySQL |
| Gambar/dokumentasi | Next.js Image + penyimpanan di Cloudinary atau folder `public/` repo | Otomatis dikompres, ringan saat loading |

*Catatan: opsi Laravel tetap bisa dipakai kalau nanti berubah pikiran dan hosting di server PHP biasa (Niagahoster/Hostinger), tapi untuk Vercel, Next.js adalah pilihan yang paling langsung compatible.*

## 9. Konten yang Perlu Disiapkan Tim

- Foto kelompok berkualitas tinggi untuk hero background
- Daftar & deskripsi lengkap setiap proker (tujuan, sasaran, hasil, tanggal pelaksanaan)
- Foto/video dokumentasi tiap kegiatan
- Draft artikel/modul hasil proker (misalnya: panduan yang dibuat untuk warga)
- Data profil desa & anggota kelompok

## 10. Kebutuhan Non-Fungsional

- **Responsive**: wajib tampil baik di mobile (mayoritas pengunjung dari HP)
- **Kecepatan**: gambar dikompres agar loading tidak berat meski banyak foto
- **Kemudahan update**: tim bisa menambah proker/dokumentasi baru tanpa bantuan developer setelah serah terima
- **SEO dasar**: judul halaman & deskripsi jelas agar mudah ditemukan saat dicari nama desa/kelompok

## 11. Kriteria Selesai (Definition of Done)

- Seluruh halaman di sitemap (Section 5) sudah bisa diakses dan responsif
- Minimal seluruh proker yang sudah berjalan sudah terdata di website
- Admin panel bisa dipakai tim untuk CRUD proker, dokumentasi, dan artikel
- Desain dark + hijau + cream + animasi scroll sudah konsisten di semua halaman
- Website sudah live di Vercel dan dapat diakses publik sebelum masa KKN berakhir

---

*Dokumen ini dapat disesuaikan lagi setelah diskusi tim mengenai jumlah proker, kapasitas developer, dan tenggat waktu KKN.*
