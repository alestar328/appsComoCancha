import { MetadataRoute } from 'next';

/**
 * Generador de Sitemap para Apps Como Cancha
 *
 * Next.js genera automáticamente el archivo sitemap.xml
 * basándose en esta configuración.
 *
 * Incluye todas las páginas públicas del sitio con:
 * - URL canónica
 * - Fecha de última modificación
 * - Frecuencia de cambio
 * - Prioridad relativa
 */

// URL base del sitio (actualizar en producción)
const BASE_URL = 'https://appscomocancha.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Fecha actual para lastModified
  const currentDate = new Date();

  return [
    {
      // Página principal - máxima prioridad
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      // Página de servicios - alta prioridad
      url: `${BASE_URL}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      // Página de proyectos - actualización frecuente
      url: `${BASE_URL}/proyectos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      // Página sobre nosotros
      url: `${BASE_URL}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      // Página de contacto - importante para conversiones
      url: `${BASE_URL}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
