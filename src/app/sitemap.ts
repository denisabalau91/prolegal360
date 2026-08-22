import type { MetadataRoute } from 'next';
import { urlCanonica } from '@/utils/seo';

export const dynamic = 'force-static';

interface EntradaSitemap {
  ruta: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}

const RUTAS: EntradaSitemap[] = [
  { ruta: '/', changeFrequency: 'weekly', priority: 1 },
  { ruta: '/departamento-juridico', changeFrequency: 'monthly', priority: 0.95 },
  { ruta: '/asesoria-laboral', changeFrequency: 'monthly', priority: 0.9 },
  { ruta: '/asesoria-fiscal', changeFrequency: 'monthly', priority: 0.85 },
  { ruta: '/precios', changeFrequency: 'monthly', priority: 0.85 },
  { ruta: '/calculadora', changeFrequency: 'monthly', priority: 0.8 },
  { ruta: '/cambiar-de-asesoria', changeFrequency: 'monthly', priority: 0.75 },
  { ruta: '/sectores', changeFrequency: 'monthly', priority: 0.7 },
  { ruta: '/sobre-nosotros', changeFrequency: 'monthly', priority: 0.7 },
  { ruta: '/casos-de-exito', changeFrequency: 'monthly', priority: 0.65 },
  { ruta: '/recursos', changeFrequency: 'monthly', priority: 0.65 },
  { ruta: '/contacto', changeFrequency: 'yearly', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS.map(({ ruta, changeFrequency, priority }) => ({
    url: urlCanonica(ruta),
    changeFrequency,
    priority,
  }));
}
