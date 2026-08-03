'use client';
import { Heart, ArrowUp, ExternalLink } from 'lucide-react';

export default function Footer({ villageInfo }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-brand-navy to-[#071B30] text-white py-14 overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          
          {/* Left Brand with Logo */}
          <div className="flex items-center gap-4 group">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 group-hover:border-brand-gold/40 transition-colors">
              <img 
                src="/logo/KKNteks.png" 
                alt="Logo KKN Karangrejo" 
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => { e.target.src = '/logo/logoonlyKKN.png'; }}
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">KKN Kelompok 3 — Desa Karangrejo</h4>
              <p className="text-xs text-amber-200/60 font-medium">Kecamatan Ujungpangkah, Kabupaten Gresik</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            {[
              { name: 'Beranda', href: '#beranda' },
              { name: 'Tentang Kami', href: '#tentang' },
              { name: 'Program Kerja', href: '#proker' },
              { name: 'Dokumentasi', href: '#dokumentasi' },
              { name: 'Modul Artikel', href: '#artikel' },
              { name: 'Kontak', href: '#kontak' },
            ].map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-brand-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-brand-gold text-white/80 hover:text-white transition-all duration-300 border border-white/10 hover:border-brand-gold hover:shadow-gold hover:scale-110"
            title="Kembali ke Atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 KKN Kelompok 3 {villageInfo.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>untuk Desa Karangrejo, Ujungpangkah, Kabupaten Gresik</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

