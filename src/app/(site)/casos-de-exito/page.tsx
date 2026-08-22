import type { Metadata } from 'next';
import { Testimonios } from '@/components/features/Testimonios';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { crearMetadata } from '@/utils/seo';
import styles from '@/app/(site)/casos-de-exito/casos.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Casos de éxito de asesoría para empresas',
  descripcion:
    'Casos de empresas ante inspecciones, despidos y cambios de asesoría: situación inicial, trabajo realizado y resultado obtenido.',
  ruta: '/casos-de-exito',
});

interface Caso {
  numero: string;
  sector: string;
  titulo: string;
  situacion: string;
  queHicimos: string;
  resultado: string;
}

const CASOS: Caso[] = [
  {
    numero: '01',
    sector: 'Hostelería · 18 trabajadores',
    titulo: 'Inspección de Trabajo por horas extra en temporada alta',
    situacion:
      'La Inspección requirió el registro de jornada de 14 meses y los cuadrantes de todo el verano, con propuesta de acta por horas extra no cotizadas.',
    queHicimos:
      'Reconstruimos el registro de jornada con los partes de caja y los cuadrantes reales, presentamos alegaciones en plazo y comparecimos en la visita con la abogada del departamento jurídico.',
    resultado:
      'Acta rebajada a infracción leve y regularización pactada sin sanción por horas extra. Coste jurídico para el cliente: 0 € adicionales sobre su cuota.',
  },
  {
    numero: '02',
    sector: 'Construcción · 34 trabajadores',
    titulo: 'Requerimiento de la AEAT sobre el IVA deducido de un ejercicio',
    situacion:
      'Hacienda pidió justificar la totalidad del IVA soportado deducido en un ejercicio, con propuesta de liquidación provisional de más de 40.000 €.',
    queHicimos:
      'Revisamos el cierre, ordenamos las facturas de subcontratas y material y contestamos el requerimiento con el soporte documental completo y el criterio de inversión del sujeto pasivo aplicado.',
    resultado:
      'Liquidación anulada en su práctica totalidad. La regularización final fue inferior a 900 €, sin sanción.',
  },
  {
    numero: '03',
    sector: 'Comercio · 6 trabajadores',
    titulo: 'Despido impugnado y papeleta de conciliación',
    situacion:
      'Un trabajador con nueve años de antigüedad impugnó su despido objetivo y reclamó improcedencia más daños.',
    queHicimos:
      'Redactamos la carta con la causa correctamente motivada, recalculamos la indemnización y la pusimos a disposición en plazo. Asistimos al acto de conciliación en el SMAC.',
    resultado:
      'Acuerdo en conciliación por el importe de la indemnización legal, sin juicio y sin salarios de tramitación.',
  },
  {
    numero: '04',
    sector: 'Seguridad y limpieza · 62 trabajadores',
    titulo: 'Subrogación de personal en un cambio de contrata',
    situacion:
      'La empresa asumió una contrata con 21 trabajadores a subrogar y plazos muy cortos para revisar la documentación entregada por la saliente.',
    queHicimos:
      'Auditamos la documentación de subrogación, detectamos cuatro trabajadores mal clasificados y dos deudas de cotización, y lo comunicamos por escrito a la empresa saliente antes de la fecha de efecto.',
    resultado:
      'La empresa entrante evitó asumir 18.000 € de deuda ajena y las 21 subrogaciones se cerraron sin reclamación posterior.',
  },
];

export default function CasosDeExitoPage() {
  return (
    <>
      <PageHero
        antetitulo="Casos de éxito"
        titulo="Lo que pasa cuando el jurídico ya está dentro"
        descripcion="Cuatro casos reales de clientes, con la situación de partida, lo que hicimos y cómo acabó. Los nombres se han omitido por confidencialidad."
      />

      <Section fondo="base">
        <div className={styles.lista}>
          {CASOS.map((caso) => (
            <article key={caso.numero} className={styles.caso}>
              <div className={styles.cabecera}>
                <span className={styles.numero}>{caso.numero}</span>
                <span className={styles.sector}>{caso.sector}</span>
              </div>
              <h2 className={styles.titulo}>{caso.titulo}</h2>
              <div className={styles.columnas}>
                <div>
                  <h3 className={styles.tituloColumna}>Situación</h3>
                  <p className={styles.texto}>{caso.situacion}</p>
                </div>
                <div>
                  <h3 className={styles.tituloColumna}>Qué hicimos</h3>
                  <p className={styles.texto}>{caso.queHicimos}</p>
                </div>
                <div className={styles.resultado}>
                  <h3 className={styles.tituloResultado}>Resultado</h3>
                  <p className={styles.texto}>{caso.resultado}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Clientes"
          titulo="Lo que dicen las empresas que ya han cambiado"
        />
        <Testimonios />
      </Section>

      <CtaFinal
        titulo="¿Tienes un asunto abierto ahora mismo?"
        descripcion="Cuéntanoslo en la llamada de 20 minutos y te decimos cómo lo abordaríamos y qué costaría."
      />
    </>
  );
}
