'use client';
import { ArrowRight, CheckCircle2, Clock, BookOpen, MapPin } from 'lucide-react';

export default function HeroSection({ villageInfo }) {
  const stats = [
    { icon: CheckCircle2, label: 'Program Kerja Utama', value: '5 Proker', color: 'text-brand-navy' },
    { icon: Clock, label: 'Total Pengabdian', value: '16 Hari (384 Jam)', color: 'text-brand-green' },
    { icon: BookOpen, label: 'Anggota Tim', value: '17 Mahasiswa', color: 'text-brand-gold' },
  ];

  return (
    <section id="beranda" className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-amber-500/10 via-slate-50 to-white">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-amber-200/40 via-blue-200/30 to-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 -right-20 w-80 h-80 bg-amber-400/15 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Mengabdi Bersama <br />
              <span className="bg-gradient-to-r from-brand-gold via-amber-600 to-brand-navy bg-clip-text text-transparent">
                Masyarakat Karangrejo
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Dokumentasi terpadu 5 program kerja utama, galeri kegiatan, modul edukasi warga, dan profil pengabdian 17 mahasiswa KKN Kelompok 3 di {villageInfo?.name || 'Desa Karangrejo'}, Kecamatan Ujungpangkah, Kabupaten Gresik.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#proker"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold shadow-lg shadow-brand-gold/25 hover:scale-105 transition-all"
              >
                <span>Jelajahi Program Kerja</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#tentang"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-brand-navy border border-slate-300 font-bold shadow-sm hover:border-brand-navy transition-all"
              >
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Profil Desa & Tim</span>
              </a>
            </div>

          </div>

          {/* Right Column: Featured Logo Branding Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Identitas Resmi KKN</span>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-brand-gold border border-amber-200">
                  Tahun 2026
                </span>
              </div>

              {/* Large Logo Display */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 to-blue-50/30 border border-slate-100 flex items-center justify-center">
                <img 
                  src="/logo/KKN.png" 
                  alt="Logo Resmi KKN Kelompok 3 Desa Karangrejo" 
                  className="max-h-48 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.src = '/logo/KKNteks.png'; }}
                />
              </div>

              <div className="space-y-2 text-center">
                <h3 className="text-lg font-bold text-brand-navy">Desa Karangrejo, Ujungpangkah</h3>
                <p className="text-xs text-slate-500 font-medium">"{villageInfo?.motto || 'Maju, Sejahtera, dan Berkelanjutan'}"</p>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Metrics Cards Bar (3 Cards) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-gold/50 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <div className="p-2.5 rounded-xl bg-amber-50 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className={`text-2xl sm:text-3xl font-extrabold ${item.color}`}>
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
