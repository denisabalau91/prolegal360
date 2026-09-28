import styles from '@/components/ui/SelectorSegmentado.module.css';

export interface OpcionSegmento<T extends string> {
  valor: T;
  etiqueta: string;
  descripcion?: string;
}

interface SelectorSegmentadoProps<T extends string> {
  leyenda: string;
  opciones: OpcionSegmento<T>[];
  valor: T;
  onCambio: (valor: T) => void;
}

export function SelectorSegmentado<T extends string>({
  leyenda,
  opciones,
  valor,
  onCambio,
}: SelectorSegmentadoProps<T>) {
  return (
    <fieldset>
      <legend className={styles.leyenda}>{leyenda}</legend>
      <div className={styles.opciones}>
        {opciones.map((opcion) => (
          <button
            key={opcion.valor}
            type="button"
            onClick={() => onCambio(opcion.valor)}
            aria-pressed={valor === opcion.valor}
            className={[styles.opcion, valor === opcion.valor ? styles.opcionActiva : '']
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.etiqueta}>{opcion.etiqueta}</span>
            {opcion.descripcion && (
              <span className={styles.descripcion}>{opcion.descripcion}</span>
            )}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
