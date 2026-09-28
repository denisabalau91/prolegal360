import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import { CheckList } from '@/components/features/CheckList';
import { Faq } from '@/components/features/Faq';
import { TablaTarifaJuridica } from '@/components/features/TablaTarifaJuridica';
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
import {
  MAXIMO_TRABAJADORES_TARIFA,
  PROMOCION_PRIMER_MES_JURIDICO,
  TRABAJADORES_EJEMPLO,
} from '@/core/domain/calculadora';
import { formatearImporte } from '@/core/domain/importe';
import {
  AHORRO_PACK_POR_TRABAJADOR,
  CONDICION_PROMOCION_JURIDICO,
  MARCA,
  PLANES,
  PRECIO_JURIDICO_DESDE,
  type FaqItem,
} from '@/core/domain/site';
import { cotizarModalidad } from '@/core/use-cases/calcular-cuota';
import { conBasePath } from '@/utils/base-path';
import { crearMetadata, urlCanonica } from '@/utils/seo';
import servicio from '@/components/features/servicio.module.css';
import styles from '@/app/(site)/departamento-juridico/juridico.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Departamento jurídico para empresas: abogado laboral por cuota fija',
  descripcion: `Tu departamento jurídico desde ${PRECIO_JURIDICO_DESDE}/mes: despidos, sanciones, inspecciones y requerimientos. Primer mes gratis.`,
  ruta: '/departamento-juridico',
  imagen: '/images/hero-departamento-juridico.jpg',
  imagenAlt: 'Departamento jurídico para empresas de PROLEGAL360',
});

const PLAN_JURIDICO = PLANES.find((plan) => plan.id === 'juridico')!;
const PACK = cotizarModalidad('pack', TRABAJADORES_EJEMPLO);

const NO_INCLUYE: string[] = [
  'Asistencia a juicios (demandas, vistas y recursos)',
  'Asistencia al acto de conciliación en el SEMAC',
  'Tasas judiciales, depósitos para recurrir y costas',
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
      'Analizamos la papeleta y valoramos el riesgo. Si hay que acudir al SEMAC o a juicio, te damos presupuesto cerrado antes de empezar.',
  },
];

const PASOS_COBERTURA_NACIONAL: string[] = [
  'Primera revisión por videollamada o teléfono, con documentación compartida de forma digital',
  'Análisis del convenio colectivo y de la normativa aplicable en cada provincia',
  'Respuesta y presupuesto por escrito antes de cualquier actuación fuera de la cuota',
  'Coordinación de las actuaciones presenciales cuando el asunto lo requiera',
];

const FAQS_DEPARTAMENTO_JURIDICO: FaqItem[] = [
  {
    pregunta: '¿Atendéis a empresas de toda España?',
    respuesta:
      'Sí. La consulta, el análisis del expediente y la preparación de documentos se realizan de forma digital para empresas de toda España. Si una actuación exige presencia física, confirmamos antes la disponibilidad y su presupuesto según la provincia.',
  },
  {
    pregunta: '¿Puedo contratar el departamento jurídico sin la asesoría laboral?',
    respuesta: `Sí. Contratado solo, el primer mes es gratis para nuevas altas. Junto a la asesoría laboral, en el pack, el jurídico mantiene su tarifa y la laboral te cuesta ${AHORRO_PACK_POR_TRABAJADOR} menos por trabajador cada mes.`,
  },
  {
    pregunta: '¿La asistencia a juicio o al SEMAC entra en la cuota?',
    respuesta:
      'No. Tu cuota es un respaldo jurídico recurrente sin tarifa procesal fija: no pagas cada mes por juicios que quizá nunca lleguen. Si un asunto llega al SEMAC o a juicio, te damos un presupuesto cerrado, por escrito y antes de empezar.',
  },
  {
    pregunta: '¿Cuánto cuesta el departamento jurídico?',
    respuesta: `Desde ${PRECIO_JURIDICO_DESDE} al mes para empresas de 1 a 10 trabajadores, y por tramos según la plantilla. Con más de ${MAXIMO_TRABAJADORES_TARIFA} trabajadores, presupuesto personalizado. Para nuevas altas, el primer mes es gratis.`,
  },
  {
    pregunta: '¿El servicio está pensado para empresas o para trabajadores?',
    respuesta:
      'Para empresas, autónomos empleadores y responsables de recursos humanos. Defendemos sus decisiones laborales y coordinamos la gestión preventiva con la asesoría laboral.',
  },
];

const DATOS_ESTRUCTURADOS_DEPARTAMENTO_JURIDICO: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${urlCanonica('/departamento-juridico')}#servicio`,
      name: 'Departamento jurídico para empresas',
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
          name: 'Departamento jurídico para empresas',
          item: urlCanonica('/departamento-juridico'),
        },
      ],
    },
  ],
};

