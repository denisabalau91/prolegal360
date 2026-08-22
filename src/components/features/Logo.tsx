import Link from 'next/link';
import { MARCA } from '@/core/domain/site';
import { conBasePath } from '@/utils/base-path';
import styles from '@/components/features/Logo.module.css';

interface LogoProps {
  conSello?: boolean;
  claro?: boolean;
}

export function Logo({ conSello = true, claro = false }: LogoProps) {
  return (
    <div
      className={[styles.contenedor, claro ? styles.claro : ''].filter(Boolean).join(' ')}
    >
      <Link href="/" className={styles.enlace} aria-label={`${MARCA.nombre} — inicio`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={conBasePath('/images/logo-prolegal360.png')}
          alt=""
          aria-hidden="true"
          width={500}
          height={500}
          className={styles.marca}
        />
        <span className={styles.textos}>
          <span className={styles.nombre}>
            PROLEGAL<span className={styles.numero}>360</span>
          </span>
          <span className={styles.subtitulo}>Asesores</span>
        </span>
      </Link>
      {conSello && <span className={styles.sello}>{MARCA.sello}</span>}
    </div>
  );
}
