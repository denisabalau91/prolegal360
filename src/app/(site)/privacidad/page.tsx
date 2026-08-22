import type { Metadata } from 'next';
import { PaginaLegal, type ApartadoLegal } from '@/components/features/PaginaLegal';
import { PageHero, Section } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';
import { crearMetadata } from '@/utils/seo';

export const metadata: Metadata = crearMetadata({
  titulo: 'Política de privacidad',
  descripcion: 'Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.',
  ruta: '/privacidad',
  noIndex: true,
});

const APARTADOS: ApartadoLegal[] = [
  {
    id: 'responsable',
    indice: '1. Responsable',
    titulo: '1. Responsable del tratamiento',
    contenido: (
      <ul>
        <li>
          <strong>Responsable:</strong> {MARCA.nombre}
        </li>
        <li>
          <strong>NIF:</strong> {MARCA.cif}
        </li>
        <li>
          <strong>Dirección:</strong> {MARCA.direccion}, {MARCA.codigoPostal} {MARCA.ciudad}
        </li>
        <li>
          <strong>Correo de contacto en materia de privacidad:</strong> {MARCA.email}
        </li>
      </ul>
    ),
  },
  {
    id: 'finalidades',
    indice: '2. Finalidades y bases',
    titulo: '2. Finalidades del tratamiento y bases jurídicas',
    contenido: (
      <>
        <p>Tratamos tus datos personales para las siguientes finalidades:</p>
        <ul>
          <li>
            <strong>Atender tus solicitudes de información y contacto</strong> (formulario de
            contacto, solicitud de cambio de asesoría, llamada de 20 minutos). Base jurídica:
            consentimiento del interesado y aplicación de medidas precontractuales a petición
            del mismo.
          </li>
          <li>
            <strong>Enviarte la propuesta económica calculada</strong> y guardar de forma
            estadística las simulaciones realizadas en la calculadora de cuota, con el fin de
            mejorar el servicio y dimensionar nuestras tarifas. Base jurídica: consentimiento
            e interés legítimo del responsable.
          </li>
          <li>
            <strong>Remitirte los recursos descargables solicitados</strong> (checklist de
            cierre fiscal y guías similares). Base jurídica: consentimiento del interesado.
          </li>
          <li>
            <strong>Gestionar el alta y la prestación de los servicios contratados</strong>,
            incluida la gestión laboral, fiscal y jurídica. Base jurídica: ejecución de un
            contrato y cumplimiento de obligaciones legales.
          </li>
          <li>
            <strong>Cumplir obligaciones legales</strong> en materia fiscal, contable, de
            prevención del blanqueo de capitales y de conservación de la documentación
            profesional. Base jurídica: obligación legal.
          </li>
        </ul>
        <p>
          No tomamos decisiones automatizadas con efectos jurídicos ni elaboramos perfiles a
          partir de tus datos.
        </p>
      </>
    ),
  },
  {
    id: 'datos',
    indice: '3. Datos tratados',
    titulo: '3. Categorías de datos tratados',
    contenido: (
      <>
        <ul>
          <li>
            Datos identificativos y de contacto: nombre, empresa, teléfono, correo
            electrónico.
          </li>
          <li>
            Datos de la actividad: forma jurídica, número de trabajadores, volumen de
            facturas, plan contratado.
          </li>
          <li>
            Datos derivados de la prestación del servicio: documentación laboral, fiscal y
            jurídica aportada por el cliente o generada por nosotros.
          </li>
          <li>
            Datos de navegación y uso: dirección IP y cookies según la política
            correspondiente.
          </li>
        </ul>
        <p>
          Cuando nos facilitas datos de terceros (por ejemplo, de tus trabajadores)
          garantizas que estás legitimado para comunicárnoslos y que les has informado del
          tratamiento.
        </p>
      </>
    ),
  },
  {
    id: 'conservacion',
    indice: '4. Conservación',
    titulo: '4. Plazos de conservación',
    contenido: (
      <ul>
        <li>
          Solicitudes de contacto no convertidas en cliente: 1 año desde la última
          interacción.
        </li>
        <li>Leads de descarga y simulaciones de cuota: 2 años desde su creación.</li>
        <li>
          Datos de clientes: durante la vigencia de la relación y, tras su finalización,
          durante los plazos de prescripción legal (hasta 6 años en materia mercantil y
          contable y hasta 10 años en materia de prevención del blanqueo de capitales).
        </li>
      </ul>
    ),
  },
  {
    id: 'destinatarios',
    indice: '5. Destinatarios',
    titulo: '5. Destinatarios y encargados del tratamiento',
    contenido: (
      <>
        <p>
          No cedemos tus datos a terceros salvo obligación legal. Sí intervienen prestadores
          de servicios que actúan como encargados del tratamiento con contrato firmado
          conforme al artículo 28 del RGPD: proveedores de alojamiento y de la plataforma de
          gestión, proveedor de correo electrónico y, en su caso, entidades bancarias para la
          gestión de cobros.
        </p>
        <p>
          En el marco de la prestación del servicio, tus datos pueden comunicarse a las
          Administraciones Públicas competentes (Agencia Tributaria, Tesorería General de la
          Seguridad Social, SEPE, juzgados y tribunales) cuando resulte necesario para
          cumplir el encargo profesional o una obligación legal.
        </p>
        <p>
          No están previstas transferencias internacionales de datos fuera del Espacio
          Económico Europeo.
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    indice: '6. Seguridad',
    titulo: '6. Medidas de seguridad',
    contenido: (
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas para garantizar un nivel de
        seguridad adecuado al riesgo: cifrado de las comunicaciones, control de acceso a la
        documentación por empresa y copias de seguridad periódicas.
      </p>
    ),
  },
  {
    id: 'derechos',
    indice: '7. Tus derechos',
    titulo: '7. Ejercicio de derechos',
    contenido: (
      <>
        <p>
          Puedes ejercer los derechos de acceso, rectificación, supresión, oposición,
          limitación del tratamiento y portabilidad, así como retirar el consentimiento
          prestado, escribiendo a <a href={`mailto:${MARCA.email}`}>{MARCA.email}</a> o por
          correo postal a la dirección indicada en el apartado 1, acreditando tu identidad.
        </p>
        <p>
          Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una
          reclamación ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </>
    ),
  },
  {
    id: 'menores',
    indice: '8. Menores',
    titulo: '8. Menores de edad',
    contenido: (
      <p>
        Los servicios de este sitio web se dirigen exclusivamente a empresas, autónomos y
        profesionales. No recogemos deliberadamente datos de menores de 14 años.
      </p>
    ),
  },
  {
    id: 'cambios',
    indice: '9. Cambios',
    titulo: '9. Cambios en esta política',
    contenido: (
      <p>
        Podemos actualizar esta política para adaptarla a novedades legislativas o a cambios
        en nuestros servicios. La versión vigente es siempre la publicada en esta página.
        Consulta también nuestra <a href="/cookies">política de cookies</a> y el{' '}
        <a href="/aviso-legal">aviso legal</a>.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        antetitulo="Información legal"
        titulo="Política de privacidad"
        descripcion="Cómo tratamos tus datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)."
      />
      <Section fondo="base">
        <PaginaLegal apartados={APARTADOS} fechaActualizacion="20 de agosto de 2026" />
      </Section>
    </>
  );
}
