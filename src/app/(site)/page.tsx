import Link from 'next/link';
import type { Metadata } from 'next';
import type { ComponentType, SVGProps } from 'react';
import { DatosEstructurados } from '@/components/seo/DatosEstructurados';
import { CalculadoraCuota } from '@/components/features/CalculadoraCuota';
import { CheckList } from '@/components/features/CheckList';
import { Faq } from '@/components/features/Faq';
import { PlanesPrecios } from '@/components/features/PlanesPrecios';
import { Testimonios } from '@/components/features/Testimonios';
import { CtaFinal, Section, SectionHeader } from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import {
  IconoCerrar,
  IconoCheck,
  IconoDocumentoAlerta,
  IconoEscudoAlerta,
  IconoFlechaArribaDerecha,
  IconoFlechaDerecha,
  IconoInstitucion,
  IconoMazo,
} from '@/components/ui/icons';
import {
  COMPARATIVA,
  CONCLUSION_ESCENARIOS,
  ESCENARIOS,
  FAQS_HOME,
  PASOS,
  SERVICIOS,
  type EscenarioIcono,
} from '@/core/domain/home-content';
import { MARCA } from '@/core/domain/site';
import { SUBVENCIONES_VIGENTES } from '@/core/domain/subvenciones';
import { conBasePath } from '@/utils/base-path';
import { crearMetadata, DATOS_ESTRUCTURADOS_SITIO } from '@/utils/seo';
import styles from '@/app/(site)/page.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Asesoría integral para empresas con departamento jurídico incluido',
  descripcion:
    'Asesoría laboral con departamento jurídico, fiscal y contabilidad, subvenciones y administración de fincas. Tarifas publicadas y calculadora de coste laboral.',
  ruta: '/',
  imagen: '/images/hero-oficina.jpg',
  imagenAlt: 'Equipo de asesoría integral para empresas de PROLEGAL360',
});

const ICONOS_ESCENARIO: Record<EscenarioIcono, ComponentType<SVGProps<SVGSVGElement>>> = {
  'shield-alert': IconoEscudoAlerta,
  landmark: IconoInstitucion,
  'file-warning': IconoDocumentoAlerta,
  gavel: IconoMazo,
};

