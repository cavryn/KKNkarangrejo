'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Search, GraduationCap, Instagram, Mail, X, Sparkles, Award, Heart, MapPin, CheckCircle2 } from 'lucide-react';
import { INITIAL_DATA } from '@/data/initialData';
import Footer from '@/components/Footer';

import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = useState(INITIAL_DATA.teamMembers || []);
  const [villageInfo] = useState(INITIAL_DATA.villageInfo || {});
  const [selectedDivision, setSelectedDivision] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalMember, setActiveModalMember] = useState(null);

  useEffect(() => {
    // 1. Read from localStorage for local mode edits from Admin
    try {
      const localTeam = localStorage.getItem('kkn_team_list');
      if (localTeam) setTeamMembers(JSON.parse(localTeam));
    } catch (e) {
      console.warn("Gagal membaca cache localStorage tim:", e);
    }

    // 2. Fetch Live Data from Supabase if Configured
    async function loadTeamData() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
        if (data && !error) {
          setTeamMembers(data);
          localStorage.setItem('kkn_team_list', JSON.stringify(data));
        }
      } catch (err) {
        console.warn("Sinkronisasi Supabase tim error:", err);
      }
    }
    loadTeamData();
  }, []);

  const divisions = [
    'Semua',
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

  const getDivisionRank = (div) => {
    const idx = DIVISION_ORDER.indexOf(div);
    return idx !== -1 ? idx : 999;
  };

  const filteredMembers = [...teamMembers]
    .filter((member) => {
      const matchesDivision = selectedDivision === 'Semua' || member.division === selectedDivision;
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.division && member.division.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDivision && matchesSearch;
    })
    .sort((a, b) => {
      const rankA = getDivisionRank(a.division);
      const rankB = getDivisionRank(b.division);
      if (rankA !== rankB) return rankA - rankB;
      return 0;
    });

  return (
    <main className="min-h-screen bg-slate-50 text-brand-navy relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-r from-amber-200/30 via-blue-200/20 to-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3.5 shadow-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-amber-50 text-brand-navy hover:text-brand-gold font-bold text-xs sm:text-sm border border-slate-200 hover:border-amber-300 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-3">
            <img
              src="/logo/KKNteks.png"
              alt="Logo KKN"
              className="h-9 w-auto object-contain"
              onError={(e) => { e.target.src = '/logo/logoonlyKKN.png'; }}
            />
            <span className="hidden md:inline-block text-xs font-extrabold text-brand-navy border-l border-slate-200 pl-3">
              17 Mahasiswa Pengabdi KKN
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="pt-32 pb-14 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-tight">
            Tim <span className="text-gradient-gold">17 Mahasiswa</span> KKN Kelompok 3
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Mengenal seluruh anggota tim pengabdi masyarakat di <strong className="text-brand-navy font-bold">Desa Karangrejo</strong>, Kecamatan Ujungpangkah, Kabupaten Gresik. Berasal dari berbagai disiplin ilmu yang berkolaborasi dalam 5 program kerja utama.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-gold">17</div>
              <div className="text-xs font-semibold text-slate-400">Mahasiswa Pengabdi</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-navy">{divisions.length - 1}</div>
              <div className="text-xs font-semibold text-slate-400">Divisi Pengabdian</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-green">16 Hari</div>
              <div className="text-xs font-semibold text-slate-400">Durasi (384 Jam)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">5</div>
              <div className="text-xs font-semibold text-slate-400">Program Kerja Utama</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search Bar */}
      <section className="pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-card">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama, jurusan, atau posisi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-brand-navy text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs font-bold text-slate-500">
              Menampilkan <span className="text-brand-gold font-extrabold text-sm">{filteredMembers.length}</span> dari {teamMembers.length} Anggota
            </div>
          </div>

          {/* Division Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {divisions.map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                  selectedDivision === div
                    ? 'bg-gradient-to-r from-brand-gold to-amber-500 text-white shadow-gold'
                    : 'bg-white text-brand-navy hover:text-brand-gold hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Cards Grid */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-card space-y-4">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-brand-navy">Tidak ada anggota yang ditemukan</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Coba kata kunci pencarian lain atau ganti filter divisi di atas.
              </p>
              <button
                onClick={() => { setSelectedDivision('Semua'); setSearchQuery(''); }}
                className="px-5 py-2.5 rounded-full bg-brand-navy text-white text-xs font-bold shadow-md hover:bg-brand-navyHover"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member, idx) => (
                <div
                  key={member.id}
                  onClick={() => setActiveModalMember(member)}
                  className="group relative bg-white rounded-3xl border border-slate-200 hover:border-brand-gold/60 p-6 shadow-card hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Member Photo & Division Badge */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-amber-100 group-hover:ring-brand-gold transition-all duration-300 shadow-md">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="px-3 py-1 text-[11px] font-extrabold rounded-full bg-amber-50 text-brand-gold border border-amber-200 mb-1">
                          #{idx + 1}
                        </span>
                        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {member.division || 'Anggota Tim'}
                        </span>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="space-y-2 mb-4">
                      <h3 className="text-xl font-extrabold text-brand-navy group-hover:text-brand-gold transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                        {member.role}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-brand-navy flex-shrink-0" />
                        <span>{member.major}</span>
                      </div>
                    </div>

                    {/* Quote Box */}
                    {member.quote && (
                      <p className="text-xs text-slate-600 italic bg-slate-50 group-hover:bg-amber-50/50 p-3.5 rounded-2xl border border-slate-100 group-hover:border-amber-200 transition-colors line-clamp-3 leading-relaxed">
                        "{member.quote}"
                      </p>
                    )}
                  </div>

                  {/* Actions & Social Handles */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium group-hover:text-brand-gold transition-colors flex items-center gap-1">
                      <span>Lihat Profil Detail</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>

                    {member.instagram && (
                      <span className="p-2 rounded-xl bg-slate-100 group-hover:bg-brand-gold group-hover:text-white text-slate-600 transition-colors">
                        <Instagram className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Member Profile Modal */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 animate-scale-in">
            {/* Modal Header Banner */}
            <div className="relative h-44 bg-gradient-to-r from-brand-navy via-brand-navyHover to-amber-600 p-6 flex items-end justify-between">
              <button
                onClick={() => setActiveModalMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-brand-navy transition-all border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-white space-y-1">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-amber-200">
                  {activeModalMember.division || 'Anggota Tim KKN'}
                </span>
              </div>
            </div>

            {/* Profile Avatar Overlay */}
            <div className="px-6 sm:px-8 -mt-14 relative z-10 flex items-end justify-between">
              <div className="w-28 h-28 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl bg-white">
                <img
                  src={activeModalMember.photo}
                  alt={activeModalMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pb-2">
                <span className="px-3 py-1 rounded-xl bg-amber-50 text-brand-gold border border-amber-200 text-xs font-extrabold">
                  KKN Gresik 2026
                </span>
              </div>
            </div>

            {/* Profile Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                  {activeModalMember.name}
                </h2>
                <p className="text-sm font-bold text-brand-gold uppercase tracking-wider mt-1">
                  {activeModalMember.role}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-2">
                  <GraduationCap className="w-4 h-4 text-brand-navy" />
                  <span>Program Studi {activeModalMember.major}</span>
                </div>
              </div>

              {/* Quote Card */}
              {activeModalMember.quote && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-brand-navy text-xs sm:text-sm font-medium leading-relaxed italic">
                  "{activeModalMember.quote}"
                </div>
              )}

              {/* Detail Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold block mb-0.5">Lokasi Pengabdian</span>
                  <span className="text-brand-navy font-extrabold">Desa Karangrejo</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold block mb-0.5">Kecamatan / Kab.</span>
                  <span className="text-brand-navy font-extrabold">Ujungpangkah, Gresik</span>
                </div>
              </div>

              {/* Social Contact Links */}
              <div className="space-y-3 pt-2">
                {activeModalMember.instagram && (
                  <a
                    href={`https://instagram.com/${activeModalMember.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 hover:bg-amber-50 text-brand-navy hover:text-brand-gold border border-slate-200 hover:border-amber-300 font-bold text-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>{activeModalMember.instagram}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Buka Instagram &rarr;</span>
                  </a>
                )}

                {activeModalMember.email && (
                  <a
                    href={`mailto:${activeModalMember.email}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 hover:bg-blue-50 text-brand-navy hover:text-blue-700 border border-slate-200 hover:border-blue-300 font-bold text-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>{activeModalMember.email}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Kirim Email &rarr;</span>
                  </a>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setActiveModalMember(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-xs shadow-md"
                >
                  Tutup Profil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer villageInfo={villageInfo} />
    </main>
  );
}
