import { MetadataRoute } from 'next';

/**
 * Generador de robots.txt para Hispania Tech
 *
 * Next.js genera automáticamente el archivo robots.txt
 * basándose en esta configuración.
 *
 * Configuración:
 * - Permite indexación de todas las páginas públicas
 * - Bloquea rutas de API y administrativas
 * - Incluye referencia al sitemap
 */

// URL base del sitio (actualizar en producción)
const BASE_URL = 'https://appscomocancha.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // Reglas para todos los bots
      userAgent: '*',
      // Permitir todas las páginas públicas
      allow: '/',
      // Bloquear rutas que no deben indexarse
      disallow: [
        '/api/', // Rutas de API
        '/admin/', // Panel de administración (futuro)
        '/_next/', // Archivos internos de Next.js
        '/private/', // Contenido privado (futuro)
      ],
    },
    // Referencia al sitemap para los bots
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
