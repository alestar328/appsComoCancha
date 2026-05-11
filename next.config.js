/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes externas (Unsplash y similares)
  images: {
    // Para static export, las imágenes no se optimizan en servidor
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  // Generación estática (SSG) - permite deploy en cualquier hosting estático
  // Comentar esta línea si se necesita ISR o SSR en producción
  output: 'export',
  // Trailing slashes para compatibilidad con hosting estático
  trailingSlash: true,
};

module.exports = nextConfig;
