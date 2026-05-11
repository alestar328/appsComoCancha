import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Sobre Nosotros - Apps Como Cancha',
  description:
    'Somos peruanos que entienden el pequeño comercio. Apps Como Cancha nació para hacer la tecnología accesible para bodegas, ferreterías, mayoristas y todo negocio peruano.',
  path: '/sobre',
  keywords: ['sobre apps como cancha', 'empresa tecnología Lima', 'desarrollo web peruano'],
});

const valores = [
  {
    title: 'Economía Real',
    description: 'Precios honestos para la realidad del pequeño comercio peruano. Sin cobros inflados ni sorpresas en la factura.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-primary-100 text-primary-600',
  },
  {
    title: 'Cercanía',
    description: 'Hablas directo con nosotros. Sin call centers ni asistentes. Soporte real por WhatsApp cuando lo necesitas.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Calidad Sin Excusas',
    description: 'Usamos las mismas tecnologías que usan las grandes empresas. Tu negocio merece lo mejor, aunque sea pequeño.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Compromiso Total',
    description: 'Tu proyecto es nuestro proyecto. No desaparecemos después de entregarlo. Estamos contigo en el camino.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: 'bg-accent-100 text-accent-600',
  },
];

const tecnologias = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Kotlin', 'Android', 'Firebase',
  'PostgreSQL', 'WordPress', 'WooCommerce', 'Shopify',
];

export default function SobrePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-chicha py-16 md:py-24">
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-display font-bold mb-6 border border-primary-500/30">
              ✦ Sobre Nosotros
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
              Somos peruanos que entienden{' '}
              <span className="chicha-text">tu negocio</span>
            </h1>
            <p className="text-lg text-gray-300">
              Apps Como Cancha nació para que el pequeño comercio peruano tenga acceso
              a tecnología de calidad sin pagar precios de multinacional.
            </p>
          </div>
        </div>
      </section>

      {/* ===== NUESTRA HISTORIA ===== */}
      <section className="section bg-white" aria-labelledby="historia-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Bloque visual */}
            <div className="relative">
              <div className="bg-chicha rounded-3xl p-8 border border-primary-500/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: '50+', label: 'Negocios digitalizados', color: 'text-primary-400' },
                    { number: '100%', label: 'Clientes satisfechos', color: 'text-green-400' },
                    { number: 'S/.', label: 'Precios en soles', color: 'text-primary-400' },
                    { number: '24h', label: 'Respuesta garantizada', color: 'text-green-400' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                      <p className={`font-display font-black text-3xl ${stat.color}`}>{stat.number}</p>
                      <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary-500/15 border border-primary-500/30 rounded-xl">
                  <p className="text-primary-300 text-sm font-medium text-center">
                    🇵🇪 Atendiendo a negocios de Lima y todo el Perú
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/10 rounded-2xl -z-10 blur-xl" />
            </div>

            {/* Contenido */}
            <div>
              <span className="text-primary-600 font-display font-bold text-sm uppercase tracking-wide">
                Nuestra Historia
              </span>
              <h2 id="historia-heading" className="font-display font-black text-3xl md:text-4xl text-gray-900 mt-2 mb-6">
                La tecnología es para todos, no solo para las grandes empresas
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Vimos cómo muchos pequeños comercios peruanos se quedaban fuera del mundo digital
                  no por falta de ganas, sino porque los precios del mercado estaban muy lejos
                  de su realidad.
                </p>
                <p>
                  La bodega del barrio, la ferretería familiar, el mayorista que vende a media Lima...
                  todos merecen tener una presencia digital de calidad y herramientas que les ayuden
                  a crecer. Por eso creamos Apps Como Cancha.
                </p>
                <p>
                  Combinamos experiencia técnica real con un modelo de trabajo eficiente que nos
                  permite ofrecer soluciones profesionales a precios que el pequeño comercio peruano
                  sí puede pagar.
                </p>
              </div>

              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl" role="img" aria-label="Perú">🇵🇪</span>
                  <span className="font-medium text-gray-900">Lima, Perú</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💼</span>
                  <span className="font-medium text-gray-900">B2B y B2C</span>
                </div>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span className="font-medium text-gray-900">Respuesta rápida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALORES ===== */}
      <section className="section bg-gray-50" aria-labelledby="valores-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-display font-bold mb-4">
              ✦ Cómo trabajamos
            </span>
            <h2 id="valores-heading" className="font-display font-black text-3xl md:text-4xl text-gray-900 mt-2 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600">
              Estos principios guían cada proyecto que hacemos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${valor.color} flex items-center justify-center mb-4`}>
                  <div className="w-7 h-7">{valor.icon}</div>
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2 text-xl">{valor.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{valor.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECNOLOGÍAS ===== */}
      <section className="section bg-white" aria-labelledby="tech-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-display font-bold mb-4">
              ✦ Stack tecnológico
            </span>
            <h2 id="tech-heading" className="font-display font-black text-3xl md:text-4xl text-gray-900 mt-2 mb-4">
              Tecnologías que manejamos
            </h2>
            <p className="text-lg text-gray-600">
              Las mismas herramientas que usan las grandes empresas, ahora para tu negocio.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {tecnologias.map((tech, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gray-100 text-gray-800 font-display font-semibold rounded-full hover:bg-primary-100 hover:text-primary-800 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPROMISO ===== */}
      <section className="section bg-chicha text-white" aria-labelledby="compromiso-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-400 font-display font-bold text-sm uppercase tracking-wide">
                Nuestro Compromiso
              </span>
              <h2 id="compromiso-heading" className="font-display font-black text-3xl md:text-4xl mt-2 mb-6">
                Calidad al precio justo, sin excusas
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Creemos firmemente que el tamaño de tu negocio no debe determinar la calidad
                  de tu presencia digital. Una bodega merece una web tan profesional como un banco.
                </p>
                <p>
                  Por eso diseñamos procesos eficientes que nos permiten ofrecer calidad real
                  sin los costos inflados de las grandes agencias. Directo al grano,
                  sin reuniones innecesarias.
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {[
                  'Cotizaciones claras en soles peruanos',
                  'Comunicación directa por WhatsApp',
                  'Entrega en los plazos acordados',
                  'Soporte post-entrega incluido',
                  'Sin costos ocultos ni sorpresas',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="font-display font-bold text-white text-xl mb-6 text-center">
                Proceso de trabajo
              </h3>
              <div className="space-y-5">
                {[
                  { step: '01', title: 'Conversamos', desc: 'Nos cuentas qué necesitas por WhatsApp o formulario. Gratis y sin compromiso.' },
                  { step: '02', title: 'Cotizamos', desc: 'Te enviamos una propuesta clara con precio en soles en menos de 24 horas.' },
                  { step: '03', title: 'Desarrollamos', desc: 'Empezamos el trabajo y te mostramos avances constantemente.' },
                  { step: '04', title: 'Entregamos', desc: 'Te capacitamos en el uso y seguimos contigo con soporte continuo.' },
                ].map((paso, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary-500/30 border border-primary-500/50 flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-black text-primary-400 text-sm">{paso.step}</span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-white">{paso.title}</p>
                      <p className="text-gray-400 text-sm">{paso.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="section bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-gray-900">
            <div className="text-3xl mb-6">✦ ✦ ✦</div>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6">
              ¿Trabajamos juntos?
            </h2>
            <p className="text-lg mb-8 text-gray-800">
              Estamos listos para ayudarte a digitalizar tu negocio.
              Cuéntanos tu idea y empezamos hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/51900000000"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-display font-bold rounded-xl transition-colors shadow-lg text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escríbenos por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-display font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg text-lg"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
