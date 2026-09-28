import type { Metadata } from 'next';
import { PaginaLegal, type ApartadoLegal } from '@/components/features/PaginaLegal';
import { PageHero, Section } from '@/components/features/blocks';
import { MAXIMO_TRABAJADORES_TARIFA } from '@/core/domain/calculadora';
import { AHORRO_PACK_POR_TRABAJADOR, MARCA } from '@/core/domain/site';
import { crearMetadata } from '@/utils/seo';

export const metadata: Metadata = crearMetadata({
  titulo: 'Condiciones de contratación',
  descripcion:
    'Condiciones generales de contratación de los servicios laboral, jurídico, fiscal, de subvenciones y de administración de fincas de PROLEGAL360 Asesores.',
  ruta: '/condiciones',
  noIndex: true,
});

const APARTADOS: ApartadoLegal[] = [
  {
    id: 'objeto',
    indice: '1. Objeto',
    titulo: '1. Objeto',
    contenido: (
      <p>
        Las presentes condiciones regulan la prestación de servicios de asesoramiento
        laboral, jurídico, fiscal y contable, de gestión de subvenciones y de administración
        de fincas por parte de {MARCA.nombre} a empresas, autónomos, profesionales y
        comunidades de propietarios. La contratación se formaliza mediante la firma de la correspondiente
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
            <strong>ASESORÍA LABORAL:</strong> nóminas, seguros sociales, contratos, altas y
            bajas y aplicación de convenio. Puede contratarse sola. No incluye la
            representación en procedimientos judiciales ni ante el SEMAC.
          </li>
          <li>
            <strong>DEPARTAMENTO JURÍDICO:</strong> consultas ilimitadas, redacción de cartas
            y escritos, contestación a requerimientos y alegaciones ante la Inspección de
            Trabajo. No incluye la asistencia a juicios ni al SEMAC, tasas, costas ni
            procuradores.
          </li>
          <li>
            <strong>PACK LABORAL + JURÍDICO:</strong> los dos servicios anteriores. El
            departamento jurídico mantiene su tarifa y la asesoría laboral se factura con{' '}
            {AHORRO_PACK_POR_TRABAJADOR} menos por trabajador y mes, con las mismas exclusiones.
          </li>
          <li>
            <strong>ASESORÍA FISCAL Y CONTABILIDAD:</strong> revisión fiscal a partir del
            balance y el balance de sumas y saldos aportados por el cliente, presentación de
            modelos periódicos e Impuesto sobre Sociedades. No incluye el registro contable
            diario ni el depósito de cuentas anuales en el Registro Mercantil.
          </li>
          <li>
            <strong>GESTIÓN DE SUBVENCIONES:</strong> estudio de requisitos, preparación,
            presentación, seguimiento y justificación de las ayudas encargadas. La concesión
            depende exclusivamente del organismo convocante.
          </li>
          <li>
            <strong>ADMINISTRACIÓN DE FINCAS:</strong> tarifas Básica (contabilidad), Estándar
            (contabilidad y administración) y Zen (contabilidad, administración y jurídico).
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
          Los precios publicados son mensuales y no incluyen IVA ni IGIC, que se repercutirán
          al tipo vigente según el territorio. La facturación es mensual y por anticipado, mediante domiciliación
          bancaria salvo pacto distinto.
        </p>
        <p>
          La cuota de la asesoría laboral se calcula por trabajador y mes (nómina más
          gestión) según el tramo de plantilla. La cuota del departamento jurídico depende
          del número de trabajadores en alta. Con más de {MAXIMO_TRABAJADORES_TARIFA}{' '}
          trabajadores, ambas se presupuestan a medida. La asesoría fiscal y contable y la
          gestión de subvenciones se prestan con presupuesto cerrado previo. La
          administración de fincas se factura por vivienda, local y plaza de garaje o, en
          mancomunidades, por portal y zona común. Si estos parámetros varían de forma
          estable, la cuota se revisa y se comunica por escrito con al menos 15 días de
          antelación.
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
        La asistencia a juicios o al SEMAC y cualquier actuación no incluida en la cuota se
        presupuestan aparte, siempre por escrito, con precio cerrado y antes de empezar.
        Nunca recibirás una minuta que no hayas aprobado.
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
    indice: '7. Promoción del primer mes',
    titulo: '7. Promoción del primer mes del departamento jurídico',
    contenido: (
      <p>
        La promoción del 20 % de descuento el primer mes del departamento jurídico es válida para nuevas
        altas que lo contratan sin el pack laboral + jurídico, y se aplica una sola vez por
        cliente. A partir del segundo mes se factura la
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
        descripcion="Condiciones generales aplicables a la contratación de los servicios de PROLEGAL360 Asesores: laboral, departamento jurídico, fiscal y contabilidad, subvenciones y administración de fincas."
      />
      <Section fondo="base">
        <PaginaLegal apartados={APARTADOS} fechaActualizacion="27 de septiembre de 2026" />
      </Section>
    </>
  );
}
