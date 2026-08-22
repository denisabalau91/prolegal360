import type { Metadata } from 'next';
import { PaginaLegal, type ApartadoLegal } from '@/components/features/PaginaLegal';
import { PageHero, Section } from '@/components/features/blocks';
import { MARCA } from '@/core/domain/site';
import { crearMetadata } from '@/utils/seo';
import styles from '@/app/(site)/cookies/cookies.module.css';

export const metadata: Metadata = crearMetadata({
  titulo: 'Política de cookies',
  descripcion:
    'Información sobre el uso de cookies en este sitio web conforme a la LSSI-CE y las directrices de la AEPD.',
  ruta: '/cookies',
  noIndex: true,
});

interface CookieDescrita {
  nombre: string;
  tipo: string;
  finalidad: string;
  duracion: string;
}

const COOKIES: CookieDescrita[] = [
  {
    nombre: 'pl360_consentimiento_cookies',
    tipo: 'Técnica (propia)',
    finalidad:
      'Recordar tu decisión sobre el uso de cookies para no volver a mostrarte el aviso.',
    duracion: '12 meses',
  },
];

const APARTADOS: ApartadoLegal[] = [
  {
    id: 'que-son',
    indice: '1. Qué son las cookies',
    titulo: '1. Qué son las cookies',
    contenido: (
      <p>
        Una cookie es un pequeño fichero de texto que un sitio web almacena en tu navegador
        cuando lo visitas. Sirve para recordar información sobre tu visita, como tus
        preferencias o el estado de tu sesión.
      </p>
    ),
  },
  {
    id: 'consentimiento',
    indice: '2. Consentimiento previo',
    titulo: '2. Consentimiento previo',
    contenido: (
      <>
        <p>
          En {MARCA.dominio}{' '}
          <strong>
            no instalamos ninguna cookie no estrictamente necesaria antes de obtener tu
            consentimiento
          </strong>
          . Al entrar por primera vez verás un aviso donde puedes aceptar todas las cookies,
          rechazarlas o configurarlas por categorías. Hasta que tomes una decisión, solo se
          cargan las cookies técnicas imprescindibles.
        </p>
        <p>
          Rechazar las cookies no técnicas no limita en modo alguno el acceso a los
          contenidos del sitio web.
        </p>
      </>
    ),
  },
  {
    id: 'tipos',
    indice: '3. Cookies que usamos',
    titulo: '3. Cookies que utilizamos',
    contenido: (
      <>
        <p>
          Actualmente este sitio utiliza únicamente cookies técnicas propias, necesarias para
          su funcionamiento y para la seguridad del área privada de cliente. No utilizamos
          cookies publicitarias ni de terceros con fines de perfilado.
        </p>
        <div className={styles.contenedorTabla}>
          <table className={styles.tabla}>
            <thead>
              <tr className={styles.filaCabecera}>
                <th scope="col" className={styles.celdaCabecera}>
                  Cookie
                </th>
                <th scope="col" className={styles.celdaCabecera}>
                  Tipo
                </th>
                <th scope="col" className={styles.celdaCabecera}>
                  Finalidad
                </th>
                <th scope="col" className={styles.celdaCabecera}>
                  Duración
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((cookie, indice) => (
                <tr
                  key={cookie.nombre}
                  className={indice % 2 === 0 ? styles.filaPar : styles.filaImpar}
                >
                  <td className={styles.celdaCookie}>{cookie.nombre}</td>
                  <td className={styles.celdaTipo}>{cookie.tipo}</td>
                  <td className={styles.celdaFinalidad}>{cookie.finalidad}</td>
                  <td className={styles.celdaDuracion}>{cookie.duracion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Si en el futuro incorporamos cookies analíticas o de terceros, se detallarán en
          esta tabla y solo se activarán previo consentimiento expreso a través del panel de
          configuración.
        </p>
      </>
    ),
  },
  {
    id: 'gestionar',
    indice: '4. Cómo gestionarlas',
    titulo: '4. Cómo gestionar tu consentimiento',
    contenido: (
      <p>
        Puedes cambiar tu decisión en cualquier momento borrando la cookie{' '}
        <code>pl360_consentimiento_cookies</code> desde tu navegador: al volver a entrar en
        la web se mostrará de nuevo el aviso de cookies y podrás elegir otra opción.
      </p>
    ),
  },
  {
    id: 'navegador',
    indice: '5. Desde el navegador',
    titulo: '5. Configuración desde el navegador',
    contenido: (
      <>
        <p>Puedes bloquear o eliminar cookies desde la configuración de tu navegador:</p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/es-es/microsoft-edge"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Ten en cuenta que si bloqueas las cookies técnicas no podrás acceder al área
          privada de cliente.
        </p>
      </>
    ),
  },
  {
    id: 'cambios',
    indice: '6. Cambios',
    titulo: '6. Cambios en esta política',
    contenido: (
      <p>
        Esta política puede modificarse cuando cambien las cookies utilizadas o la normativa
        aplicable. Consulta también nuestra <a href="/privacidad">política de privacidad</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero
        antetitulo="Información legal"
        titulo="Política de cookies"
        descripcion="Información sobre el uso de cookies en este sitio web, conforme al artículo 22.2 de la LSSI-CE y a las directrices de la Agencia Española de Protección de Datos."
      />
      <Section fondo="base">
        <PaginaLegal apartados={APARTADOS} fechaActualizacion="20 de agosto de 2026" />
      </Section>
    </>
  );
}
