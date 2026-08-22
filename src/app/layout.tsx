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
    default: `Asesoría y abogados para empresas en España | ${MARCA.nombreCorto}`,
    template: `%s | ${MARCA.nombreCorto}`,
  },
  description:
    'Asesoría laboral, fiscal y jurídica para empresas y autónomos de toda España, con precios publicados y abogado laboral propio.',
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
    title: `Asesoría y abogados para empresas en España | ${MARCA.nombreCorto}`,
    description:
      'Asesoría laboral, fiscal y jurídica para empresas de toda España. Precios publicados y abogado laboral propio.',
    images: [
      {
        url: '/images/hero-oficina.jpg',
        width: 1600,
        height: 1068,
        alt: `${MARCA.nombre}: asesoría y abogados para empresas`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Asesoría y abogados para empresas en España | ${MARCA.nombreCorto}`,
    description:
      'Asesoría laboral, fiscal y jurídica para empresas de toda España, con precios publicados.',
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
