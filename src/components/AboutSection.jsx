'use client';
import { MapPin, Award, GraduationCap } from 'lucide-react';

export default function AboutSection({ villageInfo, teamMembers }) {
  return (
    <section id="tentang" className="py-20 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Tentang <span className="text-brand-gold">KKN Kelompok 3</span>
          </h2>
          <p className="text-base text-slate-600">
            Mengenal lokasi pengabdian di Desa Karangrejo, Kecamatan Ujungpangkah, Kabupaten Gresik dan susunan anggota tim 17 mahasiswa KKN.
          </p>
        </div>

        {/* Village & KKN Overview Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          {/* Card Profil Desa */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 relative overflow-hidden group hover:border-brand-gold/50 transition-all shadow-sm hover:shadow-md">
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
                <span className="text-sm font-bold text-brand-navy">"{villageInfo.motto}"</span>
              </div>
              <Award className="w-6 h-6 text-brand-gold" />
            </div>
          </div>

          {/* Card Peta Desa & Lokasi */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-2 overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                title="Peta Desa Karangrejo Ujungpangkah Gresik"
                src="https://maps.google.com/maps?q=Karangrejo,+Ujungpangkah,+Gresik,+Jawa+Timur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              ></iframe>
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
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-brand-navy mb-2">Anggota Tim Kelompok 3 (17 Mahasiswa)</h3>
            <p className="text-sm text-slate-600">Mahasiswa dari berbagai jurusan yang siap berkolaborasi untuk Karangrejo, Ujungpangkah, Kabupaten Gresik.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-gold/50 transition-all hover:-translate-y-1 group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-gold/40 group-hover:border-brand-gold transition-colors">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                    "{member.quote}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
