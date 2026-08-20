'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Award, GraduationCap, ArrowRight } from 'lucide-react';

export default function AboutSection({ villageInfo, teamMembers }) {
  const sectionRef = useRef(null);
  const [mapVisible, setMapVisible] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 70);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lazy load Google Maps iframe only when map container is visible
  useEffect(() => {
    const mapObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          mapObs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (mapContainerRef.current) mapObs.observe(mapContainerRef.current);
    return () => mapObs.disconnect();
  }, []);

  const DIVISION_ORDER = [
    'Ketua',
    'Wakil',
    'Bendahara',
    'Sekretaris',
    'Humas',
    'Acara',
    'Konsumsi',
    'Logtrans',
    'PDD',
  ];

  const sortedMembers = [...(teamMembers || [])].sort((a, b) => {
    const rankA = DIVISION_ORDER.indexOf(a.division);
    const rankB = DIVISION_ORDER.indexOf(b.division);
    const safeA = rankA !== -1 ? rankA : 999;
    const safeB = rankB !== -1 ? rankB : 999;
    return safeA - safeB;
  });

  return (
    <section id="tentang" ref={sectionRef} className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background subtle dot */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Tentang <span className="text-gradient-gold">KKN Kelompok 3</span>
          </h2>
          <p className="text-base text-slate-500">
            Mengenal lokasi pengabdian di Desa Karangrejo, Kecamatan Ujungpangkah, Kabupaten Gresik dan susunan anggota tim 17 mahasiswa KKN.
          </p>
        </div>

        {/* 2 Column Profile & Map */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Village Profile */}
          <div className="lg:col-span-6 space-y-6">
            <div className="reveal p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-100 text-brand-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">Profil Desa Karangrejo</h3>
                  <p className="text-xs font-semibold text-slate-400">Kec. Ujungpangkah, Kab. Gresik</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {villageInfo?.description}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-brand-navy">
                <Award className="w-4 h-4 text-brand-gold" />
                <span>Motto: &quot;{villageInfo?.motto}&quot;</span>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps */}
          <div className="lg:col-span-6">
            <div ref={mapContainerRef} className="reveal rounded-3xl overflow-hidden border border-slate-200 shadow-card h-80 relative bg-slate-100">
              {mapVisible ? (
                <iframe
                  title="Peta Lokasi Desa Karangrejo Gresik"
                  src="https://maps.google.com/maps?q=Karangrejo,+Ujungpangkah,+Gresik,+Jawa+Timur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">
                  Memuat peta lokasi...
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="text-xs text-slate-500 font-medium">📍 Desa Karangrejo, Ujungpangkah, Gresik</span>
              <a
                href="https://maps.google.com/?q=Desa+Karangrejo+Ujungpangkah+Gresik"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-brand-gold hover:underline"
              >
                Buka Google Maps &rarr;
              </a>
            </div>
          </div>

        </div>

        {/* Team Members Grid */}
        <div id="anggota" className="pt-12 scroll-mt-24">
          <div className="reveal text-center mb-10">
            <h3 className="text-2xl font-extrabold text-brand-navy mb-2">Anggota Tim Kelompok 3 <span className="text-brand-gold">(17 Mahasiswa)</span></h3>
            <p className="text-sm text-slate-500">Mahasiswa dari berbagai jurusan yang berkolaborasi untuk Desa Karangrejo, Ujungpangkah, Kabupaten Gresik.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMembers.map((member, idx) => (
              <div 
                key={member.id}
                className="reveal p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-gold/50 transition-all duration-300 hover:-translate-y-1.5 group shadow-card hover:shadow-gold"
                style={{ transitionDelay: `${(idx % 3) * 60}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-offset-2 ring-brand-gold/30 group-hover:ring-brand-gold transition-all duration-300">
                    <Image 
                      src={member.photo} 
                      alt={member.name}
                      fill
                      sizes="56px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs font-bold text-brand-gold mb-0.5">{member.role}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <GraduationCap className="w-3 h-3 text-brand-navy" />
                      <span>{member.major}</span>
                    </div>
                  </div>
                </div>

                {member.quote && (
                  <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200">
                    &quot;{member.quote}&quot;
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button to Full 17 Members Page */}
          <div className="reveal text-center mt-10">
            <Link
              href="/anggota"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-500 hover:to-brand-gold text-white font-extrabold text-sm shadow-gold hover:shadow-gold-lg hover:scale-[1.03] transition-all duration-300 btn-shimmer"
            >
              <span>Lihat Seluruh 17 Anggota Tim KKN</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
