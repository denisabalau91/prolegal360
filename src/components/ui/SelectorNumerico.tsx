import { IconoMas, IconoMenos } from '@/components/ui/icons';
import styles from '@/components/ui/SelectorNumerico.module.css';

interface SelectorNumericoProps {
  id: string;
  valor: string;
  minimo: number;
  onCambio: (valor: string) => void;
  etiquetaAccesible?: string;
  compacto?: boolean;
}

export function SelectorNumerico({
  id,
  valor,
  minimo,
  onCambio,
  etiquetaAccesible,
  compacto = false,
}: SelectorNumericoProps) {
  const numero = parseInt(valor, 10);
  const actual = Number.isFinite(numero) ? numero : minimo;
  const sufijoAccesible = etiquetaAccesible ? ` a ${etiquetaAccesible}` : '';

  return (
    <div className={[styles.selector, compacto ? styles.compacto : ''].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.boton}
        onClick={() => onCambio(String(Math.max(minimo, actual - 1)))}
        disabled={actual <= minimo}
        aria-label={`Restar uno${sufijoAccesible}`}
        aria-controls={id}
      >
        <IconoMenos className={styles.icono} />
      </button>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={valor}
        onChange={(evento) => onCambio(evento.target.value)}
        onBlur={() => {
          if (valor === '' || actual < minimo) {
            onCambio(String(minimo));
          }
        }}
        aria-label={etiquetaAccesible}
        className={styles.entrada}
      />
      <button
        type="button"
        className={styles.boton}
        onClick={() => onCambio(String(actual + 1))}
        aria-label={`Sumar uno${sufijoAccesible}`}
        aria-controls={id}
      >
        <IconoMas className={styles.icono} />
      </button>
    </div>
  );
}
