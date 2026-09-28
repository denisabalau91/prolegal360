import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, Sora } from 'next/font/google';
import { MARCA } from '@/core/domain/site';
import '@/styles/globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(MARCA.url),
  title: {
    default: `Asesoría integral con departamento jurídico incluido | ${MARCA.nombreCorto}`,
    template: `%s | ${MARCA.nombreCorto}`,
  },
  description:
    'Asesoría laboral con departamento jurídico incluido, fiscal y contabilidad, subvenciones y administración de fincas. Tarifas publicadas.',
  applicationName: MARCA.nombre,
  creator: MARCA.nombre,
  publisher: MARCA.nombre,
  category: 'Servicios jurídicos y asesoría para empresas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: MARCA.nombre,
    title: `Asesoría integral con departamento jurídico incluido | ${MARCA.nombreCorto}`,
    description: `${MARCA.lema} ${MARCA.lemaDestacado} Tarifas publicadas y calculadora de coste laboral.`,
    images: [
      {
        url: '/images/hero-oficina.jpg',
        width: 1600,
        height: 1068,
        alt: `${MARCA.nombre}: asesoría integral para empresas`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Asesoría integral con departamento jurídico incluido | ${MARCA.nombreCorto}`,
    description: `${MARCA.lema} ${MARCA.lemaDestacado}`,
    images: ['/images/hero-oficina.jpg'],
  },
  verification:
    googleSiteVerification || bingSiteVerification
      ? {
          google: googleSiteVerification,
          other: bingSiteVerification
            ? {
                'msvalidate.01': bingSiteVerification,
              }
            : undefined,
        }
      : undefined,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es-ES">
      <body className={`${sora.variable} ${manrope.variable}`}>
        <div className="site-shell">
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
