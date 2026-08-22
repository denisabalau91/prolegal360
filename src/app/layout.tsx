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

export const metadata: Metadata = {
  title: 'Asesoría laboral, fiscal y jurídica para empresas | Precios publicados',
  description:
    'Asesoría laboral, fiscal y jurídica para empresas y autónomos con precios publicados desde 45 €/mes y departamento jurídico propio incluido. Primer mes de servicio jurídico gratis.',
  openGraph: {
    title: `Asesoría laboral, fiscal y jurídica para empresas | ${MARCA.nombre}`,
    description:
      'Precios publicados y departamento jurídico incluido. No solo llevamos tus papeles: también damos la cara por ti.',
    url: MARCA.url,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className={`${sora.variable} ${manrope.variable}`}>
        <div className="site-shell">
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
