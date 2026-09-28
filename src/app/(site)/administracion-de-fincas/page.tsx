import type { Metadata } from 'next';
import { CalculadoraFincas } from '@/components/features/CalculadoraFincas';
import { Faq } from '@/components/features/Faq';
import { PageHero, Section, SectionHeader } from '@/components/features/blocks';
import { ButtonLink } from '@/components/ui/Button';
import { IconoDocumento, IconoFlechaDerecha } from '@/components/ui/icons';
import { PORTAL_REFERENCIA, PRECIO_ZONA_COMUN, TARIFAS_FINCA } from '@/core/domain/fincas';
import { formatearImporte } from '@/core/domain/importe';
import { MARCA, urlWhatsApp, type FaqItem } from '@/core/domain/site';
import {
  calcularPrecioPortal,
  calcularPresupuestoFinca,
} from '@/core/use-cases/calcular-presupuesto-fincas';
import { crearMetadata } from '@/utils/seo';
import styles from '@/app/(site)/administracion-de-fincas/fincas.module.css';

const [TARIFA_BASICA] = TARIFAS_FINCA;

export const metadata: Metadata = crearMetadata({
  titulo: 'Administración de fincas: tres tarifas y presupuesto al instante',
  descripcion: `Administración de comunidades y mancomunidades desde ${formatearImporte(
    TARIFA_BASICA.vivienda,
  )} por vivienda y mes. Calcula tus tres presupuestos: Básica, Estándar o Zen.`,
  ruta: '/administracion-de-fincas',
});

const EJEMPLO_MANCOMUNIDAD = calcularPresupuestoFinca({
  tipo: 'mancomunidad',
  portales: 7,
  zonas: { piscina: 1, garaje: 1, padel: 1 },
}).presupuestos;

const PORTAL_TIPO = `${PORTAL_REFERENCIA.viviendas} viviendas, ${PORTAL_REFERENCIA.locales} locales y ${PORTAL_REFERENCIA.garajes} plazas de garaje`;

const PRECIOS_PORTAL = TARIFAS_FINCA.map(
  (tarifa) => `${tarifa.nombre} ${formatearImporte(calcularPrecioPortal(tarifa))}`,
).join(' · ');

const FAQS_FINCAS: FaqItem[] = [
  {
    pregunta: '¿Qué diferencia hay entre las tres tarifas?',
    respuesta:
      'La Básica cubre solo la contabilidad de la comunidad. La Estándar añade la administración: juntas, actas, proveedores, seguros e incidencias. La Zen suma además el asesoramiento jurídico en propiedad horizontal.',
  },
  {
    pregunta: '¿Cómo se calcula una mancomunidad?',
    respuesta: `No por viviendas, sino por portales. Cada portal se cobra como un portal tipo de ${PORTAL_TIPO} en la tarifa que elijas (${PRECIOS_PORTAL} por portal y mes), más ${formatearImporte(
      PRECIO_ZONA_COMUN,
    )} por cada zona común: piscina, garaje, pistas deportivas, jardines…`,
  },
  {
    pregunta: '¿Podéis igualar lo que pagamos ahora?',
    respuesta:
      'Envíanos el último recibo de honorarios o el contrato con tu administrador actual y ajustamos nuestra propuesta a vuestro presupuesto, siempre por escrito.',
  },
  {
    pregunta: '¿Cómo se hace el cambio de administrador?',
    respuesta:
      'El cambio lo aprueba la junta de propietarios. Nosotros preparamos la propuesta para la junta y, una vez aprobada, pedimos la documentación al administrador saliente para que la comunidad no note el cambio.',
  },
  {
    pregunta: '¿Los precios llevan impuestos?',
    respuesta:
      'No. Todos los precios son mensuales y sin IVA ni IGIC, que se aplican según el territorio de la comunidad.',
  },
];

