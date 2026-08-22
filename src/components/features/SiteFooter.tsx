import Link from 'next/link';
import { IconoCorreo, IconoTelefono, IconoUbicacion } from '@/components/ui/icons';
import { MARCA } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import styles from '@/components/features/SiteFooter.module.css';

interface ColumnaFooter {
  titulo: string;
  enlaces: { label: string; href: string }[];
}

const COLUMNAS: ColumnaFooter[] = [
  {
    titulo: 'Servicios',
    enlaces: [
      { label: 'Asesoría laboral', href: '/asesoria-laboral' },
      { label: 'Asesoría fiscal', href: '/asesoria-fiscal' },
      { label: 'Departamento jurídico', href: '/departamento-juridico' },
      { label: 'Sectores atendidos', href: '/sectores' },
    ],
  },
  {
    titulo: 'Contratar',
    enlaces: [
      { label: 'Precios y planes', href: '/precios' },
      { label: 'Calculadora de cuota', href: '/calculadora' },
      { label: 'Cambiar de asesoría', href: '/cambiar-de-asesoria' },
      { label: 'Formulario de alta', href: '/alta' },
    ],
  },
  {
    titulo: 'La firma',
    enlaces: [
      { label: 'Sobre nosotros', href: '/sobre-nosotros' },
      { label: 'Casos de éxito', href: '/casos-de-exito' },
      { label: 'Recursos gratuitos', href: '/recursos' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    titulo: 'Legal',
    enlaces: [
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Política de cookies', href: '/cookies' },
      { label: 'Condiciones de contratación', href: '/condiciones' },
    ],
  },
];

export function SiteFooter() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.interior}>
        <div className={styles.rejilla}>
          <div>
            <p className={styles.nombre}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={conBasePath('/images/logo-prolegal360.png')}
                alt=""
                aria-hidden="true"
                className={styles.iconoMarca}
              />
              PROLEGAL<span className={styles.numero}>360</span>{' '}
              <span className={styles.siglas}>ASESORES</span>
            </p>
            <p className={styles.descripcion}>
              Asesoría laboral, fiscal y jurídica para empresas y autónomos. Precios
              publicados y departamento jurídico propio incluido en la cuota.
            </p>
            <span className={styles.sello}>{MARCA.sello}</span>
            <div className={styles.datosContacto}>
              <a href={`tel:${MARCA.telefonoLimpio}`} className={styles.enlaceContacto}>
                <IconoTelefono className={styles.iconoContacto} /> {MARCA.telefono}
              </a>
              <a href={`mailto:${MARCA.email}`} className={styles.enlaceContacto}>
                <IconoCorreo className={styles.iconoContacto} /> {MARCA.email}
              </a>
              <p className={styles.direccion}>
                <IconoUbicacion className={styles.iconoDireccion} />
                <span>
                  {MARCA.direccion}
                  <br />
                  {MARCA.codigoPostal} {MARCA.ciudad}
                </span>
              </p>
            </div>
          </div>

          {COLUMNAS.map((columna) => (
            <div key={columna.titulo}>
              <h3 className={styles.tituloColumna}>{columna.titulo}</h3>
              <ul className={styles.listaColumna}>
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link href={enlace.href} className={styles.enlaceColumna}>
                      {enlace.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.cierre}>
          <p>
            PROLEGAL360 Asesores · Parte del grupo{' '}
            <a
              href={MARCA.grupoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.enlaceGrupo}
            >
              PROLEGAL360
            </a>
          </p>
          <p>
            © {anioActual} PROLEGAL360 Asesores, S.L. · {MARCA.dominio} · Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
