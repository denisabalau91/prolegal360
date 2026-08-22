import type { Metadata } from 'next';
import { PaginaLegal, type ApartadoLegal } from '@/components/features/PaginaLegal';
import { PageHero, Section } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';

export const metadata: Metadata = {
  title: `Condiciones de contratación | ${MARCA.nombre}`,
  description:
    'Condiciones generales aplicables a la contratación de los planes LABORAL, FISCAL, JURÍDICO y 360 INTEGRAL.',
};

const APARTADOS: ApartadoLegal[] = [
  {
    id: 'objeto',
    indice: '1. Objeto',
    titulo: '1. Objeto',
    contenido: (
      <p>
        Las presentes condiciones regulan la prestación de servicios de asesoramiento
        laboral, fiscal y jurídico por parte de {MARCA.nombre} a empresas, autónomos y
        profesionales. La contratación se formaliza mediante la firma de la correspondiente
        hoja de encargo, que prevalece sobre estas condiciones en caso de discrepancia.
      </p>
    ),
  },
  {
    id: 'alcance',
    indice: '2. Alcance de los planes',
    titulo: '2. Alcance de los planes',
    contenido: (
      <>
        <p>
          El detalle de lo que incluye y de lo que no incluye cada plan está publicado en la
          página de <a href="/precios">precios</a> y se reproduce en la hoja de encargo. En
          síntesis:
        </p>
        <ul>
          <li>
            <strong>LABORAL:</strong> nóminas, seguros sociales, contratos, altas y bajas y
            aplicación de convenio. No incluye la representación en procedimientos
            judiciales.
          </li>
          <li>
            <strong>FISCAL:</strong> revisión fiscal del cierre, presentación de modelos
            periódicos e Impuesto sobre Sociedades. No incluye el registro contable diario
            ni el depósito de cuentas anuales en el Registro Mercantil.
          </li>
          <li>
            <strong>JURÍDICO:</strong> consultas ilimitadas, redacción de cartas y escritos,
            contestación a requerimientos, alegaciones ante la Inspección de Trabajo y
            asistencia al acto de conciliación. No incluye procedimientos judiciales, tasas
            ni costas.
          </li>
          <li>
            <strong>360 INTEGRAL:</strong> los tres planes anteriores con descuento por
            agrupación, con las mismas exclusiones.
          </li>
        </ul>
        <p>
          La contabilidad es responsabilidad de la empresa, que garantiza la veracidad e
          integridad de la información aportada. PROLEGAL360 Asesores realiza la revisión
          fiscal del cierre y la presentación de las declaraciones sobre la base de dicha
          información, sin que ello constituya una auditoría. Los ajustes detectados se
          comunicarán por escrito antes de la presentación.
        </p>
      </>
    ),
  },
  {
    id: 'precios',
    indice: '3. Precios y facturación',
    titulo: '3. Precios, revisión y facturación',
    contenido: (
      <>
        <p>
          Los precios publicados son mensuales y no incluyen IVA, que se repercutirá al tipo
          vigente. La facturación es mensual y por anticipado, mediante domiciliación
          bancaria salvo pacto distinto.
        </p>
        <p>
          La cuota del plan laboral se calcula como 45 € más 12 € por cada nómina emitida en
          el mes. La cuota del plan fiscal depende de la forma jurídica y del volumen de
          facturas. La cuota del plan jurídico depende del número de trabajadores en alta.
          Si estos parámetros varían de forma estable, la cuota se revisa y se comunica por
          escrito con al menos 15 días de antelación.
        </p>
      </>
    ),
  },
  {
    id: 'actuaciones',
    indice: '4. Actuaciones puntuales',
    titulo: '4. Actuaciones puntuales',
    contenido: (
      <p>
        Un despido, una inspección, un requerimiento o un juicio se presupuestan aparte,
        siempre por escrito, con precio cerrado y antes de empezar. Nunca recibirás una
        minuta que no hayas aprobado. Los clientes con plan jurídico tienen un 30 % de
        descuento.
      </p>
    ),
  },
  {
    id: 'obligaciones',
    indice: '5. Obligaciones del cliente',
    titulo: '5. Obligaciones del cliente',
    contenido: (
      <>
        <ul>
          <li>
            Facilitar la documentación e información necesarias con antelación suficiente a
            los plazos legales.
          </li>
          <li>
            Garantizar la veracidad e integridad de la contabilidad y de los datos
            aportados.
          </li>
          <li>
            Comunicar sin demora cualquier notificación recibida de la Administración.
          </li>
          <li>Estar al corriente en el pago de las cuotas del servicio.</li>
        </ul>
        <p>
          El incumplimiento de estas obligaciones puede impedir la presentación en plazo de
          las declaraciones o la correcta defensa de los intereses del cliente, sin
          responsabilidad para el prestador.
        </p>
      </>
    ),
  },
  {
    id: 'duracion',
    indice: '6. Duración y baja',
    titulo: '6. Duración, baja y devolución de documentación',
    contenido: (
      <>
        <p>
          Los servicios se contratan por tiempo indefinido y <strong>sin permanencia</strong>
          . Cualquiera de las partes puede resolver la relación comunicándolo por escrito
          con 15 días de antelación al fin del mes en curso, sin coste ni penalización.
        </p>
        <p>
          En caso de baja, entregamos al cliente toda su documentación en formato digital y
          colaboramos con la nueva asesoría en el traspaso, sin coste adicional.
        </p>
      </>
    ),
  },
  {
    id: 'promocion',
    indice: '7. Primer mes gratuito',
    titulo: '7. Promoción del primer mes gratuito',
    contenido: (
      <p>
        La promoción del primer mes de servicio jurídico gratuito es válida para nuevas
        altas y se aplica una sola vez por cliente. A partir del segundo mes se factura la
        tarifa que corresponda según los trabajadores en alta. La promoción no lleva
        asociado compromiso de permanencia y es incompatible con otras promociones sobre el
        mismo plan.
      </p>
    ),
  },
  {
    id: 'responsabilidad',
    indice: '8. Responsabilidad',
    titulo: '8. Responsabilidad y seguro',
    contenido: (
      <p>
        {MARCA.nombre} responde de los daños directos causados por negligencia profesional
        en los términos previstos legalmente, contando con el seguro de responsabilidad
        civil profesional exigido por la normativa aplicable. No responde de los perjuicios
        derivados de información inexacta o incompleta facilitada por el cliente, ni de las
        consecuencias de decisiones adoptadas por este al margen de nuestro asesoramiento.
      </p>
    ),
  },
];

export default function CondicionesPage() {
  return (
    <>
      <PageHero
        antetitulo="Información legal"
        titulo="Condiciones de contratación"
        descripcion="Condiciones generales aplicables a la contratación de los planes LABORAL, FISCAL, JURÍDICO y 360 INTEGRAL de PROLEGAL360 Asesores."
      />
      <Section fondo="base">
        <PaginaLegal apartados={APARTADOS} fechaActualizacion="20 de agosto de 2026" />
      </Section>
    </>
  );
}
