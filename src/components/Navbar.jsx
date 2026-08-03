'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Tentang Kami', href: '#tentang' },
    { name: 'Program Kerja', href: '#proker' },
    { name: 'Dokumentasi', href: '#dokumentasi' },
    { name: 'Modul & Artikel', href: '#artikel' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-md' 
        : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with official KKN logo graphic */}
          <a href="#beranda" className="flex items-center gap-3 group">
            <div className="h-10 sm:h-11 flex items-center justify-center">
              <img 
                src="/logo/KKNteks.png" 
                alt="Logo KKN Karangrejo" 
                className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.src = '/logo/logoonlyKKN.png';
                }}
              />
            </div>
            <div className="hidden sm:block border-l border-slate-300 pl-3">
              <div className="text-xs font-bold text-brand-navy tracking-tight uppercase">
                Kelompok 3 • Karangrejo
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Ujungpangkah, Kab. Gresik</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-semibold text-brand-navy hover:text-brand-gold hover:bg-white rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-navy hover:bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 mt-3 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-base font-semibold text-brand-navy hover:text-brand-gold hover:bg-amber-50 rounded-xl transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
