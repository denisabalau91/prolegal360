import { IconoCita } from '@/components/ui/icons';
import { TESTIMONIOS } from '@/core/domain/home-content';
import styles from '@/components/features/Testimonios.module.css';

export function Testimonios() {
  return (
    <div className={styles.rejilla}>
      {TESTIMONIOS.map((testimonio) => (
        <figure key={testimonio.nombre} className={styles.tarjeta}>
          <IconoCita className={styles.iconoCita} />
          <blockquote className={styles.cita}>«{testimonio.cita}»</blockquote>
          <figcaption className={styles.pie}>
            <p className={styles.nombre}>{testimonio.nombre}</p>
            <p className={styles.cargo}>
              {testimonio.cargo} · {testimonio.empresa}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
