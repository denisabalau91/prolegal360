import { IconoCerrar, IconoCheck } from '@/components/ui/icons';
import styles from '@/components/features/CheckList.module.css';

interface CheckListProps {
  items: string[];
  negativa?: boolean;
}

export function CheckList({ items, negativa = false }: CheckListProps) {
  const Icono = negativa ? IconoCerrar : IconoCheck;
  return (
    <ul className={styles.lista}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span
            className={[styles.insignia, negativa ? styles.insigniaNegativa : '']
              .filter(Boolean)
              .join(' ')}
          >
            <Icono className={styles.icono} />
          </span>
          <span className={styles.texto}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
