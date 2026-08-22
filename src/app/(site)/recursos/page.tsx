import type { Metadata } from 'next';
import { CheckList } from '@/components/features/CheckList';
import { FormularioRecurso } from '@/components/features/FormularioRecurso';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { IconoDescarga } from '@/components/ui/icons';
import { MARCA } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import styles from '@/app/(site)/recursos/recursos.module.css';

export const metadata: Metadata = {
  title: `Recursos gratuitos | ${MARCA.nombre}`,
  description:
    'Documentos útiles para tu empresa, gratis. Las mismas guías que usamos internamente con nuestros clientes.',
};

const PUNTOS_CHECKLIST: string[] = [
  'Los 15 documentos que tu asesoría necesita para cerrar el ejercicio',
  'Los 8 ajustes extracontables que casi nadie aplica',
  'Reserva de capitalización y de nivelación explicadas con números',
  'Cuándo debes presentar el modelo 232 de operaciones vinculadas',
  'Checklist imprimible para revisar antes del 25 de julio',
];

const DOCUMENTOS_CIERRE: string[] = [
  'Balance de sumas y saldos a 31 de diciembre',
  'Balance de situación y cuenta de pérdidas y ganancias',
  'Libro mayor completo del ejercicio',
  'Detalle del inmovilizado y cuadro de amortizaciones',
  'Inventario de existencias valorado a cierre',
  'Cuadro de préstamos con capital pendiente e intereses devengados',
  'Contratos de leasing y renting con su cuadro de cuotas',
  'Extractos bancarios de diciembre y conciliación bancaria',
  'Detalle de clientes y proveedores pendientes a cierre',
  'Relación de facturas emitidas y recibidas del ejercicio',
  'Modelos de IVA e IRPF presentados durante el ejercicio',
  'Actas y acuerdos de socios del ejercicio',
  'Detalle de operaciones con partes vinculadas',
  'Justificantes de subvenciones, ayudas y bonificaciones',
  'Bases imponibles negativas y deducciones pendientes de ejercicios anteriores',
];

interface Ajuste {
  titulo: string;
  detalle: string;
}

const AJUSTES: Ajuste[] = [
  {
    titulo: 'Reserva de capitalización.',
    detalle:
      'Reduce la base imponible en un 10 % del incremento de fondos propios si se mantiene cinco años. Se olvida en la mayoría de cierres de pymes.',
  },
  {
    titulo: 'Reserva de nivelación.',
    detalle:
      'Las entidades de reducida dimensión pueden minorar hasta el 10 % de la base imponible anticipando bases negativas futuras.',
  },
  {
    titulo: 'Deterioro de créditos incobrables.',
    detalle:
      'Saldos con más de seis meses desde el vencimiento y gestiones de cobro documentadas son fiscalmente deducibles.',
  },
  {
    titulo: 'Libertad de amortización y amortización acelerada.',
    detalle:
      'Aplicable a inversiones de empresas de reducida dimensión y a determinados activos vinculados a eficiencia energética.',
  },
  {
    titulo: 'Gastos no deducibles correctamente identificados.',
    detalle:
      'Multas, sanciones, donativos y retribuciones de fondos propios deben ajustarse de forma positiva y documentarse.',
  },
  {
    titulo: 'Compensación de bases imponibles negativas.',
    detalle:
      'Revisar límites por importe neto de la cifra de negocios y el orden de aplicación con las deducciones pendientes.',
  },
  {
    titulo: 'Operaciones vinculadas y modelo 232.',
    detalle:
      'Comprobar umbrales de declaración y la valoración a mercado de operaciones con socios y empresas del grupo.',
  },
  {
    titulo: 'Deducciones por I+D+i, donativos y creación de empleo.',
    detalle:
      'Se pierden con frecuencia por no acreditar el gasto en el ejercicio correcto o no arrastrar los saldos pendientes.',
  },
];

export default function RecursosPage() {
  return (
    <>
      <PageHero
        antetitulo="Recursos"
        titulo="Documentos útiles para tu empresa, gratis"
        descripcion="Las mismas guías que usamos internamente con nuestros clientes. Sin registro: solo tu email para enviarte el PDF."
      />

      <Section fondo="base">
        <div className={styles.rejilla}>
          <div>
            <p className={styles.insignia}>
              <IconoDescarga className={styles.iconoInsignia} /> Descarga gratuita · PDF
            </p>
            <h2 className={styles.titulo}>
              Checklist de cierre fiscal: los 15 documentos que necesitas y los 8 ajustes
              que casi nadie aplica
            </h2>
            <p className={styles.descripcion}>
              La guía que usamos internamente para cerrar el ejercicio de nuestros clientes.
              Incluye el listado completo de documentación que debes tener preparada y los
              ajustes extracontables que más se olvidan y que más dinero dejan sobre la
              mesa.
            </p>
            <div className={styles.puntos}>
              <CheckList items={PUNTOS_CHECKLIST} />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={conBasePath('/images/hero-recursos.jpg')}
              alt="Documentación contable preparada para el cierre fiscal"
              className={styles.imagen}
            />
          </div>

          <div className={styles.tarjetaDescarga}>
            <h3 className={styles.tituloDescarga}>Recibe el checklist en tu correo</h3>
            <p className={styles.textoDescarga}>
              Te lo enviamos al instante en PDF. Solo necesitamos tu email y no lo usamos
              para llamarte en frío.
            </p>
            <div className={styles.cuerpoDescarga}>
              <FormularioRecurso recurso="checklist-cierre-fiscal-prolegal360" />
            </div>
          </div>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Qué encontrarás dentro"
          titulo="Un adelanto del contenido"
          descripcion="El PDF desarrolla cada punto con el detalle y los plazos aplicables."
        />
        <div className={styles.rejillaContenido}>
          <div className={styles.tarjetaContenido}>
            <h3 className={styles.tituloContenido}>Los 15 documentos que necesitas</h3>
            <ol className={styles.listaContenido}>
              {DOCUMENTOS_CIERRE.map((documento, indice) => (
                <li key={documento} className={styles.itemContenido}>
                  <span className={styles.numeroContenido}>
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span>{documento}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.tarjetaContenido}>
            <h3 className={styles.tituloContenido}>Los 8 ajustes que casi nadie aplica</h3>
            <ol className={styles.listaContenido}>
              {AJUSTES.map((ajuste, indice) => (
                <li key={ajuste.titulo} className={styles.itemContenido}>
                  <span className={styles.numeroContenido}>
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <strong className={styles.destacadoContenido}>{ajuste.titulo}</strong>{' '}
                    {ajuste.detalle}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Prefieres que el cierre lo hagamos nosotros?"
        descripcion="El plan fiscal incluye el cierre, todos los modelos y el Impuesto sobre Sociedades desde 99 €/mes."
      />
    </>
  );
}
