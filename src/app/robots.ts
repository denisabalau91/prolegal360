import type { MetadataRoute } from 'next';
import { MARCA } from '@/core/domain/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'Google-Extended',
          'GoogleOther',
          'GoogleOther-Image',
          'GoogleOther-Video',
          'Google-CloudVertexBot',
          'Applebot-Extended',
          'CCBot',
          'PerplexityBot',
          'Perplexity-User',
          'Bytespider',
          'Amazonbot',
          'Meta-ExternalAgent',
          'meta-externalagent',
          'FacebookBot',
          'cohere-ai',
          'Diffbot',
          'ImagesiftBot',
          'omgili',
          'omgilibot',
          'YouBot',
        ],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${MARCA.url}/sitemap.xml`,
    host: MARCA.url,
  };
}
