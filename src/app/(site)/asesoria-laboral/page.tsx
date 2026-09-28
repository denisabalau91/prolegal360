import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import { CheckList } from '@/components/features/CheckList';
import { TablaTarifaLaboral } from '@/components/features/TablaTarifaLaboral';
import {
  CtaFinal,
  HeroPrecio,
  PageHero,
  Section,
  SectionHeader,
} from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import { IconoEscudoCheck, IconoReloj, IconoUsuarios } from '@/components/ui/icons';
import {
  TARIFA_LABORAL,
  TRABAJADORES_EJEMPLO,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';
import {
  AHORRO_PACK_POR_TRABAJADOR,
  PLANES,
  PRECIO_LABORAL_POR_TRABAJADOR,
} from '@/core/domain/site';
import { calcularCuotaLaboral, cotizarModalidad } from '@/core/use-cases/calcular-cuota';
import { conBasePath } from '@/utils/base-path';
import { crearMetadata } from '@/utils/seo';
import styles from '@/components/features/servicio.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Asesoría laboral para empresas: tarifa por trabajador',
  descripcion: `Nóminas, contratos, altas, bajas y Seguridad Social desde ${PRECIO_LABORAL_POR_TRABAJADOR} por trabajador y mes. Contrátala sola o con departamento jurídico.`,
  ruta: '/asesoria-laboral',
  imagen: '/images/hero-asesoria-laboral.jpg',
  imagenAlt: 'Asesoría laboral para empresas de PROLEGAL360',
});

const PLAN_LABORAL = PLANES.find((plan) => plan.id === 'laboral')!;
const [PRIMER_TRAMO] = TARIFA_LABORAL;
const EJEMPLO = calcularCuotaLaboral(TRABAJADORES_EJEMPLO)!;
const SOLO_LABORAL = cotizarModalidad('laboral', TRABAJADORES_EJEMPLO);
const SOLO_JURIDICO = cotizarModalidad('juridico', TRABAJADORES_EJEMPLO);
const PACK = cotizarModalidad('pack', TRABAJADORES_EJEMPLO);

interface Proceso {
  Icono: ComponentType<SVGProps<SVGSVGElement>>;
  titulo: string;
  texto: string;
}

const PROCESOS: Proceso[] = [
  {
    Icono: IconoUsuarios,
    titulo: 'Altas, bajas y contratos',
    texto:
      'Nos envías los datos del trabajador y nosotros preparamos el contrato, lo comunicamos al SEPE y tramitamos el alta en la Seguridad Social dentro de plazo.',
  },
  {
    Icono: IconoReloj,
    titulo: 'Nóminas cada mes, en fecha',
    texto:
      'Cerramos las incidencias del mes (horas, ausencias, variables) y entregamos nóminas y resúmenes antes del último día laborable.',
  },
  {
    Icono: IconoEscudoCheck,
    titulo: 'Seguros sociales y control de plazos',
    texto:
      'Presentamos RLC y RNT, vigilamos las notificaciones de la TGSS y te avisamos de los fines de contrato y de periodo de prueba antes de que venzan.',
  },
];

function importe(valor: number | null): string {
  return valor === null ? '—' : formatearImporte(valor);
}

