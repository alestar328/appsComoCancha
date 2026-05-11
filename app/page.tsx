import ProjectsCarousel from '@/components/ProjectsCarousel';
import BudgetCalculator from '@/components/BudgetCalculator';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Páginas Web y Apps Económicas para tu Negocio en Perú',
  description:
    'Apps Como Cancha: webs, tiendas online y apps Android económicas para bodegas, ferreterías, mayoristas y todo comercio peruano.',
  path: '/',
  keywords: ['páginas web económicas Lima', 'ecommerce Perú', 'app Android pequeño negocio'],
});

const WA_URL = 'https://wa.me/51900000000?text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n';

const WA_ICON = (
  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const services = [
  {
    scClass: 'sc-gold',
    accent: '#FFE600',
    emoji: '🌐',
    title: 'Página Web',
    features: ['Diseño profesional moderno', 'Apareces en Google (SEO)', 'Perfecto en celular y PC'],
  },
  {
    scClass: 'sc-fuchsia',
    accent: '#FF006E',
    emoji: '🛒',
    title: 'Tienda Online',
    features: ['Yape, Plin y tarjetas', 'Catálogo ilimitado', 'Portal de pedidos B2B/mayorista'],
  },
  {
    scClass: 'sc-green',
    accent: '#39FF14',
    emoji: '📱',
    title: 'App Android',
    features: ['Tu app en Play Store', 'Notificaciones push', 'Funciona sin internet'],
  },
  {
    scClass: 'sc-cyan',
    accent: '#00FFFF',
    emoji: '⚙️',
    title: 'Sistema a Medida',
    features: ['Facturación SUNAT', 'Control de inventario', 'Reportes en tiempo real'],
  },
];

const razones = [
  { emoji: '💰', title: 'Precios en soles', sub: 'Sin costos ocultos', color: '#FFE600' },
  { emoji: '📲', title: 'WhatsApp directo', sub: 'Te respondemos nosotros', color: '#39FF14' },
  { emoji: '🇵🇪', title: 'Hecho para Perú', sub: 'Yape, SUNAT, mercado local', color: '#FF006E' },
  { emoji: '✅', title: 'Sin letra chica', sub: 'Precio fijo, plazo real', color: '#00FFFF' },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        id="inicio"
        className="bg-chicha"
        style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}
      >
        <div className="container-custom py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">

            <div className="flex justify-center mb-8">
              <span className="badge-chicha">🇵🇪 Lima, Perú · Desde S/. 500</span>
            </div>

            <h1
              className="font-display font-black leading-none mb-6"
              style={{ fontSize: 'clamp(3.2rem, 11vw, 7rem)' }}
            >
              <span
                className="block"
                style={{ color: 'transparent', WebkitTextStroke: '3px #FFE600' }}
              >
                TU NEGOCIO
              </span>
              <span className="block chicha-text">EN INTERNET</span>
            </h1>

            <div className="flex justify-center items-center gap-3 mb-7">
              <div className="h-px w-14" style={{ background: 'var(--c-yellow)' }} />
              <span style={{ color: 'var(--c-yellow)' }}>★</span>
              <div className="h-px w-14" style={{ background: 'var(--c-yellow)' }} />
            </div>

            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Webs, tiendas online y apps Android{' '}
              <span style={{ color: 'var(--c-yellow)', fontWeight: 700 }}>económicas</span>{' '}
              para bodegas, ferreterías, mayoristas y más.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WA_URL} className="btn-whatsapp text-lg px-8 py-4" target="_blank" rel="noopener noreferrer">
                {WA_ICON}
                Cotizar por WhatsApp
              </a>
              <a href="#servicios" className="btn-secondary text-lg px-8 py-4">
                Ver servicios ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="chicha-divider" />

      {/* ── SERVICIOS ────────────────────────────────── */}
      <section id="servicios" className="section" style={{ background: '#0d0d0d' }}>
        <div className="container-custom">

          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white">
              ★ <span style={{ color: 'var(--c-yellow)' }}>SERVICIOS</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Todo lo que necesitas para estar en internet</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <article
                key={s.title}
                className={`${s.scClass} rounded-2xl p-6 flex flex-col gap-4`}
                style={{ background: '#111111', borderTop: `3px solid ${s.accent}` }}
              >
                <div className="text-4xl">{s.emoji}</div>
                <h3 className="font-display font-black text-xl text-white">{s.title}</h3>
                <ul className="space-y-2 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="text-gray-400 text-sm flex gap-2 items-start">
                      <span className="mt-0.5 flex-shrink-0 font-black" style={{ color: s.accent }}>✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="text-sm font-display font-black transition-colors"
                  style={{ color: s.accent }}
                >
                  Cotizar →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="chicha-divider" />

      {/* ── CALCULADORA DE PRESUPUESTO ───────────────── */}
      <section id="presupuesto" className="section" style={{ background: '#080808' }}>
        <div className="container-custom">

          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white">
              ★ <span style={{ color: 'var(--c-yellow)', textShadow: '3px 3px 0 var(--c-fuchsia)' }}>
                CALCULA TU PRESUPUESTO
              </span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Estimación instantánea · Sin compromisos · Cotización formal gratis</p>
          </div>

          <BudgetCalculator />
        </div>
      </section>

      <div className="chicha-divider" />

      {/* ── PROYECTOS ────────────────────────────────── */}
      <section id="proyectos" className="section bg-chicha-stripes">
        <div className="container-custom">

          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white">
              ★ <span style={{ color: 'var(--c-fuchsia)' }}>PROYECTOS</span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Lo que hemos construido para otros negocios peruanos</p>
          </div>

          <ProjectsCarousel />
        </div>
      </section>

      <div className="chicha-divider" />

      {/* ── POR QUÉ NOSOTROS ─────────────────────────── */}
      <section id="nosotros" className="section" style={{ background: '#080808' }}>
        <div className="container-custom">

          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl md:text-4xl text-white">
              ★ ¿POR QUÉ{' '}
              <span style={{ color: 'var(--c-yellow)', textShadow: '3px 3px 0 var(--c-fuchsia)' }}>
                NOSOTROS
              </span>
              ?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {razones.map((r) => (
              <div
                key={r.title}
                className="text-center p-6 rounded-2xl"
                style={{ background: '#0d0d0d', border: `1px solid ${r.color}22` }}
              >
                <div className="text-3xl mb-3">{r.emoji}</div>
                <p className="font-display font-black text-sm text-white mb-1">{r.title}</p>
                <p className="text-gray-500 text-xs leading-snug">{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="chicha-divider" />

      {/* ── CONTACTO ─────────────────────────────────── */}
      <section id="contacto" className="section bg-chicha">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">

            <div className="flex justify-center gap-3 mb-6 text-xl">
              <span style={{ color: 'var(--c-yellow)' }}>★</span>
              <span style={{ color: 'var(--c-fuchsia)' }}>✦</span>
              <span style={{ color: 'var(--c-green)' }}>★</span>
            </div>

            <h2
              className="font-display font-black text-white mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                textShadow: '3px 3px 0 var(--c-fuchsia)',
              }}
            >
              ¡ESCRÍBENOS!
            </h2>

            <p className="text-gray-400 text-lg mb-10">
              Cotización gratis en menos de 24 horas. Sin compromisos.
            </p>

            <a
              href={WA_URL}
              className="btn-whatsapp text-xl px-10 py-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Cotizar por WhatsApp
            </a>

            <p className="mt-6 text-gray-600 text-sm">
              También por email:{' '}
              <a
                href="mailto:hola@appscomocancha.com"
                className="font-bold"
                style={{ color: 'var(--c-yellow)' }}
              >
                hola@appscomocancha.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── BOTÓN FLOTANTE WHATSAPP ───────────────────── */}
      <a
        href={WA_URL}
        className="wa-float"
        aria-label="Cotizar por WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
