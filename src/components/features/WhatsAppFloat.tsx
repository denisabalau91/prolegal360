'use client';

import { useEffect, useState } from 'react';
import { IconoWhatsApp } from '@/components/ui/icons';
import { urlWhatsApp } from '@/core/domain/site';
import styles from '@/components/features/WhatsAppFloat.module.css';

const RETARDO_APARICION_MS = 600;

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => setVisible(true), RETARDO_APARICION_MS);
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <a
      href={urlWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className={[styles.boton, visible ? styles.visible : ''].filter(Boolean).join(' ')}
    >
      <IconoWhatsApp className={styles.icono} />
      <span className={styles.texto}>WhatsApp</span>
    </a>
  );
}
