import type { ReactNode } from 'react';
import { CookieBanner } from '@/components/features/CookieBanner';
import { SiteFooter } from '@/components/features/SiteFooter';
import { SiteHeader } from '@/components/features/SiteHeader';
import { WhatsAppFloat } from '@/components/features/WhatsAppFloat';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      <div className="site-content">{children}</div>
      <SiteFooter />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
