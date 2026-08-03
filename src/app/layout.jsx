import './globals.css';

export const metadata = {
  title: 'KKN Kelompok 3 — Desa Karangrejo, Ujungpangkah | Profil & Dokumentasi Proker',
  description: 'Website resmi profil dan dokumentasi program kerja KKN Kelompok 3 di Desa Karangrejo, Kecamatan Ujungpangkah, Kabupaten Gresik. Menyajikan rekap kegiatan, galeri foto, modul artikel edukasi, dan profil kelompok.',
  keywords: ['KKN', 'Kelompok 3', 'Desa Karangrejo', 'Ujungpangkah', 'Gresik', 'Program Kerja KKN', 'Dokumentasi KKN', 'Profil KKN'],
  authors: [{ name: 'Tim KKN Kelompok 3 Desa Karangrejo' }],
  openGraph: {
    title: 'KKN Kelompok 3 — Desa Karangrejo, Ujungpangkah, Kabupaten Gresik',
    description: 'Etalase digital & dokumentasi program kerja KKN Kelompok 3 di Desa Karangrejo, Kecamatan Ujungpangkah, Kabupaten Gresik.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-brand-navy antialiased min-h-screen selection:bg-brand-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
