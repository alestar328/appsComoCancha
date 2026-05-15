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
};

module.exports = nextConfig;
