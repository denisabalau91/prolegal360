import type { Metadata } from 'next';
import { PaginaLegal, type ApartadoLegal } from '@/components/features/PaginaLegal';
import { PageHero, Section } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';

export const metadata: Metadata = {
  title: `Aviso legal | ${MARCA.nombre}`,
  description:
    'Información general sobre el titular de este sitio web y las condiciones de uso conforme a la LSSI-CE.',
};

const APARTADOS: ApartadoLegal[] = [
  {
    id: 'titular',
    indice: '1. Datos del titular',
    titulo: '1. Datos identificativos del titular',
    contenido: (
      <>
        <p>En cumplimiento del artículo 10 de la LSSI-CE, se informa de los siguientes datos:</p>
        <ul>
          <li>
            <strong>Denominación social:</strong> {MARCA.nombre}
          </li>
          <li>
            <strong>NIF:</strong> {MARCA.cif}
          </li>
          <li>
            <strong>Domicilio social:</strong> {MARCA.direccion}, {MARCA.codigoPostal}{' '}
            {MARCA.ciudad} ({MARCA.provincia})
          </li>
          <li>
            <strong>Teléfono:</strong> {MARCA.telefono}
          </li>
          <li>
            <strong>Correo electrónico:</strong> {MARCA.email}
          </li>
          <li>
            <strong>Dominio web:</strong> {MARCA.dominio}
          </li>
          <li>
            <strong>Grupo:</strong> forma parte del grupo PROLEGAL360 (
            <a href={MARCA.grupoUrl} target="_blank" rel="noopener noreferrer">
              prolegal360.com
            </a>
            ).
          </li>
        </ul>
        <p>
          Los servicios de asesoramiento jurídico se prestan por profesionales colegiados en
          el Ilustre Colegio de la Abogacía de Madrid, sujetos a la normativa deontológica de
          la abogacía española.
        </p>
      </>
    ),
  },
  {
    id: 'objeto',
    indice: '2. Objeto y aceptación',
    titulo: '2. Objeto y aceptación',
    contenido: (
      <>
        <p>
          El presente aviso legal regula el acceso y la utilización del sitio web{' '}
          {MARCA.dominio}. La navegación por el sitio atribuye la condición de usuario e
          implica la aceptación plena y sin reservas de todas las disposiciones incluidas en
          este aviso legal.
        </p>
        <p>
          El titular se reserva el derecho a modificar en cualquier momento la presentación,
          la configuración y los contenidos del sitio web, así como las presentes
          condiciones.
        </p>
      </>
    ),
  },
  {
    id: 'uso',
    indice: '3. Condiciones de uso',
    titulo: '3. Condiciones de uso',
    contenido: (
      <>
        <p>
          El usuario se compromete a utilizar el sitio web de conformidad con la ley, este
          aviso legal, la moral y las buenas costumbres. En particular, se obliga a no
          utilizar el sitio con fines ilícitos, a no introducir virus o cualquier otro
          elemento que pueda dañar los sistemas, y a no intentar acceder a áreas restringidas
          sin la debida autorización.
        </p>
        <p>
          El acceso al área privada de cliente está restringido a las empresas dadas de alta
          y a los usuarios autorizados por ellas. Las credenciales son personales e
          intransferibles y el usuario es responsable de su custodia.
        </p>
      </>
    ),
  },
  {
    id: 'propiedad',
    indice: '4. Propiedad intelectual',
    titulo: '4. Propiedad intelectual e industrial',
    contenido: (
      <>
        <p>
          Todos los contenidos del sitio web —textos, fotografías, gráficos, imágenes,
          iconos, tecnología, software, diseño gráfico y códigos fuente— constituyen una obra
          cuya propiedad pertenece al titular, sin que puedan entenderse cedidos al usuario
          ninguno de los derechos de explotación sobre los mismos más allá de lo
          estrictamente necesario para el correcto uso del sitio.
        </p>
        <p>
          Las marcas, nombres comerciales o signos distintivos son titularidad del titular o
          de terceros, sin que el acceso al sitio web pueda atribuir derecho alguno sobre
          ellos.
        </p>
      </>
    ),
  },
  {
    id: 'responsabilidad',
    indice: '5. Responsabilidad',
    titulo: '5. Exclusión de responsabilidad',
    contenido: (
      <>
        <p>
          La información publicada en este sitio web, incluidos los artículos del blog, las
          calculadoras y los recursos descargables, tiene carácter meramente informativo y
          orientativo. No constituye asesoramiento jurídico, fiscal ni laboral personalizado,
          ni genera relación profesional alguna.
        </p>
        <p>
          Las cuotas mostradas en la calculadora son estimaciones basadas en los datos
          introducidos por el usuario y no tienen carácter de oferta vinculante. La
          contratación efectiva del servicio requiere la firma de la correspondiente hoja de
          encargo.
        </p>
        <p>
          El titular no se responsabiliza de las interrupciones del servicio, errores u
          omisiones que pudieran producirse en el sitio web, ni de los daños derivados de un
          uso indebido del mismo.
        </p>
      </>
    ),
  },
  {
    id: 'enlaces',
    indice: '6. Enlaces',
    titulo: '6. Enlaces a terceros',
    contenido: (
      <p>
        El sitio web puede contener enlaces a sitios de terceros. El titular no ejerce
        control alguno sobre dichos sitios ni asume responsabilidad por sus contenidos,
        políticas de privacidad o prácticas.
      </p>
    ),
  },
  {
    id: 'datos',
    indice: '7. Protección de datos',
    titulo: '7. Protección de datos',
    contenido: (
      <p>
        El tratamiento de los datos personales facilitados a través del sitio se rige por lo
        dispuesto en la <a href="/privacidad">política de privacidad</a> y, en lo relativo a
        las cookies, en la <a href="/cookies">política de cookies</a>.
      </p>
    ),
  },
  {
    id: 'legislacion',
    indice: '8. Legislación aplicable',
    titulo: '8. Legislación aplicable y jurisdicción',
    contenido: (
      <p>
        Las presentes condiciones se rigen por la legislación española. Para la resolución de
        cualquier controversia, las partes se someten a los juzgados y tribunales del
        domicilio del usuario cuando este tenga la condición de consumidor y, en los demás
        casos, a los juzgados y tribunales de {MARCA.ciudad}.
      </p>
    ),
  },
];

export default function AvisoLegalPage() {
  return (
    <>
      <PageHero
        antetitulo="Información legal"
        titulo="Aviso legal"
        descripcion="Información general sobre el titular de este sitio web y las condiciones de uso, conforme a la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE)."
      />
      <Section fondo="base">
        <PaginaLegal apartados={APARTADOS} fechaActualizacion="20 de agosto de 2026" />
      </Section>
    </>
  );
}
