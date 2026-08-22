import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaFinal, PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import styles from '@/app/(site)/sobre-nosotros/sobre-nosotros.module.css';

export const metadata: Metadata = {
  title: `Sobre nosotros | ${MARCA.nombre}`,
  description:
    'PROLEGAL360 Asesores forma parte del grupo PROLEGAL360. Por eso el departamento jurídico no es un extra: es el punto de partida.',
};

interface Principio {
  titulo: string;
  texto: string;
}

const PRINCIPIOS: Principio[] = [
  {
    titulo: 'El precio, publicado',
    texto:
      'Creemos que pedir presupuesto para una asesoría es una pérdida de tiempo para todos. Nuestras tarifas están en la web y cualquiera puede calcular su cuota sin dejar sus datos.',
  },
  {
    titulo: 'El jurídico, dentro',
    texto:
      'Somos parte de un despacho de abogados. Cuando llega la inspección, el requerimiento o el despido conflictivo, no derivamos: lo llevamos nosotros.',
  },
  {
    titulo: 'Sin minutas sorpresa',
    texto:
      'Toda actuación fuera de la cuota se presupuesta por escrito, con precio cerrado y antes de empezar. Nunca recibirás una factura que no hayas aprobado.',
  },
  {
    titulo: 'Sin permanencia',
    texto:
      'Nos quedamos con nuestros clientes porque el servicio funciona, no porque haya un contrato que ate. Si te vas, te entregamos todo tu histórico.',
  },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        antetitulo="La firma"
        titulo="La asesoría que nació dentro de un despacho de abogados"
        descripcion="PROLEGAL360 Asesores forma parte del grupo PROLEGAL360. Por eso el departamento jurídico no es un extra: es el punto de partida."
        imagen={conBasePath('/images/hero-sobre-nosotros.jpg')}
      />

      <Section fondo="base">
        <div className={styles.rejillaHistoria}>
          <div>
            <SectionHeader
              antetitulo="Quiénes somos"
              titulo="Gestionamos la parte aburrida y damos la cara en la difícil"
            />
            <div className={styles.historia}>
              <p>
                Nacimos como el área de asesoramiento recurrente de{' '}
                <a
                  href={MARCA.grupoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.enlaceGrupo}
                >
                  PROLEGAL360
                </a>
                , un despacho especializado en derecho laboral. Durante años
                vimos llegar el mismo caso una y otra vez: una empresa con una inspección
                encima, con su asesoría diciéndole que «eso ya es jurídico» y con una minuta
                de abogado externo de cuatro cifras.
              </p>
              <p>
                Montamos PROLEGAL360 Asesores para cerrar ese hueco. Llevamos la gestión
                laboral y fiscal del día a día, con precios publicados, y metemos el
                departamento jurídico dentro de la cuota mensual. Cuando llega el problema,
                ya estamos dentro del expediente.
              </p>
              <p>
                Hoy gestionamos más de cien empresas, sobre todo de hostelería,
                construcción, comercio y servicios de seguridad y limpieza. Sectores con
                plantillas grandes, mucha rotación y una relación intensa con la Inspección
                de Trabajo.
              </p>
            </div>
          </div>

          <div className={styles.tarjetaDatos}>
            <p className={styles.cifra}>+100</p>
            <p className={styles.cifraTexto}>empresas gestionadas</p>
            <div className={styles.datos}>
              <div>
                <p className={styles.datoTitulo}>Grupo</p>
                <p className={styles.datoTexto}>
                  Parte del grupo PROLEGAL360, despacho de abogados especializado en laboral
                  y mercantil.
                </p>
              </div>
              <div>
                <p className={styles.datoTitulo}>Sede</p>
                <p className={styles.datoTexto}>
                  {MARCA.direccion}, {MARCA.codigoPostal} {MARCA.ciudad}
                </p>
              </div>
              <div>
                <p className={styles.datoTitulo}>Horario</p>
                <p className={styles.datoTexto}>{MARCA.horario}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Cómo entendemos el trabajo"
          titulo="Cuatro principios que no negociamos"
        />
        <div className={styles.rejillaPrincipios}>
          {PRINCIPIOS.map((principio) => (
            <article key={principio.titulo} className={styles.principio}>
              <h3 className={styles.tituloPrincipio}>{principio.titulo}</h3>
              <p className={styles.textoPrincipio}>{principio.texto}</p>
            </article>
          ))}
        </div>
        <p className={styles.notaCasos}>
          ¿Quieres ver cómo se traduce esto en la práctica?{' '}
          <Link href="/casos-de-exito" className={styles.enlaceCasos}>
            Lee los casos de nuestros clientes
          </Link>
          .
        </p>
      </Section>

      <CtaFinal />
    </>
  );
}
