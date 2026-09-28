import type { ReactNode } from 'react';
import { IconoCheck } from '@/components/ui/icons';
import styles from '@/components/ui/Casilla.module.css';

interface CasillaProps {
  marcada: boolean;
  onCambio: () => void;
  titulo: string;
  descripcion?: string;
  etiqueta?: string;
  complemento?: ReactNode;
}

export function Casilla({
  marcada,
  onCambio,
  titulo,
  descripcion,
  etiqueta,
  complemento,
}: CasillaProps) {
  return (
    <div
      className={[styles.casilla, marcada ? styles.casillaMarcada : ''].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={marcada}
        onClick={onCambio}
        className={styles.boton}
      >
        <span className={styles.marca} aria-hidden="true">
          {marcada && <IconoCheck className={styles.icono} strokeWidth={3} />}
        </span>
        <span className={styles.textos}>
          <span className={styles.cabecera}>
            <span className={styles.titulo}>{titulo}</span>
            {etiqueta && <span className={styles.etiqueta}>{etiqueta}</span>}
          </span>
          {descripcion && <span className={styles.descripcion}>{descripcion}</span>}
        </span>
      </button>
      {complemento && <div className={styles.complemento}>{complemento}</div>}
    </div>
  );
}
