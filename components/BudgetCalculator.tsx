'use client';

import { useState, useMemo } from 'react';

type ServiceKey = 'web' | 'ecommerce' | 'android' | 'webapp' | 'sistema';
type ExtraId = 'admin' | 'seo' | 'pagos' | 'whatsapp' | 'sunat' | 'push' | 'reportes' | 'hosting';

interface ServiceDef {
  label: string;
  emoji: string;
  min: number;
  max: number;
  weeks: string;
  desc: string;
}

interface ExtraDef {
  id: ExtraId;
  label: string;
  min: number;
  max: number;
  for: ServiceKey[];
}

const SERVICES: Record<ServiceKey, ServiceDef> = {
  web:       { label: 'Página Web',     emoji: '🌐', min: 500,  max: 900,  weeks: '1-2', desc: 'Landing o sitio hasta 5 secciones' },
  ecommerce: { label: 'Tienda Online',  emoji: '🛒', min: 1500, max: 2800, weeks: '3-5', desc: 'Catálogo + carrito + pasarela de pagos' },
  android:   { label: 'App Android',    emoji: '📱', min: 2000, max: 3800, weeks: '4-8', desc: 'App básica publicada en Play Store' },
  webapp:    { label: 'Web App',        emoji: '💻', min: 1200, max: 2500, weeks: '3-5', desc: 'Login de usuarios y panel de gestión' },
  sistema:   { label: 'Sistema + BD',   emoji: '⚙️', min: 1500, max: 3200, weeks: '4-7', desc: 'CRUD completo con base de datos' },
};

const ALL_EXTRAS: ExtraDef[] = [
  { id: 'admin',    label: 'Panel de administración',              min: 300, max: 500, for: ['web', 'ecommerce', 'webapp', 'sistema'] },
  { id: 'seo',      label: 'SEO + Google My Business',            min: 150, max: 250, for: ['web', 'ecommerce', 'webapp'] },
  { id: 'pagos',    label: 'Pagos online (Yape, Plin, tarjeta)',  min: 400, max: 600, for: ['ecommerce', 'webapp', 'android'] },
  { id: 'whatsapp', label: 'Integración WhatsApp',                min: 150, max: 250, for: ['web', 'ecommerce', 'android', 'webapp', 'sistema'] },
  { id: 'sunat',    label: 'Facturación SUNAT',                   min: 600, max: 900, for: ['ecommerce', 'sistema', 'webapp'] },
  { id: 'push',     label: 'Notificaciones push',                 min: 250, max: 400, for: ['android', 'webapp'] },
  { id: 'reportes', label: 'Reportes y estadísticas',             min: 300, max: 500, for: ['ecommerce', 'sistema', 'webapp', 'android'] },
  { id: 'hosting',  label: 'Hosting + dominio (1 año)',           min: 150, max: 200, for: ['web', 'ecommerce', 'webapp'] },
];

const fmt = (n: number) => `S/. ${n.toLocaleString('es-PE')}`;

const SERVICE_KEYS = Object.keys(SERVICES) as ServiceKey[];

