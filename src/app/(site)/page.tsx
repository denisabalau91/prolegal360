import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';
import { CalculadoraCuota } from '@/components/features/CalculadoraCuota';
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
  PILARES,
  type EscenarioIcono,
} from '@/core/domain/home-content';
import { conBasePath } from '@/utils/base-path';
import styles from '@/app/(site)/page.module.css';

const ICONOS_ESCENARIO: Record<EscenarioIcono, ComponentType<SVGProps<SVGSVGElement>>> = {
  'shield-alert': IconoEscudoAlerta,
  landmark: IconoInstitucion,
  'file-warning': IconoDocumentoAlerta,
  gavel: IconoMazo,
};

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <img
          src={conBasePath('/images/hero-oficina.jpg')}
          alt=""
          aria-hidden="true"
          className={styles.heroImagen}
        />
        <div className={styles.heroDegradado} />
        <div className={`bg-grid ${styles.heroRejilla}`} aria-hidden="true" />
        <div className={styles.heroInterior}>
          <div className={`animate-rise ${styles.heroContenido}`}>
            <p className={styles.heroSello}>⚖️ Departamento jurídico incluido</p>
            <h1 className={styles.heroTitulo}>
              Asesoría laboral, fiscal y jurídica para empresas.
            </h1>
            <p className={styles.heroDescripcion}>
              No solo llevamos tus papeles: también damos la cara por ti. Precios
              publicados. Primer mes de servicio jurídico gratuito.
            </p>
            <div className={styles.heroBotones}>
              <ButtonLink href="/calculadora" size="lg" className={styles.heroBotonPrincipal}>
                Calcula tu cuota en 1 minuto <IconoFlechaDerecha className={styles.iconoFlecha} />
              </ButtonLink>
              <ButtonLink href="/contacto" size="lg" className={styles.heroBotonSecundario}>
                Reserva 20 min gratis
              </ButtonLink>
            </div>
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
          antetitulo="Tres pilares"
          titulo="Laboral, fiscal y jurídico. Bajo el mismo techo."
          descripcion="Contrata solo lo que necesitas o los tres juntos con descuento. El precio está publicado en cada uno."
        />
        <div className={styles.rejillaPilares}>
          {PILARES.map((pilar) => (
            <Link key={pilar.nombre} href={pilar.href} className={styles.tarjetaPilar}>
              <div className="rule-accent" />
              <h3 className={styles.tituloPilar}>{pilar.nombre}</h3>
              <p className={styles.descripcionPilar}>{pilar.descripcion}</p>
              <p className={styles.precioPilar}>
                {pilar.precio}
                <span className={styles.sufijoPilar}>{pilar.precioSufijo}</span>
              </p>
              {pilar.precioExtra && <p className={styles.extraPilar}>{pilar.precioExtra}</p>}
              <span className={styles.enlacePilar}>
                Ver el detalle <IconoFlechaArribaDerecha className={styles.iconoPilar} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="precios" fondo="arena">
        <SectionHeader
          antetitulo="Precios publicados"
          titulo="Nuestros cuatro planes, con el precio a la vista"
          descripcion="Sin formularios, sin registro y sin llamada previa. Esto es lo que cuesta trabajar con nosotros."
        />
        <PlanesPrecios />
        <p className={styles.notaPlanes}>
          Todos los precios son sin IVA y sin permanencia.{' '}
          <Link href="/precios" className={styles.enlaceNotaPlanes}>
            Ver la comparativa completa de planes
          </Link>
          .
        </p>
      </Section>

      <Section id="calculadora" fondo="base">
        <SectionHeader
          antetitulo="Calculadora de cuota"
          titulo="Calcula tu cuota exacta en un minuto"
          descripcion="Tres datos y tienes el desglose línea a línea, con el primer mes de servicio jurídico gratuito ya aplicado."
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

      <Section fondo="base">
        <SectionHeader
          antetitulo="Comparativa"
          titulo="PROLEGAL360 vs. asesoría tradicional"
          descripcion="Las seis diferencias que se notan el primer mes."
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
