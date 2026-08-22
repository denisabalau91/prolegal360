import type { Metadata } from 'next';
import Link from 'next/link';
import { CalculadoraCuota } from '@/components/features/CalculadoraCuota';
import { Faq } from '@/components/features/Faq';
import { PlanesPrecios } from '@/components/features/PlanesPrecios';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';
import { FAQS_HOME } from '@/core/domain/home-content';
import styles from '@/app/(site)/precios/precios.module.css';

export const metadata: Metadata = {
  title: `Precios | ${MARCA.nombre}`,
  description:
    'Nuestras tarifas, completas y a la vista. Sin formulario, sin registro y sin llamada previa.',
};

interface FilaTarifa {
  concepto: string;
  importe: string;
}

const TARIFA_FISCAL: FilaTarifa[] = [
  { concepto: 'Autónomo · menos de 50 facturas/mes', importe: '59 €/mes' },
  { concepto: 'Autónomo · 50 – 100 facturas/mes', importe: '89 €/mes' },
  { concepto: 'Autónomo · más de 100 facturas/mes', importe: 'Presupuesto cerrado' },
  { concepto: 'Sociedad · menos de 50 facturas/mes', importe: '99 €/mes' },
  { concepto: 'Sociedad · 50 – 100 facturas/mes', importe: '149 €/mes' },
  { concepto: 'Sociedad · 101 – 200 facturas/mes', importe: '199 €/mes' },
  { concepto: 'Sociedad · más de 200 facturas/mes', importe: 'Presupuesto cerrado' },
];

const TARIFA_JURIDICA: FilaTarifa[] = [
  { concepto: '0 trabajadores', importe: '39 €' },
  { concepto: '1 – 5 trabajadores', importe: '59 €' },
  { concepto: '6 – 10 trabajadores', importe: '89 €' },
  { concepto: '11 – 25 trabajadores', importe: '139 €' },
  { concepto: '26 – 50 trabajadores', importe: '199 €' },
  { concepto: 'Más de 50 trabajadores', importe: 'Presupuesto cerrado' },
];

function TablaFilas({ filas }: { filas: FilaTarifa[] }) {
  return (
    <table className={styles.tablaTarifa}>
      <tbody>
        {filas.map((fila, indice) => (
          <tr key={fila.concepto} className={indice % 2 === 1 ? styles.filaImpar : undefined}>
            <th scope="row" className={styles.conceptoFila}>
              {fila.concepto}
            </th>
            <td className={styles.importeFila}>{fila.importe}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PreciosPage() {
  return (
    <>
      <PageHero
        antetitulo="Precios publicados"
        titulo="Nuestras tarifas, completas y a la vista"
        descripcion="Sin formulario, sin registro y sin llamada previa. Publicamos el precio porque se puede calcular: depende de tu forma jurídica, de tu plantilla y de tu volumen de facturas."
      />

      <Section fondo="base">
        <PlanesPrecios />
      </Section>

      <Section id="calculadora" fondo="arena">
        <SectionHeader
          antetitulo="Calculadora"
          titulo="Calcula tu cuota exacta en un minuto"
          descripcion="Tres datos y tienes el desglose línea a línea, con el primer mes de servicio jurídico ya aplicado."
        />
        <CalculadoraCuota origen="/precios" />
      </Section>

      <Section fondo="base">
        <SectionHeader
          antetitulo="Detalle de tarifas"
          titulo="Cómo se calcula cada pilar"
          descripcion="Estas son las tres tablas que usamos. La calculadora no hace otra cosa que aplicarlas."
        />
        <div className={styles.rejillaTarifas}>
          <div className={styles.tarjetaTarifa}>
            <h3 className={styles.cabeceraTarifa}>LABORAL</h3>
            <div className={styles.cuerpoTarifa}>
              <p className={styles.precioTarifa}>
                45 €<span className={styles.sufijoTarifa}>/mes</span>
              </p>
              <p className={styles.extraTarifa}>+ 12 € por cada nómina</p>
              <p className={styles.ejemploTarifa}>
                Ejemplo: 8 trabajadores → 45 + (12 × 8) ={' '}
                <strong className={styles.destacadoTarifa}>141 €/mes</strong>.
              </p>
            </div>
          </div>
          <div className={styles.tarjetaTarifa}>
            <h3 className={styles.cabeceraTarifa}>FISCAL</h3>
            <TablaFilas filas={TARIFA_FISCAL} />
          </div>
          <div className={styles.tarjetaTarifa}>
            <h3 className={styles.cabeceraTarifa}>JURÍDICO</h3>
            <TablaFilas filas={TARIFA_JURIDICA} />
            <p className={styles.notaGratis}>Primer mes gratuito para nuevas altas</p>
          </div>
        </div>

        <div className={styles.banner360}>
          <h3 className={styles.tituloBanner}>
            Plan 360 INTEGRAL: los tres pilares con descuento
          </h3>
          <p className={styles.textoBanner}>
            Si contratas laboral, fiscal y jurídico a la vez, aplicamos un{' '}
            <strong>15 % de descuento</strong> sobre la suma de los tres pilares, con una
            cuota mínima de 199 €/mes. Un solo interlocutor y una sola factura.{' '}
            <Link href="/calculadora" className={styles.enlaceBanner}>
              Comprueba tu ahorro en la calculadora
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section fondo="arena">
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
