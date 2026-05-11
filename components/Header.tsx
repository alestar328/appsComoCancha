'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '#servicios',   label: 'Servicios' },
  { href: '#presupuesto', label: 'Presupuesto' },
  { href: '#proyectos',   label: 'Proyectos' },
  { href: '#contacto',    label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(8, 8, 8, 0.97)',
        borderBottom: '3px solid transparent',
        borderImage: 'linear-gradient(90deg, #FFE600, #FF006E, #39FF14, #00FFFF, #FFE600) 1',
      }}
    >
      <nav className="container-custom" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Apps Como Cancha - Inicio">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center animate-glow-pulse"
              style={{ background: 'var(--c-yellow)', boxShadow: '0 0 10px var(--c-yellow)' }}
            >
              <span className="font-display font-black text-sm" style={{ color: '#080808' }}>AC</span>
            </div>
            <div className="font-display font-black text-lg leading-tight">
              <span style={{ color: 'var(--c-yellow)' }}>Apps</span>
              <span className="text-white"> Como </span>
              <span style={{ color: 'var(--c-fuchsia)' }}>Cancha</span>
            </div>
          </Link>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 font-display font-bold text-sm text-gray-300 rounded-lg transition-all duration-200"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#080808';
                  (e.currentTarget as HTMLElement).style.background = 'var(--c-yellow)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 0 var(--c-fuchsia)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '';
                  (e.currentTarget as HTMLElement).style.background = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex">
            <a href="#contacto" className="btn-primary text-sm px-5 py-2.5">
              ¡Cotiza Gratis!
            </a>
          </div>

          {/* Hamburguesa móvil */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--c-yellow)' }}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {open && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 animate-fade-in"
            style={{ borderTop: '1px solid rgba(255,230,0,0.15)' }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 font-display font-bold rounded-lg"
                  style={{ color: 'var(--c-yellow)' }}
                  onClick={() => setOpen(false)}
                >
                  ★ {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="btn-primary mt-3 text-center"
                onClick={() => setOpen(false)}
              >
                ¡Cotiza Gratis!
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
