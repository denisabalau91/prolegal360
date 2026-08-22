import type { Metadata } from 'next';
import { MARCA } from '@/core/domain/site';

const IMAGEN_SOCIAL_PREDETERMINADA = '/images/hero-oficina.jpg';

interface CrearMetadataParams {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen?: string;
  imagenAlt?: string;
  noIndex?: boolean;
}

function normalizarRuta(ruta: string): string {
  if (ruta === '/') {
    return '/';
  }

  return `/${ruta.replace(/^\/+|\/+$/g, '')}/`;
}

export function urlCanonica(ruta: string): string {
  return new URL(normalizarRuta(ruta), `${MARCA.url}/`).toString();
}

export function crearMetadata({
  titulo,
  descripcion,
  ruta,
  imagen = IMAGEN_SOCIAL_PREDETERMINADA,
  imagenAlt = `${MARCA.nombre}: asesoría y servicios jurídicos para empresas`,
  noIndex = false,
}: CrearMetadataParams): Metadata {
  const canonical = urlCanonica(ruta);
  const imagenAbsoluta = new URL(imagen, `${MARCA.url}/`).toString();
  const tituloSocial = `${titulo} | ${MARCA.nombreCorto}`;

  return {
    title: titulo,
    description: descripcion,
    alternates: {
      canonical,
      languages: {
        'es-ES': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      siteName: MARCA.nombre,
      title: tituloSocial,
      description: descripcion,
      url: canonical,
      images: [
        {
          url: imagenAbsoluta,
          alt: imagenAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tituloSocial,
      description: descripcion,
      images: [imagenAbsoluta],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}

export const DATOS_ESTRUCTURADOS_SITIO: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${MARCA.url}/#website`,
      url: `${MARCA.url}/`,
      name: MARCA.nombre,
      alternateName: MARCA.nombreCorto,
      inLanguage: 'es-ES',
      publisher: {
        '@id': `${MARCA.url}/#organization`,
      },
    },
    {
      '@type': 'LegalService',
      '@id': `${MARCA.url}/#organization`,
      name: MARCA.nombre,
      alternateName: MARCA.nombreCorto,
      url: `${MARCA.url}/`,
      logo: `${MARCA.url}/images/logo-prolegal360.png`,
      image: `${MARCA.url}/images/hero-oficina.jpg`,
      telephone: MARCA.telefonoLimpio,
      email: MARCA.email,
      priceRange: '€€',
      knowsLanguage: 'es',
      openingHours: 'Mo-Fr 09:00-17:00',
      address: {
        '@type': 'PostalAddress',
        streetAddress: MARCA.direccion,
        postalCode: MARCA.codigoPostal,
        addressLocality: MARCA.ciudad,
        addressRegion: MARCA.provincia,
        addressCountry: MARCA.pais,
      },
      areaServed: {
        '@type': 'Country',
        name: 'España',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: MARCA.telefonoLimpio,
        contactType: 'customer service',
        areaServed: 'ES',
        availableLanguage: ['es'],
      },
      parentOrganization: {
        '@type': 'Organization',
        name: MARCA.nombreCorto,
        url: MARCA.grupoUrl,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios para empresas',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Abogado laboral para empresas',
              url: `${MARCA.url}/departamento-juridico/`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Asesoría laboral para empresas',
              url: `${MARCA.url}/asesoria-laboral/`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Asesoría fiscal para empresas y autónomos',
              url: `${MARCA.url}/asesoria-fiscal/`,
            },
          },
        ],
      },
    },
  ],
};
