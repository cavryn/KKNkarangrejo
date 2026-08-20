'use client';
import { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Send, MessageSquare, CheckCircle2, Instagram, Mail } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function ContactSection({ villageInfo }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('contacts').insert([
          { name: formData.name, email: formData.email, message: formData.message }
        ]);
      }
      
      setSubmittedSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" ref={sectionRef} className="py-20 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Hubungi <span className="text-gradient-gold">Tim KKN Kelompok 3</span>
          </h2>
          <p className="text-base text-slate-500">
            Punya pertanyaan, masukan, atau saran untuk pengabdian KKN? Kirimkan pesan Anda langsung kepada kami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Info Card */}
          <div className="reveal p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200 space-y-8 flex flex-col justify-between shadow-card hover:shadow-gold transition-all duration-300">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-brand-navy">Informasi KKN Kelompok 3</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kami siap menerima masukan dari warga Desa Karangrejo, pihak desa, dosen pembimbing, maupun kampus.
              </p>

              <div className="space-y-4 text-sm text-slate-700 font-medium">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-brand-gold border border-amber-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-bold">Lokasi Pengabdian:</strong>
                    <span className="text-slate-600">{villageInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-brand-green border border-emerald-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-bold">Hubungi via WhatsApp:</strong>
                    <a
                      href="https://wa.me/6281398728498?text=Halo%20Tim%20KKN%20Kelompok%203%20Karangrejo"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-green font-bold hover:underline"
                    >
                      +62 813-9872-8498 (Ketua KKN)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-brand-gold border border-amber-200">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-bold">Instagram Resmi:</strong>
                    <span className="text-slate-600">@kkn3_karangrejo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href="https://wa.me/6281398728498?text=Halo%20Tim%20KKN%20Kelompok%203%20Karangrejo"
              target="_blank"
              rel="noreferrer"
              className="btn-shimmer w-full py-3.5 px-6 rounded-2xl bg-brand-green hover:bg-brand-greenHover text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-green/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat Langsung via WhatsApp</span>
            </a>

          </div>

          {/* Contact Form */}
          <div className="reveal reveal-delay-1 p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-navy transition-all duration-300">
            <h3 className="text-2xl font-bold text-brand-navy mb-6">Formulir Pesan & Saran</h3>

            {submittedSuccess && (
              <div className="p-4 mb-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Terima kasih! Pesan Anda telah berhasil terkirim.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-brand-navy text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 shadow-card transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                  Email atau No. HP (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="contoh: email@domain.com atau 0812..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-brand-navy text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 shadow-card transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                  Pesan / Aspirasi *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pesan, tanggapan proker, atau masukan untuk kelompok 3..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-brand-navy text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 shadow-card transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-500 hover:to-brand-gold text-white font-bold shadow-gold hover:shadow-gold-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