export default function AsesoriaLaboralPage() {
  return (
    <>
      <PageHero
        antetitulo="Asesoría laboral"
        titulo="Asesoría laboral para empresas, con precio por trabajador"
        descripcion="Nóminas, seguros sociales, contratos y toda la relación con la Seguridad Social. Contrátala sola o con el departamento jurídico detrás para el día en que algo se tuerce."
        imagen={conBasePath('/images/hero-asesoria-laboral.jpg')}
        acciones={
          <HeroPrecio
            importe={PRECIO_LABORAL_POR_TRABAJADOR}
            sufijo="/trabajador"
            nota={`${formatearImporte(PRIMER_TRAMO.nomina)} nómina + ${formatearImporte(
              PRIMER_TRAMO.gestion,
            )} gestión · menos por volumen`}
            botonTexto="Calcular mi coste laboral"
            botonHref="/calculadora"
          />
        }
      />

      <Section fondo="base">
        <div className={styles.rejillaDos}>
          <div>
            <SectionHeader
              antetitulo="Tarifa laboral"
              titulo="Pagas por trabajador, y cuantos más son, menos por cada uno"
              descripcion="Nómina y gestión por trabajador y mes, según el tamaño de tu plantilla. Sin cuota base ni extras por trámites corrientes."
            />
            <TablaTarifaLaboral />
          </div>

          <div className={styles.tarjetaNota}>
            <h3 className={styles.tituloNota}>Cómo se calcula tu cuota</h3>
            <p className={styles.textoNota}>
              Con {TRABAJADORES_EJEMPLO} trabajadores: {TRABAJADORES_EJEMPLO} ×{' '}
              {formatearImporte(EJEMPLO.tramo.nomina)} de nómina = {formatearImporte(EJEMPLO.nominas)}{' '}
              + {TRABAJADORES_EJEMPLO} × {formatearImporte(EJEMPLO.tramo.gestion)} de gestión ={' '}
              {formatearImporte(EJEMPLO.gestion)} →{' '}
              <strong className={styles.destacadoNota}>{formatearImporte(EJEMPLO.total)}/mes</strong>{' '}
              + IVA o IGIC.
            </p>
            <ButtonLink href="/calculadora" variant="outline" className={styles.botonNota}>
              Calcular mi cuota exacta
            </ButtonLink>
            <div className={styles.subBloqueNota}>
              <h4 className={styles.tituloSubBloque}>Qué NO incluye</h4>
              <p className={styles.textoNota}>{PLAN_LABORAL.noIncluye}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section fondo="arena">
        <div className={styles.rejillaDos}>
          <div>
            <SectionHeader
              antetitulo="Qué incluye"
              titulo="Todo lo que necesita tu plantilla, dentro de la cuota"
              descripcion="Lo que ves es lo que pagas."
            />
            <CheckList items={PLAN_LABORAL.incluye} />
          </div>
          <div className={styles.rejillaTresApilada}>
            {PROCESOS.map(({ Icono, titulo, texto }) => (
              <article key={titulo} className={styles.tarjetaProceso}>
                <Icono className={styles.iconoProceso} />
                <h3 className={styles.tituloProceso}>{titulo}</h3>
                <p className={styles.textoProceso}>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section fondo="base">
        <div className={styles.banner}>
          <div>
            <p className={styles.antetituloBanner}>Promoción laboral + jurídico</p>
            <h2 className={styles.tituloBanner}>
              Añade el departamento jurídico y ahorra {AHORRO_PACK_POR_TRABAJADOR} por trabajador
            </h2>
            <p className={styles.textoBanner}>
              Un despido mal documentado o una inspección sin preparar salen caros. Con el pack,
              el mismo equipo que hace tus nóminas redacta tus cartas de despido y contesta a la
              Inspección. Con {TRABAJADORES_EJEMPLO} trabajadores pagas{' '}
              <strong>{importe(PACK.cuotaMensual)}/mes</strong> en lugar de{' '}
              {importe(
                SOLO_LABORAL.cuotaMensual !== null && SOLO_JURIDICO.cuotaMensual !== null
                  ? SOLO_LABORAL.cuotaMensual + SOLO_JURIDICO.cuotaMensual
                  : null,
              )}
              : ahorras <strong>{importe(PACK.ahorroMensual)} cada mes</strong>.
            </p>
          </div>
          <div className={styles.botonesBanner}>
            <ButtonLink href="/alta?plan=pack" size="lg" className={styles.botonBannerPrimario}>
              Contratar el pack
            </ButtonLink>
            <ButtonLink href="/departamento-juridico" size="lg" variant="outline">
              Ver el departamento jurídico
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Cuánto pagas ahora por tus nóminas?"
        descripcion="Dinos cuántos trabajadores tienes y te decimos al instante lo que costaría con nosotros."
      />
    </>
  );
}
