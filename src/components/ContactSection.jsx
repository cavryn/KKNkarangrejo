'use client';
import { useState } from 'react';
import { Phone, MapPin, Send, MessageSquare, CheckCircle2, Instagram } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function ContactSection({ villageInfo }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

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
    <section id="kontak" className="py-20 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Hubungi <span className="text-brand-gold">Tim KKN Kelompok 3</span>
          </h2>
          <p className="text-base text-slate-600">
            Punya pertanyaan, masukan, atau saran untuk pengabdian KKN? Kirimkan pesan Anda langsung kepada kami.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Info Card */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-brand-navy">Posko Informasi KKN</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kami siap menerima masukan dari warga Desa Karangrejo, pihak desa, dosen pembimbing, maupun kampus.
              </p>

              <div className="space-y-4 text-sm text-slate-700 font-medium">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-brand-gold border border-amber-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-bold">Alamat Posko:</strong>
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
                      href="https://wa.me/6281234567890?text=Halo%20Tim%20KKN%20Kelompok%203%20Karangrejo"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-green font-bold hover:underline"
                    >
                      +62 812-3456-7890 (Ketua KKN)
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
              href="https://wa.me/6281234567890?text=Halo%20Tim%20KKN%20Kelompok%203"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-green hover:bg-brand-greenHover text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-green/20 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat Langsung via WhatsApp</span>
            </a>

          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
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
                  className="w-full bg-white border border-slate-300 text-brand-navy text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold shadow-sm transition-colors"
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
                  className="w-full bg-white border border-slate-300 text-brand-navy text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold shadow-sm transition-colors"
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
                  className="w-full bg-white border border-slate-300 text-brand-navy text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold shadow-sm transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold shadow-md shadow-brand-gold/20 flex items-center justify-center gap-2 transition-all"
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
