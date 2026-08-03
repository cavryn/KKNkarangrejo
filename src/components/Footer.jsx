'use client';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({ villageInfo }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy text-white py-12 relative border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-700/80">
          
          {/* Left Brand with Logo */}
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <img 
                src="/logo/KKNteks.png" 
                alt="Logo KKN Karangrejo" 
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => { e.target.src = '/logo/logoonlyKKN.png'; }}
              />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">KKN Kelompok 3 — Desa Karangrejo</h4>
              <p className="text-xs text-amber-200/80 font-medium">Kecamatan Ujungpangkah, Kabupaten Gresik</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold">
            <a href="#beranda" className="hover:text-brand-gold transition-colors">Beranda</a>
            <a href="#tentang" className="hover:text-brand-gold transition-colors">Tentang Kami</a>
            <a href="#proker" className="hover:text-brand-gold transition-colors">Program Kerja</a>
            <a href="#dokumentasi" className="hover:text-brand-gold transition-colors">Dokumentasi</a>
            <a href="#artikel" className="hover:text-brand-gold transition-colors">Modul Artikel</a>
            <a href="#kontak" className="hover:text-brand-gold transition-colors">Kontak</a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/10 hover:bg-brand-gold text-white transition-all border border-white/20 shadow-md"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© 2026 KKN Kelompok 3 {villageInfo.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
            <span>untuk Desa Karangrejo, Ujungpangkah, Kabupaten Gresik</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
