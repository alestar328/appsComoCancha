import Image from 'next/image';
import Link from 'next/link';

/**
 * Tarjeta de proyecto para el portafolio
 *
 * Props:
 * - image: URL de la imagen (desde Unsplash)
 * - title: Nombre del proyecto
 * - category: Tipo de proyecto (Web, Ecommerce, App)
 * - description: Descripción breve del proyecto
 * - technologies: Tecnologías utilizadas
 * - href: Enlace al caso de estudio (opcional)
 *
 * Diseño:
 * - Imagen con overlay en hover
 * - Badge de categoría
 * - Lista de tecnologías como tags
 */

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  href?: string;
  isPlaceholder?: boolean;
}

export default function ProjectCard({
  image,
  title,
  category,
  description,
  technologies,
  href,
  isPlaceholder = false,
}: ProjectCardProps) {
  // Contenido de la tarjeta (reutilizable con o sin enlace)
  const cardContent = (
    <>
      {/* Contenedor de imagen */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-gray-100">
        <Image
          src={image}
          alt={`Proyecto: ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge de categoría */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-700 rounded-full">
          {category}
        </span>

        {/* Indicador de placeholder */}
        {isPlaceholder && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-accent-500/90 backdrop-blur-sm text-xs font-semibold text-white rounded-full">
            Demo
          </span>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6">
        {/* Título del proyecto */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tecnologías utilizadas */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Indicador de enlace */}
        {href && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="inline-flex items-center text-primary-600 text-sm font-semibold">
              Ver proyecto
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </>
  );

  // Renderizar como enlace si hay href, sino como div
  if (href) {
    return (
      <Link
        href={href}
        className="card group block overflow-hidden"
        aria-label={`Ver proyecto: ${title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article className="card group overflow-hidden" aria-labelledby={`project-${title}`}>
      {cardContent}
    </article>
  );
}
