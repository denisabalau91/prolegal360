import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { IconoFlechaDerecha } from '@/components/ui/icons';
import { MARCA } from '@/core/domain/site';
import styles from '@/components/features/blocks.module.css';

type FondoSeccion = 'base' | 'arena' | 'navy';

const clasesFondo: Record<FondoSeccion, string> = {
  base: styles.fondoBase,
  arena: styles.fondoArena,
  navy: styles.fondoNavy,
};

interface SectionProps {
  id?: string;
  fondo?: FondoSeccion;
  children: ReactNode;
}

export function Section({ id, fondo = 'base', children }: SectionProps) {
  return (
    <section id={id} className={`${styles.seccion} ${clasesFondo[fondo]}`}>
      <div className={styles.interior}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  antetitulo: string;
  titulo: string;
  descripcion?: string;
  claro?: boolean;
}

export function SectionHeader({ antetitulo, titulo, descripcion, claro }: SectionHeaderProps) {
  return (
    <div className={styles.cabecera}>
      <p className={styles.antetitulo}>{antetitulo}</p>
      <h2 className={[styles.titulo, claro ? styles.tituloClaro : ''].filter(Boolean).join(' ')}>
        {titulo}
      </h2>
      {descripcion && (
        <p
          className={[styles.descripcion, claro ? styles.descripcionClara : '']
            .filter(Boolean)
            .join(' ')}
        >
          {descripcion}
        </p>
      )}
    </div>
  );
}

interface PageHeroProps {
  antetitulo: string;
  titulo: string;
  descripcion?: string;
  imagen?: string;
  acciones?: ReactNode;
}

export function PageHero({ antetitulo, titulo, descripcion, imagen, acciones }: PageHeroProps) {
  return (
    <section className={styles.pageHero}>
      {imagen && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagen}
            alt=""
            aria-hidden="true"
            width={1600}
            height={1067}
            fetchPriority="high"
            decoding="async"
            className={styles.pageHeroImagen}
          />
          <div className={styles.pageHeroDegradado} />
        </>
      )}
      <div className={`bg-grid ${styles.pageHeroRejilla}`} aria-hidden="true" />
      <div className={styles.pageHeroInterior}>
        <div className={`animate-rise ${styles.pageHeroContenido}`}>
          <p className={styles.pageHeroAntetitulo}>{antetitulo}</p>
          <h1 className={styles.pageHeroTitulo}>{titulo}</h1>
          {descripcion && <p className={styles.pageHeroDescripcion}>{descripcion}</p>}
          {acciones && <div className={styles.pageHeroAcciones}>{acciones}</div>}
        </div>
      </div>
    </section>
  );
}

interface HeroPrecioProps {
  importe: string;
  sufijo?: string;
  nota?: ReactNode;
  botonTexto: string;
  botonHref: string;
}

export function HeroPrecio({
  importe,
  sufijo = '/mes',
  nota,
  botonTexto,
  botonHref,
}: HeroPrecioProps) {
  return (
    <div className={styles.heroPrecio}>
      <div className={styles.heroPrecioBloque}>
        <p className={styles.heroPrecioImporte}>
          {importe}
          <span className={styles.heroPrecioSufijo}>{sufijo}</span>
        </p>
        {nota && <p className={styles.heroPrecioNota}>{nota}</p>}
      </div>
      <ButtonLink href={botonHref} size="lg" className={styles.heroPrecioBoton}>
        {botonTexto} <IconoFlechaDerecha className={styles.heroPrecioIcono} />
      </ButtonLink>
    </div>
  );
}

interface CtaFinalProps {
  titulo?: string;
  descripcion?: string;
}

export function CtaFinal({
  titulo = '¿Cuánto te costaría tenerlo todo cubierto?',
  descripcion = 'Calcula tu cuota en un minuto o reserva 20 minutos con nosotros. Sin compromiso y sin llamadas comerciales insistentes.',
}: CtaFinalProps) {
  return (
    <section className={styles.cta}>
      <div className={`bg-grid ${styles.ctaRejilla}`} aria-hidden="true" />
      <div className={styles.ctaInterior}>
        <div className={styles.ctaContenido}>
          <div className={styles.ctaTextos}>
            <h2 className={styles.ctaTitulo}>{titulo}</h2>
            <p className={styles.ctaDescripcion}>{descripcion}</p>
            <p className={styles.ctaTelefono}>
              También puedes llamarnos al{' '}
              <a href={`tel:${MARCA.telefonoLimpio}`} className={styles.ctaEnlaceTelefono}>
                {MARCA.telefono}
              </a>
              . {MARCA.horario}.
            </p>
          </div>
          <div className={styles.ctaBotones}>
            <ButtonLink href="/calculadora" size="lg" className={styles.ctaBotonPrincipal}>
              Calcula tu cuota en 1 minuto <IconoFlechaDerecha className={styles.ctaIconoFlecha} />
            </ButtonLink>
            <ButtonLink href="/contacto" size="lg" className={styles.ctaBotonSecundario}>
              Reserva 20 min gratis
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
