import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

// Self-hosted & subsetted Google Fonts — eliminates render-blocking external requests
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'KKN Kelompok 3 — Desa Karangrejo, Ujungpangkah | Profil & Dokumentasi Proker',
  description: 'Website resmi profil dan dokumentasi program kerja KKN Kelompok 3 di Desa Karangrejo, Kecamatan Ujungpangkah, Kabupaten Gresik. Menyajikan rekap kegiatan, galeri foto, modul artikel edukasi, dan profil kelompok.',
  keywords: ['KKN', 'Kelompok 3', 'Desa Karangrejo', 'Ujungpangkah', 'Gresik', 'Program Kerja KKN', 'Dokumentasi KKN', 'Profil KKN'],
  authors: [{ name: 'Tim KKN Kelompok 3 Desa Karangrejo' }],
  icons: {
    icon: [
      { url: '/logo/logoonlyKKN.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/logo/logoonlyKKN.png',
    apple: '/logo/logoonlyKKN.png',
  },
  openGraph: {
    title: 'KKN Kelompok 3 — Desa Karangrejo, Ujungpangkah, Kabupaten Gresik',
    description: 'Etalase digital & dokumentasi program kerja KKN Kelompok 3 di Desa Karangrejo, Kecamatan Ujungpangkah, Kabupaten Gresik.',
    images: ['/logo/KKN.png'],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="bg-slate-50 text-brand-navy antialiased min-h-screen selection:bg-brand-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
