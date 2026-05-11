import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'Servicios: Páginas Web, Tienda Online y Apps para Negocios en Perú',
  description:
    'Servicios digitales económicos para pequeños comercios peruanos: páginas web, tiendas online con catálogo mayorista, apps Android y sistemas a medida. Precios en soles.',
  path: '/servicios',
  keywords: [
    'servicios web Lima',
    'tienda online mayoristas Perú',
    'app Android negocios',
    'sistema control inventario Perú',
  ],
});

const serviciosData = [
  {
    id: 'web',
    title: 'Página Web para tu Negocio',
    subtitle: 'Tu presencia profesional en internet',
    description:
      'Que tus clientes te encuentren en Google. Una página web profesional le da credibilidad a tu negocio, muestra tus productos y genera más ventas. No importa si eres bodega, ferretería o consultora: toda empresa necesita estar en internet.',
    benefits: [
      {
        title: 'Diseño personalizado',
        description: 'Diseñamos según tu negocio y tu estilo. Nada de plantillas genéricas que se ven iguales a todos.',
      },
      {
        title: 'Se ve bien en celular',
        description: 'La mayoría de tus clientes te buscarán desde el celular. Tu web se adapta perfecta a cualquier pantalla.',
      },
      {
        title: 'Apareces en Google',
        description: 'Optimizamos tu web para que Google te muestre cuando alguien busca tu negocio o rubro.',
      },
      {
        title: 'Fácil de actualizar',
        description: 'Te enseñamos a actualizar fotos, textos y precios tú mismo. Sin depender de nosotros para cada cambio.',
      },
    ],
    includes: [
      'Diseño UI/UX personalizado',
      'Responsive para celular y PC',
      'Hasta 10 páginas',
      'Formulario de contacto',
      'Integración con WhatsApp',
      'Optimización SEO básica',
      'Certificado SSL (candado verde)',
      'Soporte por 30 días',
    ],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    accent: 'from-primary-400 to-primary-600',
    border: 'border-t-primary-500',
  },
  {
    id: 'ecommerce',
    title: 'Tienda Online / Catálogo Digital',
    subtitle: 'Vende las 24 horas, llega a más clientes',
    description:
      'Perfecta para negocios que venden al por menor Y al por mayor. Muestra tu catálogo, recibe pedidos por internet y gestiona todo desde un solo panel. Ideal para mayoristas que quieren digitalizar sus pedidos y dejar de depender solo del teléfono.',
    benefits: [
      {
        title: 'Catálogo B2B y B2C',
        description: 'Precios diferentes según tipo de cliente: consumidor final o cliente mayorista. Todo en una sola plataforma.',
      },
      {
        title: 'Pagos con Yape y Plin',
        description: 'Integración con Yape, Plin, tarjetas y transferencia bancaria. Como les gusta pagar a los peruanos.',
      },
      {
        title: 'Gestión de pedidos',
        description: 'Panel completo para ver, procesar y gestionar todos tus pedidos. Con notificaciones al instante.',
      },
      {
        title: 'Control de stock',
        description: 'Inventario actualizado automáticamente con cada venta. Nunca más vendas lo que ya no tienes.',
      },
    ],
    includes: [
      'Diseño de tienda personalizado',
      'Catálogo de productos ilimitado',
      'Carrito de compras',
      'Yape, Plin, tarjetas y transferencia',
      'Precios mayorista y minorista',
      'Control de inventario',
      'Panel de pedidos',
      'Notificaciones por WhatsApp',
      'Informes de ventas',
    ],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    accent: 'from-accent-500 to-accent-700',
    border: 'border-t-accent-500',
  },
  {
    id: 'android',
    title: 'App Android para tu Negocio',
    subtitle: 'Tu negocio en el celular de tus clientes',
    description:
      'Una app propia le da un nivel diferente a tu negocio. Tus clientes la descargan de Play Store y tienen tu catálogo, tus promociones y tu forma de pago siempre a mano. Además puedes enviarles notificaciones con ofertas cuando quieras.',
    benefits: [
      {
        title: 'App propia en Play Store',
        description: 'Tus clientes descargan TU app con el nombre de TU negocio. No compartida con nadie más.',
      },
      {
        title: 'Notificaciones push gratis',
        description: 'Avísales de promociones, nuevos productos o cambios de precios directamente en su celular.',
      },
      {
        title: 'Funciona sin internet',
        description: 'El catálogo y la información básica funciona aunque no haya señal. Ideal para zonas con conexión inestable.',
      },
      {
        title: 'Rápida y nativa',
        description: 'Desarrollamos apps nativas para Android, no webs disfrazadas. Rendimiento real, experiencia fluida.',
      },
    ],
    includes: [
      'Diseño de la app personalizado',
      'Desarrollo Android nativo',
      'Catálogo de productos',
      'Sistema de notificaciones push',
      'Login de clientes',
      'Sincronización con tu web',
      'Pruebas en múltiples dispositivos',
      'Publicación en Play Store',
      'Soporte por 30 días',
    ],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    accent: 'from-green-500 to-green-700',
    border: 'border-t-green-500',
  },
  {
    id: 'sistema',
    title: 'Sistemas a Medida',
    subtitle: 'Automatiza y digitaliza tu operación',
    description:
      'Para negocios con necesidades más complejas: control de almacén, gestión de clientes mayoristas, facturación electrónica, sistema de puntos de venta, control de despacho y mucho más. Analizamos tu negocio y construimos exactamente lo que necesitas.',
    benefits: [
      {
        title: 'Control de inventario completo',
        description: 'Entradas, salidas, stock mínimo, alertas automáticas. Sabe siempre cuánto tienes en almacén.',
      },
      {
        title: 'Facturación electrónica',
        description: 'Boletas y facturas electrónicas integradas con SUNAT. Cumple con la normativa sin complicaciones.',
      },
      {
        title: 'Gestión de clientes (CRM)',
        description: 'Historial de compras, créditos, estados de cuenta de cada cliente mayorista o minorista.',
      },
      {
        title: 'Reportes en tiempo real',
        description: 'Ventas del día, productos más vendidos, mejores clientes. Información para tomar mejores decisiones.',
      },
    ],
    includes: [
      'Consultoría inicial gratuita',
      'Análisis de tu negocio',
      'Diseño del sistema a medida',
      'Control de inventario',
      'Gestión de pedidos y clientes',
      'Facturación electrónica (SUNAT)',
      'Reportes y estadísticas',
      'Capacitación a tu equipo',
      'Soporte y mantenimiento',
    ],
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: 'from-pink-500 to-rose-600',
    border: 'border-t-pink-500',
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-chicha py-16 md:py-24">
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-display font-bold mb-6 border border-primary-500/30">
              ✦ Nuestros Servicios
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
              Soluciones digitales{' '}
              <span className="chicha-text">económicas</span>{' '}
              para tu negocio
            </h1>
            <p className="text-lg text-gray-300 mb-10">
              Desde una página web básica hasta un sistema completo para tu empresa mayorista.
              Todo con precios justos y soporte real en Lima, Perú.
            </p>

            {/* Navegación rápida */}
            <nav className="flex flex-wrap justify-center gap-3" aria-label="Ir al servicio">
              {serviciosData.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-gray-300 hover:text-primary-400 hover:bg-primary-500/15 hover:border-primary-500/40 transition-colors"
                >
                  {s.title.split(' ').slice(0, 3).join(' ')}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ===== SERVICIOS DETALLADOS ===== */}
      {serviciosData.map((servicio, index) => (
        <section
          key={servicio.id}
          id={servicio.id}
          className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          aria-labelledby={`${servicio.id}-heading`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
              {/* Contenido */}
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${servicio.accent} flex items-center justify-center mb-6 shadow-lg`}>
                  <div className="w-8 h-8 text-white">{servicio.icon}</div>
                </div>

                <span className="text-primary-600 font-display font-bold text-sm uppercase tracking-wide">
                  {servicio.subtitle}
                </span>
                <h2
                  id={`${servicio.id}-heading`}
                  className="font-display font-black text-3xl md:text-4xl text-gray-900 mt-2 mb-4"
                >
                  {servicio.title}
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{servicio.description}</p>

                {/* Beneficios */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {servicio.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="font-display font-bold text-gray-900 mb-1 text-base">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contacto" className="btn-primary">
                    Pedir cotización
                  </Link>
                  <a
                    href="https://wa.me/51900000000?text=Hola%2C%20quiero%20info%20sobre%20el%20servicio%20de%20web"
                    className="btn-whatsapp"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Qué incluye */}
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="bg-chicha rounded-2xl p-8 text-white border border-white/10">
                  <h3 className="font-display text-xl font-bold mb-6 flex items-center text-primary-400">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ¿Qué incluye?
                  </h3>
                  <ul className="space-y-3">
                    {servicio.includes.map((item, iIndex) => (
                      <li key={iIndex} className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== CTA FINAL ===== */}
      <section className="section bg-gradient-to-br from-accent-600 to-purple-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="text-3xl mb-6">✦ ✦ ✦</div>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6">
              ¿No sabes qué servicio necesitas?
            </h2>
            <p className="text-lg text-red-100 mb-8">
              No te preocupes. Cuéntanos tu situación y te asesoramos sin compromiso
              sobre la mejor solución para tu negocio y tu presupuesto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/51900000000"
                className="btn-whatsapp text-lg px-8 py-4"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultarnos por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent-700 font-display font-bold rounded-xl hover:bg-red-50 transition-colors shadow-lg"
              >
                Formulario de contacto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
