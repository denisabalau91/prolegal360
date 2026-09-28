import type { Metadata } from 'next';
import Link from 'next/link';
import { CalculadoraCuota } from '@/components/features/CalculadoraCuota';
import { Faq } from '@/components/features/Faq';
import { PlanesPrecios } from '@/components/features/PlanesPrecios';
import { TablaModalidades } from '@/components/features/TablaModalidades';
import { TablaTarifaJuridica } from '@/components/features/TablaTarifaJuridica';
import { TablaTarifaLaboral } from '@/components/features/TablaTarifaLaboral';
import { TablaTarifasFincas } from '@/components/features/TablaTarifasFincas';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import { TRABAJADORES_EJEMPLO } from '@/core/domain/calculadora';
import { PRECIO_ZONA_COMUN, TARIFAS_FINCA } from '@/core/domain/fincas';
import { FAQS_HOME } from '@/core/domain/home-content';
import { formatearImporte } from '@/core/domain/importe';
import { AHORRO_PACK_POR_TRABAJADOR } from '@/core/domain/site';
import { calcularCuotaLaboral } from '@/core/use-cases/calcular-cuota';
import { calcularPrecioPortal } from '@/core/use-cases/calcular-presupuesto-fincas';
import { crearMetadata } from '@/utils/seo';
import styles from '@/app/(site)/precios/precios.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Precios de asesoría laboral, departamento jurídico y fincas',
  descripcion:
    'Tarifas publicadas de asesoría laboral por trabajador, departamento jurídico por plantilla y administración de fincas. Pack con descuento y calculadora inmediata.',
  ruta: '/precios',
});

const EJEMPLO_LABORAL = calcularCuotaLaboral(TRABAJADORES_EJEMPLO);

export default function PreciosPage() {
  return (
    <>
      <PageHero
        antetitulo="Tarifas publicadas"
        titulo="Lo que cuesta trabajar con nosotros, a la vista"
        descripcion="Sin formulario, sin registro y sin llamada previa. La asesoría laboral se paga por trabajador, el departamento jurídico por tramo de plantilla y la administración de fincas por vivienda. La fiscal, con presupuesto cerrado en 24 h."
      />

      <Section fondo="base">
        <PlanesPrecios />
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Comparativa"
          titulo={`Las tres formas de contratar, con ${TRABAJADORES_EJEMPLO} trabajadores`}
          descripcion={`Solo laboral, solo jurídico (con el primer mes gratis) o ambos en el pack, donde el jurídico mantiene su precio y la laboral cuesta ${AHORRO_PACK_POR_TRABAJADOR} menos por trabajador.`}
        />
        <TablaModalidades />
        <p className={styles.nota}>
          Precios mensuales sin IVA ni IGIC.{' '}
          <Link href="#calculadora" className={styles.enlace}>
            Calcula el tuyo con tu plantilla real
          </Link>
          .
        </p>
      </Section>

      <Section id="calculadora" fondo="base">
        <SectionHeader
          antetitulo="Calculadora"
          titulo="Tu coste laboral exacto, al instante"
          descripcion="Indica tus trabajadores y elige servicios. La calculadora aplica exactamente las tablas de esta página."
        />
        <CalculadoraCuota origen="/precios" />
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Detalle de tarifas"
          titulo="Cómo se calcula cada servicio"
          descripcion="Estas son las tablas que usamos. No hay tramos ocultos ni recargos por consulta."
        />
        <div className={styles.rejillaTablas}>
          <div>
            <h3 className={styles.tituloTabla}>Asesoría laboral · por trabajador y mes</h3>
            <TablaTarifaLaboral />
            {EJEMPLO_LABORAL && (
              <p className={styles.nota}>
                Ejemplo: {TRABAJADORES_EJEMPLO} trabajadores → {TRABAJADORES_EJEMPLO} ×{' '}
                {formatearImporte(EJEMPLO_LABORAL.tramo.nomina)} + {TRABAJADORES_EJEMPLO} ×{' '}
                {formatearImporte(EJEMPLO_LABORAL.tramo.gestion)} ={' '}
                <strong className={styles.destacado}>
                  {formatearImporte(EJEMPLO_LABORAL.total)}/mes
                </strong>{' '}
                + IVA o IGIC.
              </p>
            )}
          </div>
          <div>
            <h3 className={styles.tituloTabla}>Departamento jurídico · cuota mensual</h3>
            <TablaTarifaJuridica />
            <p className={styles.nota}>
              La asistencia a juicios o al SEMAC se presupuesta aparte, por escrito y antes de
              empezar. Tu cuota no incluye ninguna tarifa procesal fija.
            </p>
          </div>
        </div>
      </Section>

      <Section fondo="base">
        <div className={styles.rejillaOtros}>
          <div className={styles.tarjetaOtro}>
            <p className={styles.antetituloOtro}>Asesoría fiscal y contabilidad</p>
            <h3 className={styles.tituloOtro}>Presupuesto cerrado en 24 h</h3>
            <p className={styles.textoOtro}>
              Trabajamos a partir de tu balance y tu balance de sumas y saldos, y presentamos
              también el Impuesto sobre Sociedades. Cada contabilidad es distinta: por eso no
              te aplicamos una tarifa genérica, te damos un precio cerrado por escrito.
            </p>
            <ButtonLink href="/asesoria-fiscal#presupuesto" className={styles.botonOtro}>
              Pedir presupuesto fiscal
            </ButtonLink>
          </div>
          <div className={styles.tarjetaOtro}>
            <p className={styles.antetituloOtro}>Gestión de subvenciones</p>
            <h3 className={styles.tituloOtro}>Nuevos autónomos y contratación</h3>
            <p className={styles.textoOtro}>
              Te decimos por escrito si encajas en las ayudas vigentes y cuánto cuesta
              tramitarlas antes de presentar nada.
            </p>
            <ButtonLink href="/subvenciones" className={styles.botonOtro}>
              Ver subvenciones vigentes
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Administración de fincas"
          titulo="Tres tarifas por vivienda, local y garaje"
          descripcion={`Las mancomunidades se calculan por portal (${TARIFAS_FINCA.map(
            (tarifa) => `${tarifa.nombre} ${formatearImporte(calcularPrecioPortal(tarifa))}`,
          ).join(' · ')}) más ${formatearImporte(PRECIO_ZONA_COMUN)} por cada zona común.`}
        />
        <TablaTarifasFincas />
        <p className={styles.nota}>
          Precios mensuales sin IVA ni IGIC.{' '}
          <Link href="/administracion-de-fincas" className={styles.enlace}>
            Calcula los tres presupuestos de tu comunidad
          </Link>
          .
        </p>
      </Section>

      <Section fondo="base">
        <div className={styles.rejillaFaq}>
          <SectionHeader
            antetitulo="Preguntas frecuentes"
            titulo="Dudas habituales sobre precios y facturación"
          />
          <Faq faqs={FAQS_HOME} />
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
