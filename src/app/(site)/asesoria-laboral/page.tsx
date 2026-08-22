import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import { CheckList } from '@/components/features/CheckList';
import {
  CtaFinal,
  HeroPrecio,
  PageHero,
  Section,
  SectionHeader,
} from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import { IconoEscudoCheck, IconoReloj, IconoUsuarios } from '@/components/ui/icons';
import { MARCA, PLANES } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import styles from '@/components/features/servicio.module.css';

export const metadata: Metadata = {
  title: `Asesoría laboral | ${MARCA.nombre}`,
  description:
    'Nóminas, seguros sociales, contratos y toda la relación con la Seguridad Social. Desde 45 €/mes + 12 € por nómina.',
};

const PLAN_LABORAL = PLANES.find((plan) => plan.id === 'laboral')!;

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

export default function AsesoriaLaboralPage() {
  return (
    <>
      <PageHero
        antetitulo="Pilar laboral"
        titulo="Asesoría laboral para empresas y autónomos con plantilla"
        descripcion="Nóminas, seguros sociales, contratos y toda la relación con la Seguridad Social. Con el departamento jurídico detrás para el día en que algo se tuerce."
        imagen={conBasePath('/images/hero-asesoria-laboral.jpg')}
        acciones={
          <HeroPrecio
            importe="45 €"
            nota="+ 12 € por nómina"
            botonTexto="Contratar el plan laboral"
            botonHref="/alta?plan=laboral"
          />
        }
      />

      <Section fondo="base">
        <div className={styles.rejillaDos}>
          <div>
            <SectionHeader
              antetitulo="Qué incluye"
              titulo="Todo lo que necesita tu plantilla, dentro de la cuota"
              descripcion="Sin extras por cada consulta ni por cada trámite corriente. Lo que ves es lo que pagas."
            />
            <CheckList items={PLAN_LABORAL.incluye} />
          </div>

          <div className={styles.tarjetaNota}>
            <h3 className={styles.tituloNota}>Qué NO incluye</h3>
            <p className={styles.textoNota}>{PLAN_LABORAL.noIncluye}</p>
            <div className={styles.subBloqueNota}>
              <h4 className={styles.tituloSubBloque}>Cómo se calcula tu cuota</h4>
              <p className={styles.textoNota}>
                45 € de cuota base más 12 € por cada nómina mensual. Una empresa con 8
                trabajadores paga 45 + 96 ={' '}
                <strong className={styles.destacadoNota}>141 €/mes</strong>, sin IVA.
              </p>
              <ButtonLink href="/calculadora" variant="outline" className={styles.botonNota}>
                Calcular mi cuota exacta
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Cómo trabajamos el área laboral"
          titulo="Un circuito mensual que no depende de que tú te acuerdes"
        />
        <div className={styles.rejillaTres}>
          {PROCESOS.map(({ Icono, titulo, texto }) => (
            <article key={titulo} className={styles.tarjetaProceso}>
              <Icono className={styles.iconoProceso} />
              <h3 className={styles.tituloProceso}>{titulo}</h3>
              <p className={styles.textoProceso}>{texto}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section fondo="base">
        <div className={styles.banner}>
          <div>
            <h2 className={styles.tituloBanner}>
              El área laboral es donde más caro sale ir sola
            </h2>
            <p className={styles.textoBanner}>
              Un despido mal documentado, un registro de jornada que no existe o una
              subrogación mal hecha acaban en conciliación. Por eso el plan laboral se
              contrata casi siempre junto al departamento jurídico: la carta de despido, las
              alegaciones y la asistencia al SMAC ya entran en la cuota.
            </p>
          </div>
          <div className={styles.botonesBanner}>
            <ButtonLink
              href="/departamento-juridico"
              size="lg"
              className={styles.botonBannerPrimario}
            >
              Ver el departamento jurídico
            </ButtonLink>
            <ButtonLink href="/precios" size="lg" variant="outline">
              Ver el plan 360 INTEGRAL
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Cuánto pagas ahora por tus nóminas?"
        descripcion="Dinos cuántos trabajadores tienes y te decimos en un minuto lo que costaría con nosotros."
      />
    </>
  );
}