export default function AdministracionDeFincasPage() {
  return (
    <>
      <PageHero
        antetitulo="Administración de fincas"
        titulo="Tres tarifas claras para tu comunidad, calculadas al momento"
        descripcion="Elige el nivel de servicio que necesita tu comunidad o mancomunidad y ve los presupuestos al instante. Y si ya tienes administrador, nos ajustamos a lo que pagáis ahora."
        acciones={
          <ButtonLink href="#calculadora" size="lg" className={styles.botonHero}>
            Calcular mis tres presupuestos <IconoFlechaDerecha className={styles.iconoBoton} />
          </ButtonLink>
        }
      />

      <Section fondo="base">
        <SectionHeader
          antetitulo="Tarifas publicadas"
          titulo="Pagas por vivienda, local y plaza de garaje"
          descripcion="Tres niveles de servicio, con el precio por unidad y mes a la vista. Sin cuotas de alta ni conceptos ocultos."
        />
        <div className={styles.rejillaTarifas}>
          {TARIFAS_FINCA.map((tarifa) => (
            <article
              key={tarifa.id}
              className={[styles.tarjetaTarifa, tarifa.destacada ? styles.tarjetaDestacada : '']
                .filter(Boolean)
                .join(' ')}
            >
              <p className={styles.nombreTarifa}>{tarifa.nombre}</p>
              <p className={styles.contenidoTarifa}>{tarifa.contenido}</p>
              <p className={styles.precioTarifa}>
                {formatearImporte(tarifa.vivienda)}
                <span className={styles.sufijoTarifa}>/vivienda</span>
              </p>
              <p className={styles.precioSecundario}>
                {formatearImporte(tarifa.localGaraje)} por local o plaza de garaje
              </p>
              <p className={styles.precioPortal}>
                Mancomunidades: {formatearImporte(calcularPrecioPortal(tarifa))} por portal
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="calculadora" fondo="arena">
        <SectionHeader
          antetitulo="Calculadora"
          titulo="Tus presupuestos, en diez segundos"
          descripcion="Elige comunidad o mancomunidad, indica sus datos y compara. Cuando decidas, te enviamos el presupuesto por escrito."
        />
        <CalculadoraFincas />
      </Section>

      <Section fondo="base">
        <div className={styles.rejillaDos}>
          <div className={styles.bloqueMancomunidad}>
            <p className={styles.antetitulo}>Mancomunidades</p>
            <h2 className={styles.tituloBloque}>Varios portales, un cálculo distinto</h2>
            <p className={styles.textoBloque}>
              En una mancomunidad no contamos viviendas, sino portales. Cada portal se cobra
              como un portal tipo de {PORTAL_TIPO} en la tarifa que elijas, más{' '}
              {formatearImporte(PRECIO_ZONA_COMUN)} por cada zona común. Así también recibes
              tres presupuestos.
            </p>
            <div className={styles.ejemplo}>
              <p>Ejemplo: 7 portales con piscina, garaje y pádel (3 zonas comunes).</p>
              <ul className={styles.listaEjemplo}>
                {EJEMPLO_MANCOMUNIDAD.map(({ tarifa, conceptos, cuotaMensual }) => (
                  <li key={tarifa.id}>
                    <span>
                      {tarifa.nombre}:{' '}
                      {conceptos
                        .map(
                          (linea) =>
                            `${linea.cantidad} × ${formatearImporte(linea.precioUnitario)}`,
                        )
                        .join(' + ')}
                    </span>
                    <strong>{formatearImporte(cuotaMensual)}/mes</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.bloqueAjuste}>
            <IconoDocumento className={styles.iconoAjuste} />
            <h2 className={styles.tituloBloque}>Nos ajustamos a tu presupuesto actual</h2>
            <p className={styles.textoBloque}>
              ¿Ya tenéis administrador? Envíanos el último recibo de honorarios o el contrato y
              te presentamos una propuesta ajustada a lo que pagáis hoy.
            </p>
            <div className={styles.botonesAjuste}>
              <ButtonLink
                href={urlWhatsApp(
                  'Hola, quiero enviaros el recibo de honorarios de mi comunidad para que ajustéis el presupuesto.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.botonAjuste}
              >
                Enviar por WhatsApp
              </ButtonLink>
              <ButtonLink
                href={`mailto:${MARCA.email}?subject=${encodeURIComponent(
                  'Recibo de honorarios de mi comunidad',
                )}`}
                variant="outline"
              >
                Enviar por email
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section fondo="arena">
        <SectionHeader
          antetitulo="Preguntas frecuentes"
          titulo="Antes de cambiar de administrador"
        />
        <Faq faqs={FAQS_FINCAS} />
      </Section>
    </>
  );
}
