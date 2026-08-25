import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import { CheckList } from '@/components/features/CheckList';
import { Faq } from '@/components/features/Faq';
import { DatosEstructurados } from '@/components/seo/DatosEstructurados';
import {
  CtaFinal,
  HeroPrecio,
  PageHero,
  Section,
  SectionHeader,
} from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import {
  IconoDocumentoAlerta,
  IconoEscudoAlerta,
  IconoInsigniaCheck,
  IconoInstitucion,
  IconoRegalo,
} from '@/components/ui/icons';
import { MARCA, PLANES, type FaqItem } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import { crearMetadata, urlCanonica } from '@/utils/seo';
import servicio from '@/components/features/servicio.module.css';
import styles from '@/app/(site)/departamento-juridico/juridico.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Abogado laboral para empresas en España',
  descripcion:
    'Abogado laboral para empresas de toda España: despidos, sanciones, inspecciones, requerimientos y conciliaciones. Plan desde 39 €/mes.',
  ruta: '/departamento-juridico',
  imagen: '/images/hero-departamento-juridico.jpg',
  imagenAlt: 'Abogado laboral para empresas de PROLEGAL360',
});

const PLAN_JURIDICO = PLANES.find((plan) => plan.id === 'juridico')!;

const NO_INCLUYE: string[] = [
  'Procedimientos judiciales (demandas, vistas y recursos)',
  'Tasas judiciales y depósitos para recurrir',
  'Costas procesales impuestas por el juzgado',
  'Peritajes y honorarios de procurador',
];

interface AreaLaboral {
  Icono: ComponentType<SVGProps<SVGSVGElement>>;
  titulo: string;
  texto: string;
}

const AREAS_LABORALES: AreaLaboral[] = [
  {
    Icono: IconoDocumentoAlerta,
    titulo: 'Despidos y sanciones',
    texto:
      'Preparamos la estrategia, la carta y el cálculo económico para reducir errores antes de comunicar la decisión.',
  },
  {
    Icono: IconoEscudoAlerta,
    titulo: 'Inspección de Trabajo',
    texto:
      'Revisamos el requerimiento, ordenamos la documentación y redactamos las alegaciones dentro de plazo.',
  },
  {
    Icono: IconoInstitucion,
    titulo: 'Conciliación y reclamaciones',
    texto:
      'Analizamos la papeleta, valoramos el riesgo y asistimos al acto de conciliación laboral con la empresa.',
  },
];

const PASOS_COBERTURA_NACIONAL: string[] = [
  'Primera revisión por videollamada o teléfono, con documentación compartida de forma digital',
  'Análisis del convenio colectivo y de la normativa aplicable en cada provincia',
  'Respuesta y presupuesto por escrito antes de cualquier actuación fuera de la cuota',
  'Coordinación de las actuaciones presenciales cuando el asunto lo requiera',
];

const FAQS_ABOGADO_LABORAL: FaqItem[] = [
  {
    pregunta: '¿Atendéis a empresas de toda España?',
    respuesta:
      'Sí. La consulta, el análisis del expediente y la preparación de documentos se realizan de forma digital para empresas de toda España. Si una actuación exige presencia física, confirmamos antes la disponibilidad y su presupuesto según la provincia.',
  },
  {
    pregunta: '¿El servicio está pensado para empresas o para trabajadores?',
    respuesta:
      'Los planes publicados están diseñados para empresas, autónomos empleadores y responsables de recursos humanos. Defendemos sus decisiones laborales y coordinamos la gestión preventiva con la asesoría laboral.',
  },
  {
    pregunta: '¿Qué asuntos lleva un abogado laboral para empresas?',
    respuesta:
      'Entre otros, despidos, sanciones, reclamaciones de cantidad, modificaciones de condiciones, inspecciones de trabajo, negociación previa y actos de conciliación. Primero revisamos el caso para confirmar alcance, plazo y estrategia.',
  },
  {
    pregunta: '¿Los procedimientos judiciales están incluidos en la cuota?',
    respuesta:
      'No. Las demandas, vistas y recursos se presupuestan aparte, por escrito y antes de empezar. Los clientes del plan jurídico reciben un 30 % de descuento sobre esas actuaciones profesionales.',
  },
  {
    pregunta: '¿Cuánto cuesta el abogado laboral para la empresa?',
    respuesta:
      'El plan jurídico recurrente parte de 39 € al mes para autónomos sin plantilla y aumenta por tramos de trabajadores. Las actuaciones puntuales y judiciales se valoran por separado con precio cerrado.',
  },
];

