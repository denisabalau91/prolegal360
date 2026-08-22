import type { MetadataRoute } from 'next';
import { MARCA } from '@/core/domain/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${MARCA.url}/sitemap.xml`,
    host: MARCA.url,
  };
}
