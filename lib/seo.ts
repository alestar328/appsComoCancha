import { Metadata } from 'next';

const BASE_URL = 'https://appscomocancha.com';

const COMPANY = {
  name: 'Apps Como Cancha',
  description:
    'Páginas web, tiendas online y apps Android económicas para pequeños comercios peruanos. Bodegas, ferreterías, mayoristas, restaurantes y más. Precios al alcance de todos.',
  keywords: [
    'páginas web Lima',
    'desarrollo web Perú',
    'tienda online Perú',
    'app Android Lima',
    'ecommerce Perú',
    'diseño web barato Lima',
    'páginas web económicas',
    'sistema mayoristas Perú',
    'catálogo digital Perú',
    'apps pequeños negocios Peru',
    'bodega online',
    'ferretería web',
    'appscomocancha',
    'páginas web para negocios',
  ],
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${COMPANY.name} | Webs y Apps Económicas para tu Negocio en Perú`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: COMPANY.keywords,
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: BASE_URL,
    siteName: COMPANY.name,
    title: COMPANY.name,
    description: COMPANY.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY.name,
    description: COMPANY.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface PageMetadataParams {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
}: PageMetadataParams): Metadata {
  const url = `${BASE_URL}${path}`;
  const allKeywords = [...COMPANY.keywords, ...keywords];

  return {
    title,
    description,
    keywords: allKeywords,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | ${COMPANY.name}`,
      description,
      url,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | ${COMPANY.name}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  description: COMPANY.description,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Spanish'],
    areaServed: 'PE',
  },
  areaServed: [{ '@type': 'Country', name: 'Peru' }],
  sameAs: [],
};

export function generateServiceJsonLd(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
    areaServed: 'Peru',
  };
}
