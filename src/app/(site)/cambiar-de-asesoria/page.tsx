import type { Metadata } from 'next';
import { Suspense } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { FormularioContacto } from '@/components/features/FormularioContacto';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import {
  IconoCalendarioReloj,
  IconoCandadoAbierto,
  IconoEscudoCheck,
  IconoFlechasIntercambio,
} from '@/components/ui/icons';
import { MARCA } from '@/core/domain/site';
import { PASOS } from '@/core/domain/home-content';
import styles from '@/app/(site)/cambiar-de-asesoria/cambiar.module.css';

export const metadata: Metadata = {
  title: `Cambiar de asesoría | ${MARCA.nombre}`,
  description:
    'El traspaso lo gestionamos nosotros, es gratuito y hay un mes de solapamiento sin coste. Tú solo tienes que decidirlo.',
};

interface Ventaja {
  Icono: ComponentType<SVGProps<SVGSVGElement>>;
  titulo: string;
  texto: string;
}

const VENTAJAS: Ventaja[] = [
  {
    Icono: IconoFlechasIntercambio,
    titulo: 'Traspaso gratuito',
    texto:
      'Pedimos nosotros la documentación a tu asesoría anterior: histórico laboral, modelos presentados, contabilidad y certificados. Tú no tienes que dar ninguna explicación incómoda.',
  },
  {
    Icono: IconoCalendarioReloj,
    titulo: 'Un mes de solapamiento',
    texto:
      'Durante el primer mes convivimos con tu asesoría actual sin coste añadido, para que ningún trámite ni vencimiento se quede en el aire durante el cambio.',
  },
  {
    Icono: IconoCandadoAbierto,
    titulo: 'Sin permanencia',
    texto:
      'Ni al entrar ni al salir. Si un día decides irte, te entregamos toda tu documentación en formato digital y colaboramos con la nueva asesoría.',
  },
  {
    Icono: IconoEscudoCheck,
    titulo: 'Sin riesgo en el cambio',
    texto:
      'Revisamos lo que dejó pendiente tu asesor anterior y te decimos por escrito qué riesgos hay abiertos antes de asumir la gestión.',
  },
];

const MEJORES_MOMENTOS: string[] = [
  'Al cierre del ejercicio, cuando ya está presentado el Impuesto sobre Sociedades.',
  'A principio de mes, antes de que se cierren las nóminas del periodo.',
  'Después de una inspección o requerimiento, cuando ves que necesitas respaldo jurídico.',
  'Cuando tu asesoría te pasa una minuta que no esperabas.',
];

export default function CambiarDeAsesoriaPage() {
  return (
    <>
      <PageHero
        antetitulo="Traspaso"
        titulo="Cambiar de asesoría es más fácil de lo que te han contado"
        descripcion="El traspaso lo gestionamos nosotros, es gratuito y hay un mes de solapamiento sin coste. Tú solo tienes que decidirlo."
      />

      <Section fondo="base">
        <div className={styles.rejillaVentajas}>
          {VENTAJAS.map(({ Icono, titulo, texto }) => (
            <article key={titulo} className={styles.ventaja}>
              <Icono className={styles.iconoVentaja} />
              <h2 className={styles.tituloVentaja}>{titulo}</h2>
              <p className={styles.textoVentaja}>{texto}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section fondo="arena">
        <div className={styles.rejillaPasos}>
          <div>
            <SectionHeader
              antetitulo="Cómo lo hacemos"
              titulo="Tres pasos y el cambio está hecho"
            />
            <ol className={styles.listaPasos}>
              {PASOS.map((paso) => (
                <li key={paso.numero} className={styles.paso}>
                  <p className={styles.numeroPaso}>{paso.numero}</p>
                  <h3 className={styles.tituloPaso}>{paso.titulo}</h3>
                  <p className={styles.textoPaso}>{paso.descripcion}</p>
                </li>
              ))}
            </ol>
            <h3 className={styles.tituloMomento}>¿Cuál es el mejor momento para cambiar?</h3>
            <ul className={styles.listaMomentos}>
              {MEJORES_MOMENTOS.map((momento) => (
                <li key={momento} className={styles.momento}>
                  · {momento}
                </li>
              ))}
            </ul>
          </div>

          <div id="formulario" className={styles.tarjetaFormulario}>
            <h2 className={styles.tituloFormulario}>Cuéntanos tu caso en 1 minuto</h2>
            <p className={styles.subtituloFormulario}>
              Cinco datos y te llamamos con una propuesta de traspaso. Sin compromiso y sin
              llamadas comerciales insistentes.
            </p>
            <div className={styles.cuerpoFormulario}>
              <Suspense fallback={null}>
                <FormularioContacto
                  variante="cambiar"
                  origen="/cambiar-de-asesoria"
                  textoBoton="Quiero cambiar de asesoría"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Sabes lo que pagarías con nosotros?"
        descripcion="Antes de decidir el cambio, calcula tu cuota exacta. Tarda un minuto y no tienes que dejar tus datos."
      />
    </>
  );
}
