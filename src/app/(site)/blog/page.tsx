import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaFinal, PageHero, Section } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';
import styles from '@/app/(site)/blog/blog.module.css';

export const metadata: Metadata = {
  title: `Blog | ${MARCA.nombre}`,
  description:
    'Inspecciones, despidos, cierre fiscal, convenios y novedades normativas, explicado sin jerga.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        antetitulo="Blog"
        titulo="Lo que necesitas saber, explicado sin jerga"
        descripcion="Inspecciones, despidos, cierre fiscal, convenios y novedades normativas. Escrito por el equipo que lo gestiona todos los días."
      />
      <Section fondo="base">
        <div className={styles.vacio}>
          <p className={styles.texto}>
            Estamos preparando los primeros artículos. Vuelve pronto o{' '}
            <Link href="/recursos" className={styles.enlace}>
              descarga nuestro checklist de cierre fiscal
            </Link>
            .
          </p>
        </div>
      </Section>
      <CtaFinal
        titulo="¿Te ha surgido una duda leyendo?"
        descripcion="Nuestros clientes nos preguntan estas cosas y las responde el departamento jurídico en 24 h laborables."
      />
    </>
  );
}
