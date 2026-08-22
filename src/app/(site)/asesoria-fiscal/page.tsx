import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckList } from '@/components/features/CheckList';
import {
  CtaFinal,
  HeroPrecio,
  PageHero,
  Section,
  SectionHeader,
} from '@/components/features/blocks';
import { IconoEdificio, IconoHojaCalculo } from '@/components/ui/icons';
import { MARCA, PLANES } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import styles from '@/components/features/servicio.module.css';

export const metadata: Metadata = {
  title: `Asesoría fiscal | ${MARCA.nombre}`,
  description:
    'Cerramos tu ejercicio y presentamos tus impuestos a partir de la contabilidad que tú aportas. Impuesto sobre Sociedades incluido. Desde 99 €/mes.',
};

const PLAN_FISCAL = PLANES.find((plan) => plan.id === 'fiscal')!;

const APORTA_CLIENTE: string[] = [
  'El registro contable diario de tus facturas emitidas y recibidas',
  'Los extractos bancarios del periodo, en formato digital',
  'Las facturas de inversión y los contratos de financiación',
  'El inventario de existencias a cierre de ejercicio',
  'Las incidencias relevantes del ejercicio (subvenciones, operaciones vinculadas, cambios societarios)',
];

const HACEMOS_NOSOTROS: string[] = [
  'Revisión fiscal del cierre sobre la contabilidad aportada',
  'Ajustes extracontables y aplicación de reservas y deducciones',
  'IVA: modelos 303, 349 y resumen anual 390',
  'IRPF y retenciones: modelos 111, 115 y 190',
  'Pagos fraccionados: modelos 130 y 202',
  'Impuesto sobre Sociedades (modelo 200) sin cargo extra',
  'Vigilancia de las notificaciones electrónicas de la AEAT',
  'Calendario fiscal personalizado con avisos de vencimiento',
];

interface TramoTarifa {
  concepto: string;
  importe: string;
}

const TARIFAS_AUTONOMO: TramoTarifa[] = [
  { concepto: 'Menos de 50 facturas/mes', importe: '59 €/mes' },
  { concepto: 'Entre 50 y 100 facturas/mes', importe: '89 €/mes' },
  { concepto: 'Más de 100 facturas/mes', importe: 'Presupuesto cerrado' },
];

const TARIFAS_SOCIEDAD: TramoTarifa[] = [
  { concepto: 'Menos de 50 facturas/mes', importe: '99 €/mes' },
  { concepto: 'Entre 50 y 100 facturas/mes', importe: '149 €/mes' },
  { concepto: 'Entre 101 y 200 facturas/mes', importe: '199 €/mes' },
  { concepto: 'Más de 200 facturas/mes', importe: 'Presupuesto cerrado' },
];

function TablaTarifa({ tramos }: { tramos: TramoTarifa[] }) {
  return (
    <table className={styles.tablaTarifa}>
      <tbody>
        {tramos.map((tramo, indice) => (
          <tr
            key={tramo.concepto}
            className={indice % 2 === 1 ? styles.filaTarifaImpar : undefined}
          >
            <th scope="row" className={styles.conceptoTarifa}>
              {tramo.concepto}
            </th>
            <td className={styles.importeTarifa}>{tramo.importe}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AsesoriaFiscalPage() {
  return (
    <>
      <PageHero
        antetitulo="Pilar fiscal"
        titulo="Asesoría fiscal: cerramos tu ejercicio y presentamos tus impuestos"
        descripcion="Trabajamos sobre la contabilidad que tú aportas: la revisamos, la ajustamos, cerramos el ejercicio y presentamos todas las declaraciones. Impuesto sobre Sociedades incluido."
        imagen={conBasePath('/images/hero-asesoria-fiscal.jpg')}
        acciones={
          <HeroPrecio
            importe="desde 99 €"
            nota="Impuesto sobre Sociedades incluido"
            botonTexto="Contratar el plan fiscal"
            botonHref="/alta?plan=fiscal"
          />
        }
      />

      <Section fondo="base">
        <SectionHeader
          antetitulo="Reparto de tareas"
          titulo="Está claro desde el primer día quién hace cada cosa"
          descripcion="Nuestro modelo es transparente: tú llevas el registro contable del día a día y nosotros nos ocupamos de todo lo fiscal. Así el precio puede estar publicado."
        />
        <div className={`${styles.rejillaTarifas} ${styles.rejillaReparto}`}>
          <div className={styles.tarjetaReparto}>
            <p className={styles.antetituloReparto}>Qué aportas tú</p>
            <h3 className={styles.tituloReparto}>
              La contabilidad y la documentación de soporte
            </h3>
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
            fiscal del cierre y la presentación de las declaraciones sobre la base de dicha
            información, sin que ello constituya una auditoría. Los ajustes detectados se
            comunicarán por escrito antes de la presentación.
          </p>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Tarifas fiscales"
          titulo="El precio depende de tu forma jurídica y de tu volumen de facturas"
          descripcion="Nada más. Sin tramos ocultos ni recargos por consultas."
        />
        <div className={styles.rejillaTarifas}>
          <div className={styles.tarjetaTarifa}>
            <div className={styles.cabeceraTarifa}>
              <IconoHojaCalculo className={styles.iconoTarifa} />
              <h3 className={styles.tituloTarifa}>Autónomo</h3>
            </div>
            <TablaTarifa tramos={TARIFAS_AUTONOMO} />
          </div>
          <div className={styles.tarjetaTarifa}>
            <div className={styles.cabeceraTarifa}>
              <IconoEdificio className={styles.iconoTarifa} />
              <h3 className={styles.tituloTarifa}>Sociedad</h3>
            </div>
            <TablaTarifa tramos={TARIFAS_SOCIEDAD} />
          </div>
        </div>
        <p className={styles.notaTarifas}>
          Precios sin IVA y sin permanencia.{' '}
          <Link href="/calculadora" className={styles.enlaceTarifas}>
            Calcula tu cuota exacta
          </Link>{' '}
          incluyendo laboral y jurídico.
        </p>
      </Section>

      <Section fondo="base">
        <div className={styles.rejillaDos}>
          <div>
            <SectionHeader
              antetitulo="Qué incluye"
              titulo="Todo lo que entra en tu plan fiscal"
            />
            <CheckList items={PLAN_FISCAL.incluye} />
          </div>
          <div className={styles.tarjetaNota}>
            <h3 className={styles.tituloNota}>Qué NO incluye</h3>
            <p className={styles.textoNota}>{PLAN_FISCAL.noIncluye}</p>
            <p className={styles.textoNota}>
              Si necesitas que llevemos también el registro contable diario o el depósito de
              cuentas anuales en el Registro Mercantil, lo presupuestamos aparte con precio
              cerrado.
            </p>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Tu asesoría te cobra el Impuesto sobre Sociedades aparte?"
        descripcion="En nuestro plan fiscal está incluido. Calcula tu cuota o cuéntanos tu caso en 20 minutos."
      />
    </>
  );
}