const DATOS_ESTRUCTURADOS_ABOGADO_LABORAL: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${urlCanonica('/departamento-juridico')}#servicio`,
      name: 'Abogado laboral para empresas en España',
      serviceType: 'Asesoramiento y defensa laboral para empresas',
      url: urlCanonica('/departamento-juridico'),
      provider: {
        '@id': `${MARCA.url}/#organization`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'España',
      },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Empresas y autónomos empleadores',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: urlCanonica('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Abogado laboral para empresas',
          item: urlCanonica('/departamento-juridico'),
        },
      ],
    },
  ],
};

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
      <DatosEstructurados
        id="datos-estructurados-abogado-laboral"
        datos={DATOS_ESTRUCTURADOS_ABOGADO_LABORAL}
      />
      <PageHero
        antetitulo="Abogado laboral para empresas"
        titulo="Abogado laboral para empresas en toda España"
        descripcion="Asesoramiento preventivo y defensa ante despidos, sanciones, inspecciones y conciliaciones. Tu empresa trata directamente con una abogada laboralista, con alcance y precio definidos por escrito."
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
        <SectionHeader
          antetitulo="Derecho laboral de empresa"
          titulo="Intervenimos antes, durante y después del conflicto laboral"
          descripcion="Una decisión laboral bien preparada evita costes, plazos perdidos y posiciones difíciles de defender. Revisamos el expediente y dejamos por escrito el siguiente paso."
        />
        <div className={servicio.rejillaTres}>
          {AREAS_LABORALES.map(({ Icono, titulo, texto }) => (
            <article key={titulo} className={servicio.tarjetaProceso}>
              <Icono className={servicio.iconoProceso} />
              <h3 className={servicio.tituloProceso}>{titulo}</h3>
              <p className={servicio.textoProceso}>{texto}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section fondo="arena">
        <div className={servicio.rejillaAbogada}>
          <figure className={servicio.fichaFoto}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={conBasePath('/images/roxana_denisa.jpg')}
              alt="Roxana Denisa Balau, Abogada · Responsable del departamento jurídico"
              width={600}
              height={899}
              loading="lazy"
              decoding="async"
              className={servicio.fotoAbogada}
            />
            <figcaption className={servicio.pieFoto}>
              <p className={servicio.nombreAbogada}>Roxana Denisa Balau</p>
              <p className={servicio.cargoAbogada}>
                Abogada · Responsable del departamento jurídico
              </p>
              <p className={servicio.colegiadaAbogada}>
                <IconoInsigniaCheck className={servicio.iconoColegiada} />
                Colegiada nº 7178 del Ilustre Colegio de Abogados de Las Palmas de Gran Canaria
              </p>
            </figcaption>
          </figure>

          <div>
            <SectionHeader
              antetitulo="Quién lleva tus asuntos"
              titulo="Roxana Denisa Balau"
              descripcion="Dirige el departamento jurídico de PROLEGAL360 Asesores y coordina con el despacho PROLEGAL360 los asuntos que llegan a vía judicial. Lleva personalmente las alegaciones ante la Inspección de Trabajo, los despidos conflictivos y la asistencia a los actos de conciliación."
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

      <Section fondo="base">
        <div className={servicio.rejillaDos}>
          <div>
            <SectionHeader
              antetitulo="Cobertura nacional"
              titulo="Asesoramiento laboral para empresas de toda España"
              descripcion="Trabajamos a distancia con expedientes digitales y estudiamos el convenio colectivo que corresponde a cada centro de trabajo. La cobertura nacional no significa aplicar una respuesta genérica: cada provincia, sector y plantilla puede exigir un análisis distinto."
            />
            <ButtonLink href="/contacto" size="lg">
              Consultar mi caso laboral
            </ButtonLink>
          </div>
          <div className={servicio.tarjetaNota}>
            <h2 className={servicio.tituloNota}>Cómo empezamos</h2>
            <CheckList items={PASOS_COBERTURA_NACIONAL} />
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

      <Section fondo="base">
        <SectionHeader
          antetitulo="Preguntas frecuentes"
          titulo="Antes de contratar un abogado laboral para tu empresa"
          descripcion="Estas son las dudas más habituales sobre cobertura, asuntos incluidos y forma de trabajo."
        />
        <Faq faqs={FAQS_ABOGADO_LABORAL} />
      </Section>

      <CtaFinal
        titulo="Prueba el departamento jurídico un mes, gratis"
        descripcion="Sin permanencia y sin coste de cancelación. Si no lo usas, no lo renuevas."
      />
    </>
  );
}
