import type { Metadata } from 'next';
import { CheckList } from '@/components/features/CheckList';
import { FormularioPresupuestoFiscal } from '@/components/features/FormularioPresupuestoFiscal';
import {
  CtaFinal,
  HeroPrecio,
  PageHero,
  Section,
  SectionHeader,
} from '@/components/features/blocks';
import { PLANES } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import { crearMetadata } from '@/utils/seo';
import styles from '@/components/features/servicio.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Asesoría fiscal y contabilidad: presupuesto cerrado en 24 h',
  descripcion:
    'Impuestos, cierre del ejercicio e Impuesto sobre Sociedades a partir de tu balance y sumas y saldos. Presupuesto cerrado por escrito en 24 horas laborables.',
  ruta: '/asesoria-fiscal',
  imagen: '/images/hero-asesoria-fiscal.jpg',
  imagenAlt: 'Asesoría fiscal y contabilidad para empresas de PROLEGAL360',
});

const PLAN_FISCAL = PLANES.find((plan) => plan.id === 'fiscal')!;

const APORTA_CLIENTE: string[] = [
  'El balance de situación del periodo',
  'El balance de sumas y saldos',
  'La documentación de soporte que te pidamos para revisar partidas concretas',
  'Las incidencias relevantes del ejercicio (subvenciones, operaciones vinculadas, cambios societarios)',
];

const HACEMOS_NOSOTROS: string[] = [
  'Revisión fiscal sobre la contabilidad aportada',
  'Ajustes extracontables y aplicación de reservas y deducciones',
  'IVA (303, 349 y 390) o IGIC (420 y 425), según tu territorio',
  'IRPF y retenciones: modelos 111, 115 y 190',
  'Pagos fraccionados: modelos 130 y 202',
  'Impuesto sobre Sociedades (modelo 200)',
  'Vigilancia de las notificaciones electrónicas de la AEAT',
  'Calendario fiscal personalizado con avisos de vencimiento',
];

const MOTIVOS_PRESUPUESTO: string[] = [
  'Cada contabilidad es distinta: volumen de operaciones, actividad y régimen de IVA o IGIC',
  'Una tarifa genérica te haría pagar por lo que no necesitas',
  'Te enviamos el precio cerrado, por escrito, en 24 horas laborables',
  'Sin permanencia y sin minutas sorpresa al cierre del ejercicio',
];

export default function AsesoriaFiscalPage() {
  return (
    <>
      <PageHero
        antetitulo="Asesoría fiscal y contabilidad"
        titulo="Tus impuestos y tu cierre, con presupuesto cerrado en 24 h"
        descripcion="Trabajamos a partir de la contabilidad que nos aportas —balance y sumas y saldos—: la revisamos, cerramos el ejercicio y presentamos tus impuestos, Impuesto sobre Sociedades incluido."
        imagen={conBasePath('/images/hero-asesoria-fiscal.jpg')}
        acciones={
          <HeroPrecio
            importe="Presupuesto"
            sufijo="en 24 h"
            nota="Cerrado, por escrito y sin compromiso"
            botonTexto="Pedir presupuesto fiscal"
            botonHref="#presupuesto"
          />
        }
      />

      <Section fondo="base">
        <SectionHeader
          antetitulo="Reparto de tareas"
          titulo="Está claro desde el primer día quién hace cada cosa"
          descripcion="Tú llevas la contabilidad del día a día y nos aportas el balance y el balance de sumas y saldos. Nosotros nos ocupamos de todo lo fiscal."
        />
        <div className={`${styles.rejillaTarifas} ${styles.rejillaReparto}`}>
          <div className={styles.tarjetaReparto}>
            <p className={styles.antetituloReparto}>Qué aportas tú</p>
            <h3 className={styles.tituloReparto}>Tu contabilidad, en dos documentos</h3>
            <div className={styles.cuerpoReparto}>
              <CheckList items={APORTA_CLIENTE} />
            </div>
          </div>
          <div className={`${styles.tarjetaReparto} ${styles.tarjetaRepartoDestacada}`}>
            <p className={`${styles.antetituloReparto} ${styles.antetituloRepartoAccent}`}>
              Qué hacemos nosotros
            </p>
            <h3 className={styles.tituloReparto}>
              La revisión fiscal, el cierre y todas las presentaciones
            </h3>
            <div className={styles.cuerpoReparto}>
              <CheckList items={HACEMOS_NOSOTROS} />
            </div>
          </div>
        </div>
        <div className={styles.clausula}>
          <p className={styles.antetituloClausula}>Cláusula de responsabilidad</p>
          <p className={styles.textoClausula}>
            La contabilidad es responsabilidad de la empresa, que garantiza la veracidad e
            integridad de la información aportada. PROLEGAL360 Asesores realiza la revisión
            fiscal y la presentación de las declaraciones sobre la base de dicha información,
            sin que ello constituya una auditoría. Los ajustes detectados se comunicarán por
            escrito antes de la presentación.
          </p>
        </div>
      </Section>

      <Section id="presupuesto" fondo="arena">
        <div className={styles.rejillaDos}>
          <div>
            <SectionHeader
              antetitulo="Presupuesto cerrado en 24 h"
              titulo="Por qué la asesoría fiscal no tiene tarifa publicada"
              descripcion="Publicamos todo lo que se puede calcular. Lo fiscal depende de tu contabilidad, así que preferimos darte un precio exacto antes que uno genérico."
            />
            <CheckList items={MOTIVOS_PRESUPUESTO} />
            <div className={styles.subBloqueNota}>
              <h3 className={styles.tituloSubBloque}>Qué NO incluye</h3>
              <p className={styles.textoNota}>{PLAN_FISCAL.noIncluye}</p>
            </div>
          </div>
          <div className={styles.tarjetaFormulario}>
            <h2 className={styles.tituloNota}>Pide tu presupuesto fiscal</h2>
            <p className={styles.textoNota}>
              Cuatro datos y te enviamos el precio cerrado por escrito en menos de 24 horas
              laborables.
            </p>
            <div className={styles.cuerpoFormulario}>
              <FormularioPresupuestoFiscal />
            </div>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Necesitas también nóminas y departamento jurídico?"
        descripcion="Calcula al instante tu coste laboral y añade la asesoría fiscal como una línea más de tu propuesta."
      />
    </>
  );
}
