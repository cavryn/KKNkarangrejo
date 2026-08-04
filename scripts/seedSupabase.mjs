import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const prokerList = [
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
];

const galleryList = [
  {
    id: "gal-1",
    title: "Sosialisasi Pemilahan Sampah bersama Ibu PKK",
    prokercategory: "Lingkungan",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    caption: "Sesi demonstrasi pembuatan pupuk komposter dari sisa dapur di Balai Desa Karangrejo."
  },
  {
    id: "gal-2",
    title: "Pendampingan Labeling Packaging UMKM Lokal",
    prokercategory: "Ekonomi & UMKM",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
    caption: "Perancangan desain kemasan pouch modern tahan lembab untuk produk lokal."
  },
  {
    id: "gal-3",
    title: "Pemeriksaan Kesehatan Posyandu Lansia",
    prokercategory: "Kesehatan",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    caption: "Cek gratis tekanan darah & asam urat lansia Desa Karangrejo."
  },
  {
    id: "gal-4",
    title: "Kelas Bahasa Inggris Ceria Anak SD",
    prokercategory: "Pendidikan",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    caption: "Anak-anak antusias memperagakan kosakata hewan & warna dalam permainan kelompok."
  },
  {
    id: "gal-5",
    title: "Diskusi Koordinasi dengan Kepala Desa Karangrejo",
    prokercategory: "Teknologi",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    caption: "Penyampaian progres program kerja mingguan kepada pimpinan desa."
  }
];

const articlesList = [
  {
    id: "art-1",
    title: "Panduan Praktis Pembuatan Kompos Rumah Tangga Tanpa Bau",
    category: "Lingkungan & Edukasi",
    author: "Tim Lingkungan KKN Kelompok 3",
    date: "16 Juli 2026",
    summary: "Pelajari langkah mudah mengubah sisa sampah dapur menjadi cairan pupuk organik kaya nutrisi menggunakan bahan sederhana di rumah.",
    coverimage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    content: "Pelajari langkah mudah mengubah sisa sampah dapur menjadi cairan pupuk organik kaya nutrisi menggunakan bahan sederhana di rumah."
  },
  {
    id: "art-2",
    title: "Strategi Mendaftarkan Usaha Lokal di Google Maps & Business Profile",
    category: "Ekonomi & Digital",
    author: "Tim Ekonomi & IT KKN Kelompok 3",
    date: "20 Juli 2026",
    summary: "Tutorial step-by-step gratis pendaftaran toko / UMKM desa ke peta digital Google agar mudah ditemukan pelanggan luar kota.",
    coverimage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
    content: "Tutorial step-by-step gratis pendaftaran toko / UMKM desa ke peta digital Google agar mudah ditemukan pelanggan luar kota."
  }
];

async function seed() {
  console.log('Seeding data to Supabase...');

  // 1. Proker
  const { error: pErr } = await supabase.from('proker').upsert(prokerList);
  if (pErr) console.error('Error proker:', pErr.message);
  else console.log('✓ Proker seeded successfully (5 items)');

  // 2. Gallery
  const { error: gErr } = await supabase.from('gallery').upsert(galleryList);
  if (gErr) console.error('Error gallery:', gErr.message);
  else console.log('✓ Gallery seeded successfully (5 items)');

  // 3. Articles
  const { error: aErr } = await supabase.from('articles').upsert(articlesList);
  if (aErr) console.error('Error articles:', aErr.message);
  else console.log('✓ Articles seeded successfully (2 items)');

  console.log('ALL DONE!');
}

seed();