export default function DepartamentoJuridicoPage() {
  return (
    <>
      <DatosEstructurados
        id="datos-estructurados-departamento-juridico"
        datos={DATOS_ESTRUCTURADOS_DEPARTAMENTO_JURIDICO}
      />
      <PageHero
        antetitulo="Departamento jurídico incluido"
        titulo="Tu departamento jurídico, por una cuota fija al mes"
        descripcion="Respaldo jurídico recurrente para tu empresa: despidos, sanciones, inspecciones y requerimientos, con una abogada laboralista que ya conoce tu empresa. Sin tarifa procesal fija: los juicios se presupuestan solo si llegan."
        imagen={conBasePath('/images/hero-departamento-juridico.jpg')}
        acciones={
          <HeroPrecio
            importe={PRECIO_JURIDICO_DESDE}
            nota={
              <>
                <IconoRegalo style={{ width: '1rem', height: '1rem' }} />{' '}
                {PROMOCION_PRIMER_MES_JURIDICO}
              </>
            }
            botonTexto="Contratar el departamento jurídico"
            botonHref="/alta?plan=juridico"
          />
        }
      />

      <div className={servicio.franja}>
        <div className={servicio.franjaInterior}>
          <IconoRegalo className={servicio.iconoFranja} />
          <p className={servicio.textoFranja}>
            <strong className={servicio.destacadoFranja}>
              El primer mes del departamento jurídico es gratis
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
              descripcion="Dirige el departamento jurídico de PROLEGAL360 Asesores y coordina con el despacho PROLEGAL360 los asuntos que llegan a vía judicial. Lleva personalmente las alegaciones ante la Inspección de Trabajo, los despidos conflictivos y, cuando se contratan, las actuaciones ante el SEMAC y los juzgados."
            />
            <div className={servicio.rejillaIncluye}>
              <div className={servicio.tarjetaIncluye}>
                <h3 className={servicio.tituloIncluye}>Qué sí incluye tu cuota</h3>
                <div className={servicio.cuerpoIncluye}>
                  <CheckList items={PLAN_JURIDICO.incluye} />
                </div>
              </div>
              <div className={servicio.tarjetaNoIncluye}>
                <h3 className={servicio.tituloIncluye}>Qué se presupuesta aparte</h3>
                <div className={servicio.cuerpoIncluye}>
                  <CheckList items={NO_INCLUYE} negativa />
                </div>
                <p className={servicio.notaIncluye}>
                  Sin tarifa procesal fija: estas actuaciones solo se pagan si las necesitas,
                  con <strong className={servicio.destacadoNota}>presupuesto cerrado</strong>{' '}
                  por escrito y antes de empezar.
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
              titulo="Respaldo jurídico para empresas de toda España"
              descripcion="Trabajamos a distancia con expedientes digitales y estudiamos el convenio colectivo que corresponde a cada centro de trabajo. Cada provincia, sector y plantilla puede exigir un análisis distinto."
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
          antetitulo="Tarifa del departamento jurídico"
          titulo="El precio depende solo de tu plantilla"
          descripcion="Cuantos más trabajadores tienes, más riesgo laboral hay que cubrir. Por eso la cuota se escala por tramos, y está publicada."
        />
        <TablaTarifaJuridica />
        <p className={styles.notaTabla}>
          Precios mensuales sin IVA ni IGIC. {CONDICION_PROMOCION_JURIDICO} Excluye juicios,
          SEMAC, tasas y costas.
        </p>
      </Section>

      <div className={styles.franjaActuaciones}>
        <div className={styles.franjaActuacionesInterior}>
          <p className={styles.antetituloActuaciones}>Promoción laboral + jurídico</p>
          <p className={styles.textoActuaciones}>
            Si además nos confías las nóminas, el departamento jurídico mantiene su tarifa y
            la asesoría laboral te cuesta {AHORRO_PACK_POR_TRABAJADOR} menos por trabajador.
            {PACK.cuotaMensual !== null && PACK.ahorroMensual !== null
              ? ` Con ${TRABAJADORES_EJEMPLO} trabajadores: ${formatearImporte(
                  PACK.cuotaMensual,
                )}/mes, un ahorro de ${formatearImporte(PACK.ahorroMensual)} cada mes.`
              : ''}
          </p>
        </div>
      </div>

      <Section fondo="base">
        <SectionHeader
          antetitulo="Preguntas frecuentes"
          titulo="Antes de contratar el departamento jurídico"
          descripcion="Las dudas más habituales sobre cobertura, asuntos incluidos y forma de trabajo."
        />
        <Faq faqs={FAQS_DEPARTAMENTO_JURIDICO} />
      </Section>

      <CtaFinal
        titulo="Prueba el departamento jurídico: el primer mes es gratis"
        descripcion="Sin permanencia y sin coste de cancelación. Si no te convence, no lo renuevas."
      />
    </>
  );
}