export default function HomePage() {
  return (
    <>
      <DatosEstructurados id="datos-estructurados-sitio" datos={DATOS_ESTRUCTURADOS_SITIO} />
      <section className={styles.hero}>
        <img
          src={conBasePath('/images/hero-oficina.jpg')}
          alt=""
          aria-hidden="true"
          width={1600}
          height={1068}
          fetchPriority="high"
          className={styles.heroImagen}
        />
        <div className={styles.heroDegradado} />
        <div className={`bg-grid ${styles.heroRejilla}`} aria-hidden="true" />
        <div className={styles.heroInterior}>
          <div className={`animate-rise ${styles.heroContenido}`}>
            <p className={styles.heroSello}>{MARCA.sello}</p>
            <h1 className={styles.heroTitulo}>
              {MARCA.lema}{' '}
              <span className={styles.heroTituloDestacado}>{MARCA.lemaDestacado}</span>
            </h1>
            <p className={styles.heroDescripcion}>
              Asesoría integral multiservicio: laboral, departamento jurídico, fiscal y
              contabilidad, subvenciones y administración de fincas. Con las tarifas publicadas
              para que sepas lo que pagas antes de llamarnos.
            </p>
            <div className={styles.heroBotones}>
              <ButtonLink href="#calculadora" size="lg" className={styles.heroBotonPrincipal}>
                Calcula tu coste laboral <IconoFlechaDerecha className={styles.iconoFlecha} />
              </ButtonLink>
              <ButtonLink href="/contacto" size="lg" className={styles.heroBotonSecundario}>
                Reserva 20 min gratis
              </ButtonLink>
            </div>
            <ul className={styles.heroGarantias}>
              <li>Tarifas publicadas</li>
              <li>Sin permanencia</li>
              <li>Presupuestos cerrados y por escrito</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.cifra}>
        <div className={styles.cifraInterior}>
          <p className={styles.cifraNumero}>+100</p>
          <p className={styles.cifraTexto}>empresas gestionadas</p>
        </div>
      </section>

      <Section fondo="base">
        <SectionHeader
          antetitulo="Asesoría integral multiservicio"
          titulo="Todo lo que tu empresa necesita, con un solo interlocutor"
          descripcion="Contrata solo lo que necesitas o combina servicios. Donde se puede tarifar, el precio está publicado; donde no, te damos presupuesto cerrado en 24 h."
        />
        <div className={styles.rejillaPilares}>
          {SERVICIOS.map((servicio) => (
            <Link key={servicio.nombre} href={servicio.href} className={styles.tarjetaPilar}>
              <div className="rule-accent" />
              <h3 className={styles.tituloPilar}>{servicio.nombre}</h3>
              <p className={styles.descripcionPilar}>{servicio.descripcion}</p>
              <p className={styles.precioPilar}>
                {servicio.precio}
                <span className={styles.sufijoPilar}>{servicio.precioSufijo}</span>
              </p>
              <p className={styles.extraPilar}>{servicio.precioExtra}</p>
              <span className={styles.enlacePilar}>
                Ver el detalle <IconoFlechaArribaDerecha className={styles.iconoPilar} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="precios" fondo="arena">
        <SectionHeader
          antetitulo="Laboral y departamento jurídico"
          titulo="Tres formas de contratar, con el precio a la vista"
          descripcion="La asesoría laboral se contrata sola o con el departamento jurídico. Juntos, en el pack, con descuento. La fiscal, con presupuesto cerrado."
        />
        <PlanesPrecios />
        <p className={styles.notaPlanes}>
          Precios sin IVA ni IGIC y sin permanencia.{' '}
          <Link href="/precios" className={styles.enlaceNotaPlanes}>
            Ver todas las tarifas y la comparativa
          </Link>
          .
        </p>
      </Section>

      <Section id="calculadora" fondo="base">
        <SectionHeader
          antetitulo="Calculadora de coste laboral"
          titulo="Conoce tu coste laboral al instante"
          descripcion="Indica tu plantilla, elige servicios y ve el desglose línea a línea, con el descuento del pack y el del primer mes ya aplicados."
        />
        <CalculadoraCuota origen="/" />
      </Section>

      <Section fondo="navy">
        <SectionHeader
          antetitulo="El momento de la verdad"
          titulo="¿Qué pasa cuando llega el problema?"
          descripcion="Una asesoría se mide el día que llega el sobre. Esto es lo que ocurre en las cuatro situaciones más habituales."
          claro
        />
        <div className={styles.rejillaEscenarios}>
          {ESCENARIOS.map((escenario) => {
            const Icono = ICONOS_ESCENARIO[escenario.icono];
            return (
              <article key={escenario.titulo} className={styles.tarjetaEscenario}>
                <Icono className={styles.iconoEscenario} />
                <h3 className={styles.tituloEscenario}>{escenario.titulo}</h3>
                <p className={styles.situacionEscenario}>{escenario.situacion}</p>
                <p className={styles.respuestaEscenario}>{escenario.respuesta}</p>
              </article>
            );
          })}
        </div>
        <div className={styles.conclusionEscenarios}>
          <p className={styles.textoConclusion}>{CONCLUSION_ESCENARIOS}</p>
        </div>
      </Section>

      <Section fondo="arena">
        <div className={styles.bandaSubvenciones}>
          <div>
            <SectionHeader
              antetitulo="Gestión de subvenciones"
              titulo="Hay ayudas para tu empresa. Nosotros las tramitamos."
              descripcion="Revisamos si encajas en las ayudas vigentes, preparamos el expediente y lo presentamos en plazo."
            />
            <ButtonLink href="/subvenciones" size="lg" className={styles.botonSubvenciones}>
              Pedir información <IconoFlechaDerecha className={styles.iconoFlecha} />
            </ButtonLink>
          </div>
          <div className={styles.rejillaSubvenciones}>
            {SUBVENCIONES_VIGENTES.map((subvencion) => (
              <article key={subvencion.id} className={styles.tarjetaSubvencion}>
                <span className={styles.insigniaVigente}>Vigente</span>
                <h3 className={styles.tituloSubvencion}>{subvencion.titulo}</h3>
                <p className={styles.destinatariosSubvencion}>{subvencion.destinatarios}</p>
                <CheckList items={subvencion.queHacemos.slice(0, 2)} />
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section fondo="base">
        <SectionHeader
          antetitulo="Comparativa"
          titulo="Compara el servicio integral con una asesoría tradicional"
          descripcion="Las seis diferencias que se notan desde el primer mes."
        />
        <div className={styles.contenedorTabla}>
          <table className={styles.tabla}>
            <thead>
              <tr className={styles.filaCabecera}>
                <th scope="col" className={styles.celdaCabecera}>
                  {' '}
                </th>
                <th scope="col" className={styles.celdaCabeceraNosotros}>
                  PROLEGAL360
                </th>
                <th scope="col" className={styles.celdaCabeceraTradicional}>
                  Asesoría tradicional
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVA.map((concepto, indice) => (
                <tr
                  key={concepto}
                  className={indice % 2 === 0 ? styles.filaPar : styles.filaImpar}
                >
                  <th scope="row" className={styles.celdaConcepto}>
                    {concepto}
                  </th>
                  <td className={styles.celdaValor}>
                    <span className={styles.insigniaSi}>
                      <IconoCheck className={styles.iconoSi} />
                      <span className="sr-only">Sí</span>
                    </span>
                  </td>
                  <td className={styles.celdaValor}>
                    <span className={styles.insigniaNo}>
                      <IconoCerrar className={styles.iconoNo} />
                      <span className="sr-only">No</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Cómo trabajamos"
          titulo="Tres pasos y el cambio está hecho"
          descripcion="Del primer diagnóstico a la gestión mensual, sin que tengas que llamar a tu asesoría anterior."
        />
        <div className={styles.rejillaPasos}>
          {PASOS.map((paso) => (
            <article key={paso.numero} className={styles.tarjetaPaso}>
              <p className={styles.numeroPaso}>{paso.numero}</p>
              <h3 className={styles.tituloPaso}>{paso.titulo}</h3>
              <p className={styles.descripcionPaso}>{paso.descripcion}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section fondo="base">
        <SectionHeader
          antetitulo="Clientes"
          titulo="Lo que dicen las empresas que ya han cambiado"
        />
        <Testimonios />
        <div className={styles.rejillaFaq}>
          <SectionHeader
            antetitulo="Preguntas frecuentes"
            titulo="Todo lo que sueles preguntar antes de contratar"
            descripcion="Y si falta algo, te lo respondemos por teléfono en la llamada de 20 minutos."
          />
          <Faq faqs={FAQS_HOME} />
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
