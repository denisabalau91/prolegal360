import type { Metadata } from 'next';
import { CheckList } from '@/components/features/CheckList';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import { IconoFlechaDerecha } from '@/components/ui/icons';
import { MARCA } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import styles from '@/app/(site)/sectores/sectores.module.css';

export const metadata: Metadata = {
  title: `Sectores | ${MARCA.nombre}`,
  description:
    'Trabajamos sobre todo con cuatro sectores intensivos en mano de obra: hostelería, construcción, comercio y seguridad y limpieza.',
};

interface Sector {
  id: string;
  numero: string;
  nombre: string;
  descripcion: string;
  puntos: string[];
  imagen: string;
  imagenAlt: string;
}

const SECTORES: Sector[] = [
  {
    id: 'hosteleria',
    numero: '01',
    nombre: 'Hostelería',
    descripcion:
      'Alta rotación, contratos a tiempo parcial y control de jornada. El sector donde más actúa la Inspección de Trabajo.',
    puntos: [
      'Registro de jornada y horas complementarias',
      'Contratos fijos discontinuos y de temporada',
      'Convenio de hostelería por provincia',
      'Gestión de extras y altas de fin de semana',
    ],
    imagen: '/images/sector-hosteleria.jpg',
    imagenAlt: 'Asesoría para el sector de hostelería',
  },
  {
    id: 'construccion',
    numero: '02',
    nombre: 'Construcción',
    descripcion:
      'Convenio propio, obligaciones de prevención y subcontratación. Cada obra tiene su propio expediente.',
    puntos: [
      'Convenio general del sector de la construcción',
      'Coordinación con la documentación de PRL',
      'Contratos por obra y servicio adaptados a la reforma',
      'Certificados de estar al corriente para licitaciones',
    ],
    imagen: '/images/sector-construccion.jpg',
    imagenAlt: 'Asesoría para el sector de construcción',
  },
  {
    id: 'comercio',
    numero: '03',
    nombre: 'Comercio',
    descripcion:
      'Márgenes ajustados, mucho volumen de facturas y campañas con picos de plantilla.',
    puntos: [
      'Alto volumen de facturas y control de IVA',
      'Contratación de refuerzo en campaña',
      'Recargo de equivalencia y regímenes especiales',
      'Revisión de contratos de arrendamiento de local',
    ],
    imagen: '/images/sector-comercio.jpg',
    imagenAlt: 'Asesoría para el sector de comercio',
  },
  {
    id: 'seguridad-limpieza',
    numero: '04',
    nombre: 'Seguridad y limpieza',
    descripcion:
      'Subrogación de personal, pliegos y plantillas grandes. Un error en la subrogación cuesta muy caro.',
    puntos: [
      'Subrogación de personal entre contratas',
      'Plantillas grandes con altas y bajas diarias',
      'Pliegos y contratos con la Administración',
      'Planes de igualdad y auditorías retributivas',
    ],
    imagen: '/images/sector-limpieza.jpg',
    imagenAlt: 'Asesoría para el sector de seguridad y limpieza',
  },
];

export default function SectoresPage() {
  return (
    <>
      <PageHero
        antetitulo="Sectores"
        titulo="Cada sector tiene su convenio, sus plazos y sus sustos"
        descripcion="Trabajamos sobre todo con cuatro sectores intensivos en mano de obra, donde la gestión laboral y el respaldo jurídico marcan la diferencia."
      />

      <Section fondo="base">
        <div className={styles.lista}>
          {SECTORES.map((sector, indice) => (
            <article
              key={sector.id}
              id={sector.id}
              className={[styles.sector, indice % 2 === 1 ? styles.sectorInvertido : '']
                .filter(Boolean)
                .join(' ')}
            >
              <figure className={styles.figura}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={conBasePath(sector.imagen)}
                  alt={sector.imagenAlt}
                  className={styles.imagen}
                />
              </figure>
              <div className={styles.contenido}>
                <p className={styles.antetitulo}>Sector {sector.numero}</p>
                <h2 className={styles.titulo}>{sector.nombre}</h2>
                <p className={styles.descripcion}>{sector.descripcion}</p>
                <div className={styles.puntos}>
                  <CheckList items={sector.puntos} />
                </div>
                <ButtonLink href="/contacto" variant="outline" className={styles.boton}>
                  Hablar con un especialista{' '}
                  <IconoFlechaDerecha className={styles.iconoBoton} />
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section fondo="arena">
        <div className={styles.cabeceraCentrada}>
          <SectionHeader
            antetitulo="¿No es tu sector?"
            titulo="También trabajamos con otros perfiles"
            descripcion="Talleres, clínicas, academias, transporte, servicios profesionales y empresas de instalación. Si tienes plantilla y obligaciones fiscales, encajamos."
          />
        </div>
        <div className={styles.cierre}>
          <ButtonLink href="/calculadora" size="lg" className={styles.botonCierre}>
            Calcular mi cuota
          </ButtonLink>
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
