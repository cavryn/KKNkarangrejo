'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock, BookOpen, MapPin } from 'lucide-react';

// Animated counter hook
function useCountUp(target, duration = 1200, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const numTarget = parseInt(String(target).replace(/\D/g, ''), 10) || 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

function StatCard({ icon: Icon, label, value, color, delay, started }) {
  const numericPart = parseInt(String(value).replace(/\D/g, ''), 10);
  const suffix = String(value).replace(/^[\d]+/, '').trim();
  const count = useCountUp(numericPart, 1400, started);

  return (
    <div
      className="reveal group p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-gold/60 transition-all duration-300 hover:-translate-y-1.5 shadow-card hover:shadow-gold"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <div className="p-2.5 rounded-xl bg-amber-50 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className={`text-3xl font-extrabold ${color} tabular-nums`}>
        {started ? count : 0}
        {suffix && <span className="text-lg font-bold text-slate-400 ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

export default function HeroSection({ villageInfo }) {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Reveal elements
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 80);
    });
    // Start counters after a small delay
    const t = setTimeout(() => setStatsStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { icon: CheckCircle2, label: 'Program Kerja Utama', value: '5 Proker', color: 'text-brand-navy', delay: 0 },
    { icon: Clock, label: 'Total Pengabdian', value: '384 Jam', color: 'text-brand-green', delay: 100 },
    { icon: BookOpen, label: 'Anggota Tim', value: '17 Mahasiswa', color: 'text-brand-gold', delay: 200 },
  ];

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative pt-28 sm:pt-32 pb-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-slate-50 to-blue-50/40" />
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />

      {/* Decorative orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-r from-amber-200/30 via-blue-200/20 to-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-16 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-2xl pointer-events-none animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-48 -left-24 w-80 h-80 bg-blue-500/8 rounded-full blur-2xl pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: Headline & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">

            {/* Location badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 shadow-card text-xs font-bold text-brand-navy">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Kec. Ujungpangkah, Kab. Gresik</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse-gold" />
            </div>

            {/* Main headline */}
            <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.1]">
              Mengabdi Bersama{' '}
              <br className="hidden sm:block" />
              <span className="text-gradient-gold">
                Masyarakat Karangrejo
              </span>
            </h1>

            {/* Subtitle */}
            <p className="reveal reveal-delay-2 text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Dokumentasi terpadu{' '}
              <strong className="text-brand-navy font-bold">5 program kerja</strong>,
              galeri kegiatan, modul edukasi warga, dan profil pengabdian{' '}
              <strong className="text-brand-navy font-bold">17 mahasiswa</strong>{' '}
              KKN Kelompok 3 di {villageInfo?.name || 'Desa Karangrejo'}.
            </p>

            {/* CTA Buttons */}
            <div className="reveal reveal-delay-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#proker"
                id="hero-cta-proker"
                className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-500 hover:to-brand-gold text-white font-bold shadow-gold hover:shadow-gold-lg hover:scale-[1.03] transition-all duration-300"
              >
                <span>Jelajahi Program Kerja</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#tentang"
                id="hero-cta-about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-brand-navy border border-slate-200 hover:border-brand-gold/60 font-bold shadow-card hover:shadow-navy transition-all duration-300"
              >
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Profil Desa & Tim</span>
              </a>
            </div>


          </div>

          {/* Right: Logo Identity Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="reveal reveal-delay-2 relative w-full max-w-sm">
              {/* Glow ring behind card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-300/30 to-blue-200/20 blur-xl transform scale-105" />
              
              <div className="relative p-7 rounded-3xl bg-white border border-slate-200/80 shadow-card-hover space-y-5 animate-float">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-brand-gold uppercase tracking-widest">Identitas Resmi KKN</span>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-brand-gold/10 to-amber-100 text-brand-gold border border-amber-200">
                    Tahun 2026
                  </span>
                </div>

                {/* Logo — using Next.js Image for optimized loading */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-blue-50/50 border border-slate-100 flex items-center justify-center min-h-[160px]">
                  <Image
                    src="/logo/KKN.png"
                    alt="Logo Resmi KKN Kelompok 3 Desa Karangrejo"
                    width={300}
                    height={144}
                    className="max-h-36 w-auto object-contain drop-shadow-md"
                    priority
                  />
                </div>

                <div className="space-y-1 text-center">
                  <h3 className="text-base font-extrabold text-brand-navy">Desa Karangrejo, Ujungpangkah</h3>
                  <p className="text-xs text-slate-400 font-medium italic">"{villageInfo?.motto || 'Maju, Sejahtera, dan Berkelanjutan'}"</p>
                </div>

                {/* Mini stats row */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                  {[
                    { v: '5', l: 'Proker' },
                    { v: '17', l: 'Anggota' },
                    { v: '384', l: 'Jam' },
                  ].map(item => (
                    <div key={item.l} className="text-center py-2 rounded-xl bg-slate-50">
                      <div className="text-lg font-extrabold text-brand-gold">{item.v}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{item.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Stats Bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((item, idx) => (
            <StatCard key={idx} {...item} started={statsStarted} />
          ))}
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
