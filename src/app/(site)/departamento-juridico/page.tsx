import type { Metadata } from 'next';
import { CheckList } from '@/components/features/CheckList';
import {
  CtaFinal,
  HeroPrecio,
  PageHero,
  Section,
  SectionHeader,
} from '@/components/features/blocks';
import { IconoInsigniaCheck, IconoRegalo } from '@/components/ui/icons';
import { MARCA, PLANES } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import servicio from '@/components/features/servicio.module.css';
import styles from '@/app/(site)/departamento-juridico/juridico.module.css';

export const metadata: Metadata = {
  title: `Departamento jurídico | ${MARCA.nombre}`,
  description:
    'Un departamento jurídico propio, dentro de tu cuota mensual. Desde 39 €/mes con el primer mes gratuito.',
};

const PLAN_JURIDICO = PLANES.find((plan) => plan.id === 'juridico')!;

const NO_INCLUYE: string[] = [
  'Procedimientos judiciales (demandas, vistas y recursos)',
  'Tasas judiciales y depósitos para recurrir',
  'Costas procesales impuestas por el juzgado',
  'Peritajes y honorarios de procurador',
];

interface TramoJuridico {
  plantilla: string;
  perfil: string;
  importe: string;
}

const TARIFA_JURIDICA: TramoJuridico[] = [
  { plantilla: '0 trabajadores', perfil: 'Autónomo sin plantilla', importe: '39 €' },
  { plantilla: '1 – 5 trabajadores', perfil: 'Microempresa', importe: '59 €' },
  { plantilla: '6 – 10 trabajadores', perfil: 'Pequeña empresa', importe: '89 €' },
  { plantilla: '11 – 25 trabajadores', perfil: 'Empresa en crecimiento', importe: '139 €' },
  { plantilla: '26 – 50 trabajadores', perfil: 'Empresa consolidada', importe: '199 €' },
  {
    plantilla: 'Más de 50 trabajadores',
    perfil: 'Gran empresa',
    importe: 'Presupuesto cerrado',
  },
];

export default function DepartamentoJuridicoPage() {
  return (
    <>
      <PageHero
        antetitulo="Pilar jurídico"
        titulo="Un departamento jurídico propio, dentro de tu cuota mensual"
        descripcion="No derivamos a un abogado externo ni te pasamos un teléfono. Cuando llega el problema lo lleva nuestra abogada, desde el minuto uno y con el precio ya cerrado."
        imagen={conBasePath('/images/hero-departamento-juridico.jpg')}
        acciones={
          <HeroPrecio
            importe="desde 39 €"
            nota={
              <>
                <IconoRegalo style={{ width: '1rem', height: '1rem' }} /> Primer mes
                gratuito
              </>
            }
            botonTexto="Empezar con el primer mes gratis"
            botonHref="/alta?plan=juridico"
          />
        }
      />

      <div className={servicio.franja}>
        <div className={servicio.franjaInterior}>
          <IconoRegalo className={servicio.iconoFranja} />
          <p className={servicio.textoFranja}>
            <strong className={servicio.destacadoFranja}>
              El primer mes de servicio jurídico es gratuito
            </strong>{' '}
            para nuevas altas. A partir del segundo mes se aplica la tarifa que corresponda
            según los trabajadores en alta. Sin permanencia y sin coste de cancelación.
          </p>
        </div>
      </div>

      <Section fondo="base">
        <div className={servicio.rejillaAbogada}>
          <figure className={servicio.fichaFoto}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={conBasePath('/images/equipo-elena-vidal.jpg')}
              alt="Elena Vidal Aparicio, Abogada · Responsable del departamento jurídico"
              className={servicio.fotoAbogada}
            />
            <figcaption className={servicio.pieFoto}>
              <p className={servicio.nombreAbogada}>Elena Vidal Aparicio</p>
              <p className={servicio.cargoAbogada}>
                Abogada · Responsable del departamento jurídico
              </p>
              <p className={servicio.colegiadaAbogada}>
                <IconoInsigniaCheck className={servicio.iconoColegiada} />
                Colegiada nº 128.457 del Ilustre Colegio de la Abogacía de Madrid
              </p>
            </figcaption>
          </figure>

          <div>
            <SectionHeader
              antetitulo="Quién lleva tus asuntos"
              titulo="Tienes nombre, apellidos y número de colegiada"
              descripcion="Abogada laboralista con más de doce años de ejercicio. Dirige el departamento jurídico de PROLEGAL360 Asesores y coordina con el despacho PROLEGAL360 los asuntos que llegan a vía judicial. Lleva personalmente las alegaciones ante la Inspección de Trabajo, los despidos conflictivos y la asistencia a los actos de conciliación."
            />
            <div className={servicio.rejillaIncluye}>
              <div className={servicio.tarjetaIncluye}>
                <h3 className={servicio.tituloIncluye}>Qué SÍ incluye</h3>
                <div className={servicio.cuerpoIncluye}>
                  <CheckList items={PLAN_JURIDICO.incluye} />
                </div>
              </div>
              <div className={servicio.tarjetaNoIncluye}>
                <h3 className={servicio.tituloIncluye}>Qué NO incluye</h3>
                <div className={servicio.cuerpoIncluye}>
                  <CheckList items={NO_INCLUYE} negativa />
                </div>
                <p className={servicio.notaIncluye}>
                  Estas actuaciones se presupuestan aparte, con precio cerrado por
                  adelantado y un{' '}
                  <strong className={servicio.destacadoNota}>30 % de descuento</strong> por
                  ser cliente con plan jurídico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Tarifa jurídica"
          titulo="El precio depende solo de tu plantilla"
          descripcion="Cuantos más trabajadores tienes, más superficie de riesgo laboral hay que cubrir. Por eso la tarifa se escala por tramos, y está publicada."
        />
        <div className={styles.contenedorTabla}>
          <table className={styles.tabla}>
            <thead>
              <tr className={styles.filaCabecera}>
                <th scope="col" className={styles.celdaCabecera}>
                  Plantilla
                </th>
                <th scope="col" className={styles.celdaCabeceraSecundaria}>
                  Perfil
                </th>
                <th scope="col" className={styles.celdaCabeceraImporte}>
                  Cuota mensual
                </th>
              </tr>
            </thead>
            <tbody>
              {TARIFA_JURIDICA.map((tramo, indice) => (
                <tr
                  key={tramo.plantilla}
                  className={indice % 2 === 1 ? styles.filaImpar : undefined}
                >
                  <th scope="row" className={styles.celdaPlantilla}>
                    {tramo.plantilla}
                  </th>
                  <td className={styles.celdaPerfil}>{tramo.perfil}</td>
                  <td className={styles.celdaImporte}>{tramo.importe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.notaTabla}>
          Precios sin IVA. El primer mes es gratuito para nuevas altas. Excluye
          procedimientos judiciales, tasas y costas.
        </p>
      </Section>

      <div className={styles.franjaActuaciones}>
        <div className={styles.franjaActuacionesInterior}>
          <p className={styles.antetituloActuaciones}>Actuaciones puntuales</p>
          <p className={styles.textoActuaciones}>
            Un despido, una inspección, un requerimiento o un juicio se presupuestan aparte,
            siempre por escrito, con precio cerrado y antes de empezar. Nunca recibirás una
            minuta que no hayas aprobado. Los clientes con plan jurídico tienen un 30 % de
            descuento.
          </p>
        </div>
      </div>

      <CtaFinal
        titulo="Prueba el departamento jurídico un mes, gratis"
        descripcion="Sin permanencia y sin coste de cancelación. Si no lo usas, no lo renuevas."
      />
    </>
  );
}
