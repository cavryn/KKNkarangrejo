# Website Profil KKN Kelompok 3 — Desa Karangrejo, Ujungpangkah, Kabupaten Gresik

Website profil dan repositori dokumentasi program kerja resmi untuk **KKN Kelompok 3 Desa Karangrejo**, Kecamatan Ujungpangkah, Kabupaten Gresik, Jawa Timur. Built dengan **Next.js 14**, **Tailwind CSS** (Light Theme diselaraskan dengan logo KKN), **Lucide Icons**, dan integrasi **Supabase Database & Storage**.

---

## 🌟 Fitur Utama

- **Hero Banner & Metrik Pengabdian**: Menampilkan identitas visual logo KKN, 5 Program Kerja Utama, 16 Hari (384 Jam) Total Pengabdian, dan 17 Anggota Tim Mahasiswa.
- **Profil Desa & Peta Interaktif**: Profil singkat Desa Karangrejo (Kec. Ujungpangkah), motto desa, peta Google Maps interaktif, dan kartu anggota tim KKN.
- **Katalog Program Kerja (Proker)**: Grid kartu proker dengan filter kategori (*Ekonomi & UMKM, Lingkungan, Pendidikan, Kesehatan, Teknologi*), pencarian interaktif, serta modal detail proker.
- **Galeri Dokumentasi & Lightbox**: Galeri foto kegiatan dengan filter kategori proker dan modal *Lightbox* (zoom & slideshow).
- **Modul & Artikel Edukasi**: Artikel panduan hasil proker (contoh: *Pembuatan Kompos*, *Branding UMKM Google Maps*) dengan mode baca *Reader Modal*.
- **Formulir Kontak & Direct WhatsApp**: Formulir pesan warga/pengunjung serta tombol pesan instan langsung ke WhatsApp Ketua KKN.
- **Panel Admin Tersembunyi (`/admin`)**: Halaman dashboard khusus untuk menambah, mengubah, atau menghapus data Proker dan Galeri Foto tanpa menampilkan tombol admin di navigasi umum.

---

## 🎨 Palet Warna Desain (Diselaraskan dengan Logo KKN)

- **Primary Ochre Gold (`#DE9227`)**: Warna tombol utama, badge highlight, dan aksen brand.
- **Deep Navy Blue (`#0E2B4C`)**: Warna teks judul utama, navbar, dan footer.
- **Forest Green (`#2A614A`)**: Aksen status proker selesai dan kategori lingkungan.
- **Light Theme Slate (`#F8FAFC` & `#FFFFFF`)**: Latar belakang bersih dan terang dengan kontras yang nyaman dibaca di perangkat seluler maupun desktop.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Custom color design system)
- **Icons**: Lucide React (`lucide-react`)
- **Database & Storage**: Supabase (`@supabase/supabase-js`) dengan *graceful local fallback*
- **Fonts**: Google Fonts (*Plus Jakarta Sans*)

---

## 🚀 Cara Menjalankan Secara Lokal

### 1. Prasyarat
Pastikan Node.js (v18.x atau lebih baru) dan npm sudah terinstal pada komputer Anda.

### 2. Instalasi Dependencies
```bash
npm install
```

### 3. Jalankan Dev Server
```bash
npm run dev
```
Buka browser dan akses **`http://localhost:3000`**.

---

## 🔐 Akses Panel Admin Tersembunyi

Panel Admin dibuat terpisah dan tidak dimunculkan pada navigasi publik:
- **URL Panel Admin**: **`http://localhost:3000/admin`**

Pada halaman ini, tim KKN dapat mengunggah foto dokumentasi kegiatan baru dan mengelola program kerja secara instan.

---

## ☁️ Integrasi Supabase (Opsional)

Jika ingin menghubungkan ke database Supabase persisten:
1. Buat file `.env.local` pada direktori utama proyek.
2. Tambahkan kredensial Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
*(Jika `.env.local` tidak diisi, aplikasi akan otomatis berjalan dalam mode fallback data lokal tanpa menghentikan sistem).*

---

## 📦 Deploy ke Vercel

Aplikasi ini sudah dioptimalkan untuk di-deploy ke Vercel dalam 1-klik:
1. Push repository ini ke GitHub.
2. Impor repositori pada dashboard [Vercel](https://vercel.com).
3. Klik **Deploy**!

---

*Dibuat dengan ❤️ oleh Tim KKN Kelompok 3 Desa Karangrejo, Ujungpangkah, Kabupaten Gresik.*
# KKNkarangrejo
