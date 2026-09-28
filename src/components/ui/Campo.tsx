import type { ReactNode } from 'react';
import { Label } from '@/components/ui/Label';
import styles from '@/components/ui/Campo.module.css';

interface CampoProps {
  id: string;
  etiqueta: string;
  obligatorio?: boolean;
  ayuda?: string;
  className?: string;
  children: ReactNode;
}

export function Campo({ id, etiqueta, obligatorio, ayuda, className, children }: CampoProps) {
  return (
    <div className={[styles.campo, className].filter(Boolean).join(' ')}>
      <Label htmlFor={id} className={styles.etiqueta}>
        {etiqueta}
        {obligatorio && ' *'}
      </Label>
      <div className={styles.control}>{children}</div>
      {ayuda && <p className={styles.ayuda}>{ayuda}</p>}
    </div>
  );
}
