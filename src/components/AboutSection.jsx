'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Award, GraduationCap, Users, ArrowRight } from 'lucide-react';

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

  return (
    <section id="tentang" ref={sectionRef} className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background subtle dot */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Tim KKN Kelompok 3</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Tentang <span className="text-gradient-gold">KKN Kelompok 3</span>
          </h2>
          <p className="text-base text-slate-500">
            Mengenal lokasi pengabdian di Desa Karangrejo, Kecamatan Ujungpangkah, Kabupaten Gresik dan susunan anggota tim 17 mahasiswa KKN.
          </p>
        </div>

        {/* Village & KKN Overview Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          {/* Card Profil Desa */}
          <div className="reveal p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200 relative overflow-hidden group hover:border-brand-gold/50 transition-all duration-300 shadow-card hover:shadow-gold">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <MapPin className="w-32 h-32 text-brand-navy" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100/70 text-brand-navy text-xs font-bold mb-4">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>{villageInfo.location}</span>
            </div>

            <h3 className="text-2xl font-bold text-brand-navy mb-3">
              {villageInfo.name}
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
              {villageInfo.description}
            </p>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Slogan Desa</span>
                <span className="text-sm font-bold text-brand-navy">&quot;{villageInfo.motto}&quot;</span>
              </div>
              <Award className="w-6 h-6 text-brand-gold" />
            </div>
          </div>

          {/* Card Peta Desa & Lokasi — lazy loaded Google Maps */}
          <div className="reveal reveal-delay-1 rounded-3xl bg-slate-50 border border-slate-200 p-2 overflow-hidden flex flex-col justify-between shadow-card">
            <div ref={mapContainerRef} className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200">
              {mapVisible ? (
                <iframe
                  title="Peta Desa Karangrejo Ujungpangkah Gresik"
                  src="https://maps.google.com/maps?q=Karangrejo,+Ujungpangkah,+Gresik,+Jawa+Timur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <div className="text-center space-y-2">
                    <MapPin className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-sm font-medium">Memuat peta...</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 flex items-center justify-between bg-white rounded-xl mt-2 border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-gold animate-ping"></div>
                <span className="text-xs sm:text-sm font-bold text-brand-navy">Posko Utama KKN Kelompok 3</span>
              </div>
              <a
                href="https://maps.google.com/?q=Karangrejo+Ujungpangkah+Gresik"
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
        <div>
          <div className="reveal text-center mb-10">
            <h3 className="text-2xl font-extrabold text-brand-navy mb-2">Anggota Tim Kelompok 3 <span className="text-brand-gold">(17 Mahasiswa)</span></h3>
            <p className="text-sm text-slate-500">Mahasiswa dari berbagai jurusan yang berkolaborasi untuk Desa Karangrejo, Ujungpangkah, Kabupaten Gresik.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
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
