import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { generatePageMetadata } from '@/lib/seo';

/**
 * Página de Proyectos de Apps Como Cancha
 *
 * Estado: Placeholder con proyectos de demostración
 * Los proyectos mostrados son ejemplos representativos
 * de los tipos de trabajos que realizamos.
 *
 * Secciones:
 * 1. Hero de proyectos
 * 2. Grid de proyectos demo
 * 3. CTA para nuevos proyectos
 */

// Metadatos SEO de la página
export const metadata = generatePageMetadata({
  title: 'Proyectos y Portafolio',
  description:
    'Conoce algunos de nuestros proyectos de desarrollo web, ecommerce y aplicaciones Android. Ejemplos de trabajos realizados para empresas en España y Latinoamérica.',
  path: '/proyectos',
  keywords: ['portafolio desarrollo web', 'proyectos ecommerce', 'apps Android ejemplos'],
});

// Proyectos de demostración (placeholder)
// Imágenes de Unsplash relacionadas con tecnología
const proyectosDemo = [
  {
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    title: 'Portal Corporativo TechSolutions',
    category: 'Web Corporativa',
    description:
      'Sitio web institucional para empresa de consultoría tecnológica. Diseño moderno con enfoque en generación de leads.',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    isPlaceholder: true,
  },
  {
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    title: 'Ecommerce ModaStyle',
    category: 'Tienda Online',
    description:
      'Tienda online de moda con catálogo de más de 500 productos, gestión de tallas y colores, y múltiples métodos de pago.',
    technologies: ['WooCommerce', 'PHP', 'MySQL'],
    isPlaceholder: true,
  },
  {
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    title: 'App FitTrack',
    category: 'App Android',
    description:
      'Aplicación de seguimiento fitness con rutinas personalizadas, tracking de progreso y notificaciones motivacionales.',
    technologies: ['Kotlin', 'Firebase', 'Room DB'],
    isPlaceholder: true,
  },
  {
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
    title: 'Dashboard Analytics Pro',
    category: 'Solución a Medida',
    description:
      'Panel de control personalizado para visualización de métricas de negocio en tiempo real con múltiples integraciones.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    isPlaceholder: true,
  },
  {
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
    title: 'Web Agencia Creativa Luna',
    category: 'Web Corporativa',
    description:
      'Sitio web para agencia de diseño con portafolio interactivo, animaciones fluidas y formulario de solicitud de proyectos.',
    technologies: ['Next.js', 'Framer Motion', 'Sanity CMS'],
    isPlaceholder: true,
  },
  {
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
    title: 'Marketplace LocalFood',
    category: 'Tienda Online',
    description:
      'Plataforma de venta de productos locales con sistema de proveedores, geolocalización y entregas programadas.',
    technologies: ['Shopify', 'Liquid', 'APIs REST'],
    isPlaceholder: true,
  },
];

// Categorías para filtrado futuro
const categorias = [
  { id: 'todos', label: 'Todos' },
  { id: 'web', label: 'Web Corporativa' },
  { id: 'ecommerce', label: 'Tienda Online' },
  { id: 'android', label: 'App Android' },
  { id: 'custom', label: 'Solución a Medida' },
];

export default function ProyectosPage() {
  return (
    <>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nuestros <span className="gradient-text">Proyectos</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Cada proyecto es una oportunidad de crear algo único.
              Aquí encontrarás ejemplos del tipo de trabajo que realizamos
              para nuestros clientes.
            </p>

            {/* Nota de placeholder */}
            <div className="inline-flex items-center px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Los proyectos mostrados son ejemplos demostrativos. Pronto
                añadiremos casos reales de clientes.
              </span>
            </div>

            {/* Filtros de categoría (preparado para funcionalidad futura) */}
            <nav
              className="flex flex-wrap justify-center gap-2 mt-8"
              aria-label="Filtrar por categoría"
            >
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat.id === 'todos'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50 border border-gray-200'
                  }`}
                  aria-pressed={cat.id === 'todos'}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ===================== GRID DE PROYECTOS ===================== */}
      <section className="section bg-white" aria-labelledby="proyectos-grid">
        <div className="container-custom">
          <h2 id="proyectos-grid" className="sr-only">
            Lista de proyectos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectosDemo.map((proyecto, index) => (
              <ProjectCard
                key={index}
                image={proyecto.image}
                title={proyecto.title}
                category={proyecto.category}
                description={proyecto.description}
                technologies={proyecto.technologies}
                isPlaceholder={proyecto.isPlaceholder}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ESTADÍSTICAS ===================== */}
      <section className="py-16 bg-gray-50" aria-labelledby="estadisticas">
        <div className="container-custom">
          <h2 id="estadisticas" className="sr-only">
            Estadísticas de proyectos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Proyectos Entregados', note: 'Meta 2025' },
              { value: '40+', label: 'Clientes Satisfechos', note: 'Meta 2025' },
              { value: '4', label: 'Tipos de Servicio', note: 'Web, Ecommerce, Apps, Custom' },
              { value: '2', label: 'Continentes', note: 'España + LATAM' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-900 font-medium">{stat.label}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA SECTION ===================== */}
      <section className="section bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Quieres que tu proyecto aparezca aquí?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Cada proyecto exitoso empieza con una conversación. Cuéntanos tu
              idea y juntos la haremos realidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors shadow-lg"
              >
                Empezar mi proyecto
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
