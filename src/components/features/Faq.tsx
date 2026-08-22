'use client';

import { useState } from 'react';
import { IconoMas, IconoMenos } from '@/components/ui/icons';
import type { FaqItem } from '@/core/domain/site';
import styles from '@/components/features/Faq.module.css';

interface FaqProps {
  faqs: FaqItem[];
}

export function Faq({ faqs }: FaqProps) {
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(0);

  return (
    <div className={styles.lista}>
      {faqs.map((faq, indice) => {
        const abierta = indiceAbierto === indice;
        return (
          <div key={faq.pregunta} className={styles.item}>
            <h3>
              <button
                type="button"
                onClick={() => setIndiceAbierto(abierta ? null : indice)}
                aria-expanded={abierta}
                className={styles.boton}
              >
                <span className={styles.pregunta}>{faq.pregunta}</span>
                <span className={styles.icono}>
                  {abierta ? (
                    <IconoMenos className={styles.iconoSvg} />
                  ) : (
                    <IconoMas className={styles.iconoSvg} />
                  )}
                </span>
              </button>
            </h3>
            {abierta && <p className={styles.respuesta}>{faq.respuesta}</p>}
          </div>
        );
      })}
    </div>
  );
}
