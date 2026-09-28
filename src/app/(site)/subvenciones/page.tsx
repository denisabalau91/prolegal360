import type { Metadata } from 'next';
import { CheckList } from '@/components/features/CheckList';
import { Faq } from '@/components/features/Faq';
import { FormularioSubvenciones } from '@/components/features/FormularioSubvenciones';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import { IconoFlechaDerecha } from '@/components/ui/icons';
import {
  FAQS_SUBVENCIONES,
  PASOS_SUBVENCION,
  SUBVENCIONES_VIGENTES,
} from '@/core/domain/subvenciones';
import { crearMetadata } from '@/utils/seo';
import styles from '@/app/(site)/subvenciones/subvenciones.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Gestión de subvenciones para autónomos y empresas',
  descripcion:
    'Tramitamos las ayudas para nuevos autónomos y las subvenciones por contratación de nuevos trabajadores: requisitos, solicitud, seguimiento y justificación.',
  ruta: '/subvenciones',
});

export default function SubvencionesPage() {
  return (
    <>
      <PageHero
        antetitulo="Gestión de subvenciones"
        titulo="Hay ayudas para tu empresa. Nosotros las tramitamos."
        descripcion="Muchas ayudas se pierden por no conocerlas a tiempo o por un fallo en la solicitud. Revisamos si cumples los requisitos, preparamos el expediente y lo presentamos en plazo."
        acciones={
          <ButtonLink href="#informacion" size="lg" className={styles.botonHero}>
            Pedir información <IconoFlechaDerecha className={styles.iconoBoton} />
          </ButtonLink>
        }
      />

      <Section fondo="base">
        <SectionHeader
          antetitulo="Convocatorias vigentes"
          titulo="Dos ayudas abiertas ahora mismo"
          descripcion="Empezamos por las que más empresas y autónomos pueden aprovechar. Te decimos por escrito si encajas antes de presentar nada."
        />
        <div className={styles.rejillaSubvenciones}>
          {SUBVENCIONES_VIGENTES.map((subvencion, indice) => (
            <article key={subvencion.id} className={styles.tarjeta}>
              <div className={styles.cabeceraTarjeta}>
                <span className={styles.numero}>{String(indice + 1).padStart(2, '0')}</span>
                <span className={styles.insignia}>Vigente</span>
              </div>
              <h3 className={styles.titulo}>{subvencion.titulo}</h3>
              <p className={styles.destinatarios}>{subvencion.destinatarios}</p>
              <p className={styles.descripcion}>{subvencion.descripcion}</p>
              <div className={styles.queHacemos}>
                <p className={styles.antetituloLista}>Qué hacemos por ti</p>
                <CheckList items={subvencion.queHacemos} />
              </div>
              <ButtonLink href="#informacion" className={styles.botonTarjeta}>
                Quiero esta ayuda
              </ButtonLink>
            </article>
          ))}
        </div>
        <p className={styles.nota}>
          Cuantías, requisitos y plazos dependen de cada convocatoria y de tu situación. Te los
          confirmamos por escrito, junto con nuestros honorarios, antes de empezar.
        </p>
      </Section>

      <Section fondo="navy">
        <SectionHeader
          antetitulo="Cómo lo hacemos"
          titulo="De la duda a la ayuda concedida, en cuatro pasos"
          claro
        />
        <ol className={styles.rejillaPasos}>
          {PASOS_SUBVENCION.map((paso) => (
            <li key={paso.numero} className={styles.paso}>
              <p className={styles.numeroPaso}>{paso.numero}</p>
              <h3 className={styles.tituloPaso}>{paso.titulo}</h3>
              <p className={styles.textoPaso}>{paso.descripcion}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="informacion" fondo="arena">
        <div className={styles.rejillaFormulario}>
          <div>
            <SectionHeader
              antetitulo="Preguntas frecuentes"
              titulo="Lo que sueles preguntar sobre las ayudas"
            />
            <Faq faqs={FAQS_SUBVENCIONES} />
          </div>
          <div className={styles.tarjetaFormulario}>
            <h2 className={styles.tituloFormulario}>Pide información sin compromiso</h2>
            <p className={styles.subtituloFormulario}>
              Cuéntanos tu caso y te decimos si puedes optar a alguna de las ayudas vigentes.
            </p>
            <div className={styles.cuerpoFormulario}>
              <FormularioSubvenciones />
            </div>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Vas a contratar? Calcula también tu coste laboral"
        descripcion="Nóminas y gestión desde el primer trabajador, con el departamento jurídico si lo necesitas."
      />
    </>
  );
}
