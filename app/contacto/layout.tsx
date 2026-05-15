import { generatePageMetadata } from '@/lib/seo';

/**
 * Layout de la página de Contacto
 *
 * Este archivo permite definir metadatos para páginas que
 * usan 'use client' en su componente principal.
 * Next.js combina los metadatos del layout con los de la página.
 */

// Metadatos SEO de la página de contacto
export const metadata = generatePageMetadata({
  title: 'Contacto',
  description:
    'Contacta con Apps Como Cancha para solicitar presupuesto de desarrollo web, ecommerce o aplicaciones Android. Respuesta en menos de 24 horas, sin compromiso.',
  path: '/contacto',
  keywords: [
    'contacto desarrollo web',
    'presupuesto página web',
    'presupuesto ecommerce',
    'presupuesto app Android',
  ],
});

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