export default function BudgetCalculator() {
  const [service, setService] = useState<ServiceKey | null>(null);
  const [extras, setExtras] = useState<Set<ExtraId>>(new Set());

  const toggleExtra = (id: ExtraId) => {
    setExtras((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visibleExtras = useMemo(
    () => (service ? ALL_EXTRAS.filter((e) => e.for.includes(service)) : []),
    [service],
  );

  const { totalMin, totalMax, weeks } = useMemo(() => {
    if (!service) return { totalMin: 0, totalMax: 0, weeks: '' };
    const base = SERVICES[service];
    let min = base.min;
    let max = base.max;
    extras.forEach((id) => {
      const ex = ALL_EXTRAS.find((e) => e.id === id);
      if (ex) { min += ex.min; max += ex.max; }
    });
    return { totalMin: min, totalMax: max, weeks: base.weeks };
  }, [service, extras]);

  const waUrl = useMemo(() => {
    if (!service) return '#';
    const s = SERVICES[service];
    const extraLabels = Array.from(extras)
      .map((id) => ALL_EXTRAS.find((e) => e.id === id)?.label)
      .filter(Boolean)
      .join(', ');
    const msg =
      `Hola, calculé mi presupuesto en su web:\n\n` +
      `📌 Servicio: ${s.label}\n` +
      (extraLabels ? `➕ Extras: ${extraLabels}\n` : '') +
      `💰 Estimado: ${fmt(totalMin)} – ${fmt(totalMax)}\n\n` +
      `¿Pueden darme una cotización formal?`;
    return `https://wa.me/51900000000?text=${encodeURIComponent(msg)}`;
  }, [service, extras, totalMin, totalMax]);

  return (
    <div className="max-w-3xl mx-auto">

      {/* PASO 1 — Tipo de proyecto */}
      <p className="text-xs font-display font-black uppercase tracking-widest text-gray-500 mb-4">
        1 · ¿Qué tipo de proyecto necesitas?
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {SERVICE_KEYS.map((key) => {
          const s = SERVICES[key];
          const active = service === key;
          return (
            <button
              key={key}
              onClick={() => { setService(key); setExtras(new Set()); }}
              className="rounded-xl p-4 flex flex-col items-center gap-2 text-center transition-all duration-200 border-2"
              style={{
                background: active ? 'rgba(255,230,0,0.08)' : '#111',
                borderColor: active ? '#FFE600' : '#222',
                boxShadow: active ? '0 0 14px rgba(255,230,0,0.2), 3px 3px 0 #FF006E' : 'none',
                color: active ? '#FFE600' : '#888',
              }}
            >
              <span className="text-2xl">{s.emoji}</span>
              <span className="text-xs font-display font-black leading-tight">{s.label}</span>
              <span className="text-xs" style={{ color: active ? 'rgba(255,230,0,0.6)' : '#444' }}>
                desde {fmt(s.min)}
              </span>
            </button>
          );
        })}
      </div>

      {/* PASO 2 — Extras */}
      {service && visibleExtras.length > 0 && (
        <>
          <p className="text-xs font-display font-black uppercase tracking-widest text-gray-500 mb-4">
            2 · ¿Qué extras necesitas? (opcional)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
            {visibleExtras.map((extra) => {
              const checked = extras.has(extra.id);
              return (
                <button
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left transition-all border"
                  style={{
                    background: checked ? 'rgba(57,255,20,0.06)' : '#111',
                    borderColor: checked ? '#39FF14' : '#222',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-black transition-all"
                    style={{
                      background: checked ? '#39FF14' : 'transparent',
                      border: `2px solid ${checked ? '#39FF14' : '#444'}`,
                      color: '#080808',
                    }}
                  >
                    {checked ? '✓' : ''}
                  </div>
                  <span className="flex-1 text-sm" style={{ color: checked ? '#e0e0e0' : '#888' }}>
                    {extra.label}
                  </span>
                  <span className="text-xs font-display font-black flex-shrink-0" style={{ color: '#39FF14' }}>
                    +{fmt(extra.min)}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* RESULTADO */}
      {service ? (
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: '#0d0d0d',
            border: '2px solid rgba(255,230,0,0.25)',
            boxShadow: '0 0 30px rgba(255,230,0,0.06)',
          }}
        >
          <p className="text-gray-600 text-xs font-display font-black uppercase tracking-widest mb-5">
            Tu presupuesto estimado
          </p>

          <p
            className="font-display font-black mb-2"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: '#FFE600', lineHeight: 1 }}
          >
            {fmt(totalMin)}
            <span className="text-gray-600 mx-2 font-normal">—</span>
            {fmt(totalMax)}
          </p>

          <p className="text-gray-500 text-sm mb-1">
            ⏱ Entrega estimada:{' '}
            <span className="text-white font-bold">{weeks} semanas</span>
          </p>
          <p className="text-xs mb-6" style={{ color: '#333' }}>
            * Estimación base. El precio final varía según complejidad y requisitos exactos.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full justify-center text-base py-4"
          >
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar cotización formal por WhatsApp
          </a>
        </div>
      ) : (
        <div
          className="rounded-2xl p-8 text-center border-2 border-dashed"
          style={{ borderColor: '#1f1f1f' }}
        >
          <p className="text-gray-600 font-display font-bold text-sm">
            Selecciona un tipo de proyecto para ver tu presupuesto
          </p>
        </div>
      )}
    </div>
  );
}
