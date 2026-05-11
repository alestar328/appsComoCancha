'use client';

import { useState } from 'react';

type ProjectType = 'web' | 'android';

interface Project {
  emoji: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: string;
  url: string;
  href: string;
  type: ProjectType;
}

const projects: Project[] = [
  {
    emoji: '🛒',
    title: 'Bodega El Sol',
    category: 'Tienda Online',
    description: 'Catálogo digital con pedidos por WhatsApp y Yape integrado. Ventas 40% arriba en los primeros 2 meses.',
    tags: ['E-commerce', 'Yape', 'WhatsApp'],
    accent: '#FFE600',
    url: 'bodegas-elsol.pe',
    href: 'https://bodegas-elsol.pe',
    type: 'web',
  },
  {
    emoji: '🔧',
    title: 'Ferretería Los Andes',
    category: 'Web + Catálogo',
    description: 'Web con más de 500 productos, cotizador automático y presencia en Google Maps.',
    tags: ['Web', 'SEO Local', 'Catálogo'],
    accent: '#FF006E',
    url: 'ferreterialosandes.pe',
    href: 'https://ferreterialosandes.pe',
    type: 'web',
  },
  {
    emoji: '📦',
    title: 'Mayorista Textil Lima',
    category: 'Portal B2B',
    description: 'Portal de pedidos para distribuidores con precios por volumen y facturación electrónica SUNAT.',
    tags: ['B2B', 'SUNAT', 'Portal'],
    accent: '#39FF14',
    url: 'mayoristaxim.pe',
    href: 'https://mayoristaxim.pe',
    type: 'web',
  },
  {
    emoji: '📱',
    title: 'Delivery Criolla',
    category: 'App Android',
    description: 'App en Google Play con tracking en tiempo real. Más de 1,200 descargas en el primer mes.',
    tags: ['Android', 'GPS', 'Play Store'],
    accent: '#00FFFF',
    url: 'Play Store · Delivery Criolla',
    href: 'https://play.google.com',
    type: 'android',
  },
  {
    emoji: '🍽️',
    title: 'Restaurante Miraflores',
    category: 'Sistema POS',
    description: 'Control de mesas, comanda digital para cocina y caja integrada. Cero errores en pedidos.',
    tags: ['POS', 'Cocina Digital', 'Caja'],
    accent: '#CC00FF',
    url: 'restaurantemiraflores.pe',
    href: 'https://restaurantemiraflores.pe',
    type: 'web',
  },
];

function WebMockup({ p }: { p: Project }) {
  return (
    <div className="rounded-t-2xl overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#111' }}>
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 rounded px-2 py-0.5" style={{ background: '#0d0d0d' }}>
          <p className="text-center truncate" style={{ fontSize: '0.65rem', color: '#444' }}>
            🔒 {p.url}
          </p>
        </div>
      </div>
      {/* Preview area */}
      <div
        className="flex flex-col items-center justify-center gap-2"
        style={{ height: '160px', background: `linear-gradient(135deg, ${p.accent}14, ${p.accent}04)` }}
      >
        <span className="text-6xl">{p.emoji}</span>
        <span className="text-xs font-display font-black tracking-wider" style={{ color: `${p.accent}77` }}>
          {p.title.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function AndroidMockup({ p }: { p: Project }) {
  return (
    <div
      className="flex items-center justify-center py-5"
      style={{ background: '#0a0a0a', borderRadius: '1rem 1rem 0 0' }}
    >
      <div
        className="relative flex flex-col items-center justify-center rounded-3xl"
        style={{
          width: '90px',
          height: '170px',
          background: '#111',
          border: `3px solid ${p.accent}55`,
          boxShadow: `0 0 24px ${p.accent}22`,
        }}
      >
        <div className="absolute top-2.5 w-8 h-1 rounded-full" style={{ background: '#222' }} />
        <span className="text-4xl">{p.emoji}</span>
        <div
          className="absolute bottom-2.5 w-5 h-5 rounded-full border-2"
          style={{ borderColor: `${p.accent}55` }}
        />
      </div>
    </div>
  );
}

export default function ProjectsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  const p = projects[current];

  return (
    <div className="max-w-xl mx-auto">
      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: '#0d0d0d',
          border: `2px solid ${p.accent}44`,
          boxShadow: `0 0 40px ${p.accent}10`,
        }}
      >
        {p.type === 'android' ? (
          <AndroidMockup p={p} />
        ) : (
          <WebMockup p={p} />
        )}

        {/* Info */}
        <div className="p-6">
          <p className="text-xs font-display font-black uppercase tracking-widest mb-1" style={{ color: p.accent }}>
            {p.category}
          </p>
          <h3 className="font-display font-black text-xl text-white mb-3">{p.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-display font-black px-2.5 py-1 rounded-full"
                style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}33` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-display font-black transition-opacity hover:opacity-75"
            style={{ color: p.accent }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ver proyecto
          </a>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={prev}
          aria-label="Proyecto anterior"
          className="carousel-btn w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
          style={{ border: '2px solid #333', color: '#555', background: 'transparent' }}
        >
          ←
        </button>

        <div className="flex gap-2 items-center">
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Proyecto ${i + 1}: ${proj.title}`}
              className="rounded-full transition-all duration-300"
              style={{
                background: i === current ? projects[i].accent : '#333',
                width: i === current ? '24px' : '8px',
                height: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Proyecto siguiente"
          className="carousel-btn w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
          style={{ border: '2px solid #333', color: '#555', background: 'transparent' }}
        >
          →
        </button>
      </div>

      <p className="text-center text-gray-700 text-xs mt-3 font-display tracking-widest">
        {current + 1} / {projects.length}
      </p>
    </div>
  );
}
