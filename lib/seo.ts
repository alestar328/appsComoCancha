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

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${BASE_URL}/#business`,
  name: 'Apps Como Cancha',
  url: BASE_URL,
  description:
    'Desarrollo de páginas web, tiendas online y apps Android económicas para pequeños negocios en Lima, Perú.',
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  telephone: '+51900000000',
  priceRange: 'S/. 500 - S/. 2000+',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lima',
    addressRegion: 'Lima',
    addressCountry: 'PE',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Lima',
      containedInPlace: {
        '@type': 'Country',
        name: 'Perú',
      },
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+51900000000',
    contactType: 'customer service',
    contactOption: 'TollFree',
    availableLanguage: ['Spanish'],
    areaServed: 'PE',
  },
  sameAs: [],
};

export const servicesJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Página Web Profesional',
    description:
      'Diseño web profesional con SEO incluido, adaptado para celular y PC. Landing page o sitio de hasta 5 secciones para negocios peruanos.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: 'Lima, Perú',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PEN',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 500,
        maxPrice: 900,
        priceCurrency: 'PEN',
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tienda Online / Ecommerce',
    description:
      'Tienda online con integración de Yape, Plin y tarjetas, catálogo de productos ilimitado y portal de pedidos B2B para mayoristas.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: 'Lima, Perú',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PEN',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 1500,
        maxPrice: 2800,
        priceCurrency: 'PEN',
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'App Android',
    description:
      'Aplicación Android publicada en Google Play Store con notificaciones push y modo offline para negocios peruanos.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: 'Lima, Perú',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PEN',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 2000,
        maxPrice: 3800,
        priceCurrency: 'PEN',
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sistema a Medida',
    description:
      'Sistema personalizado con base de datos, facturación electrónica SUNAT, control de inventario y reportes en tiempo real.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: 'Lima, Perú',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PEN',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 1500,
        maxPrice: 3200,
        priceCurrency: 'PEN',
      },
    },
  },
];

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una página web para mi negocio en Lima?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una página web profesional comienza desde S/. 500 para landing pages o sitios de hasta 5 secciones. El precio final depende de la complejidad y los extras como panel de administración (S/. 300–500), SEO avanzado (S/. 150–250) o integración con WhatsApp (S/. 150–250).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo demora desarrollar una página web o tienda online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una página web simple demora entre 1 y 2 semanas. Una tienda online completa puede tardar entre 3 y 5 semanas. Una app Android entre 4 y 8 semanas. Un sistema a medida con base de datos entre 4 y 7 semanas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Pueden integrar Yape y Plin en la tienda online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, integramos Yape, Plin y tarjetas de crédito/débito en tiendas online. Esta integración tiene un costo adicional de S/. 400 a S/. 600. También podemos integrar pasarelas de pago internacionales según lo requiera el negocio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Incluyen facturación electrónica compatible con SUNAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, ofrecemos módulo de facturación electrónica homologado con SUNAT para sistemas, tiendas online y web apps. El costo de este módulo va desde S/. 600 a S/. 900 adicionales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Para qué tipo de negocios peruanos trabajan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trabajamos con pequeños y medianos negocios peruanos: bodegas, ferreterías, mayoristas, restaurantes, veterinarias, salones de belleza y cualquier comercio que quiera vender por internet. Estamos especializados en el mercado de Lima y Perú.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Desarrollan apps Android además de páginas web?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, desarrollamos aplicaciones Android que se publican en Google Play Store. Incluyen notificaciones push y pueden funcionar sin internet (modo offline). El precio base es desde S/. 2,000.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo obtener una cotización gratis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puedes cotizar gratis por WhatsApp al +51 900 000 000 o completar el formulario de contacto en nuestra web. También tenemos una calculadora de presupuesto online para obtener una estimación instantánea. Respondemos en menos de 24 horas sin ningún compromiso.',
      },
    },
  ],
};

export const organizationJsonLd = localBusinessJsonLd;
